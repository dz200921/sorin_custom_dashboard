// Fetch PostHog dashboard data and regenerate data.js
// Run by GitHub Action every hour

const POSTHOG_HOST = process.env.POSTHOG_HOST;
const POSTHOG_KEY = process.env.POSTHOG_API_KEY;
const PROJECT_ID = process.env.POSTHOG_PROJECT_ID || '1';
const DASHBOARD_ID = '16'; // Bot-filtered upper funnel

const headers = { 'Authorization': `Bearer ${POSTHOG_KEY}` };

async function api(path) {
  const res = await fetch(`${POSTHOG_HOST}/api${path}`, { headers });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}

async function getInsightResult(insightId) {
  try {
    const insight = await api(`/projects/${PROJECT_ID}/insights/${insightId}/`);
    return insight.result || null;
  } catch (e) {
    console.error(`Failed to fetch insight ${insightId}: ${e.message}`);
    return null;
  }
}

async function main() {
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ') + ' UTC';

  // Fetch dashboard to get all insight IDs
  const dashboard = await api(`/projects/${PROJECT_ID}/dashboards/${DASHBOARD_ID}/`);
  const insightIds = dashboard.tiles.map(t => t.insight?.id).filter(Boolean);

  // Fetch each insight result in parallel
  const results = {};
  await Promise.all(insightIds.map(async id => {
    results[id] = await getInsightResult(id);
  }));

  // Also fetch dashboard 11 (original upper funnel) for wider metrics
  let dash11Data = {};
  try {
    const d11 = await api(`/projects/${PROJECT_ID}/dashboards/11/`);
    d11.tiles.forEach(t => {
      if (t.insight) dash11Data[t.insight.short_id] = t.insight.result;
    });
  } catch (e) {
    console.error('Could not fetch dashboard 11:', e.message);
  }

  // Map tile results by tile order (from dashboard 16)
  const tiles = dashboard.tiles;
  const tileResults = tiles.map(t => ({
    id: t.insight?.id,
    name: t.insight?.name,
    shortId: t.insight?.short_id,
    result: results[t.insight?.id]
  }));

  // Extract data from each tile
  // Tile order from dashboard 16:
  // 0: Signups today (clean) - BoldNumber
  // 1: Conv rate today (clean) - BoldNumber
  // 2: New Users yesterday (clean) - BoldNumber
  // 3: New User Conv Rate (prev day, clean) - BoldNumber
  // 4: DAU yesterday (clean) - BoldNumber
  // 5: Total New Users from Apr 16 (clean) - ActionsTable
  // 6: Today's real-time upper funnel by channel - ActionsTable
  // 7: Daily New Users by channel (clean) - ActionsTable
  // 8: Daily New Users (clean) - ActionsTable
  // 9: Daily Active Users (clean) - ActionsTable
  // 10: Total Active Users from Apr 16 (clean) - ActionsTable
  // 11: Filter impact - HogQL
  // 12: Raw vs Clean signups by day - HogQL

  // Parse tile results
  const getTile = (idx) => tileResults[idx]?.result;

  // Filter impact (tile 11)
  const filterImpactRaw = getTile(11);
  const filterImpact = filterImpactRaw?.[0] ? {
    totalRaw: filterImpactRaw[0][0],
    removedTier1: filterImpactRaw[0][1],
    removedTier2: filterImpactRaw[0][2],
    clean: filterImpactRaw[0][3]
  } : { totalRaw: 0, removedTier1: 0, removedTier2: 0, clean: 0 };

  // Raw vs Clean by day (tile 12)
  const rawVsCleanRaw = getTile(12) || [];

  // Daily New Users (tile 8)
  const dailyNewUsersRaw = getTile(8) || [];

  // Daily Active Users (tile 9)
  const dailyActiveUsersRaw = getTile(9) || [];

  // Daily by channel (tile 7)
  const dailyByChannelRaw = getTile(7) || [];

  // Process daily data
  const daily = dailyNewUsersRaw.map(row => ({
    date: row[0],
    newVisitors: row[1],
    cleanSignups: row[2],
    convRate: parseFloat(String(row[3]).replace('%', '')) || 0,
    dau: (dailyActiveUsersRaw.find(r => r[0] === row[0]) || [])[1] || 0
  }));

  // Add rawSignups from rawVsClean
  const rawCleanMap = {};
  rawVsCleanRaw.forEach(r => { rawCleanMap[r[0]] = r[1]; });
  daily.forEach(d => { d.rawSignups = rawCleanMap[d.date] || d.cleanSignups; });

  // Process daily active users
  const dailyActiveUsers = dailyActiveUsersRaw.map(row => ({
    date: row[0],
    dau: row[1],
    msgs: row[2],
    swaps: row[3],
    stakes: row[4],
    market: row[5],
    dna: row[6],
    portfolio: row[7],
    monitors: row[8]
  }));

  // Process daily new users with features
  const dailyNewUsers = dailyNewUsersRaw.map(row => ({
    date: row[0],
    visitors: row[1],
    signups: row[2],
    convRate: parseFloat(String(row[3]).replace('%', '')) || 0,
    msgs: row[4],
    swaps: row[5],
    stakes: row[6],
    market: row[7],
    dna: row[8],
    portfolio: row[9],
    monitors: row[10]
  }));

  // Process channel behavior
  const channelGroupMap = {
    'Referrals (organic)': 'Referral',
    'Referrals (paid)': 'Referral',
    'KOL Referrals': 'Referral',
    'google': 'ContentSEO',
    'blog': 'ContentSEO',
    'Direct': 'Direct',
    'twitter': 'Social',
    'facebook': 'Social',
    'youtube': 'Social',
    'discord': 'Social',
    'telegram': 'Social'
  };

  const dailyByChannel = {};
  dailyByChannelRaw.forEach(row => {
    const date = row[0].slice(5);
    const channel = row[1];
    const signups = row[3];
    const group = channelGroupMap[channel] || 'Other';
    if (!dailyByChannel[date]) dailyByChannel[date] = { Referral: 0, ContentSEO: 0, Direct: 0, Social: 0, Other: 0 };
    dailyByChannel[date][group] += signups;
  });

  const dailyByChannelArray = Object.entries(dailyByChannel).map(([date, groups]) => ({
    date: daily[0] ? daily.find(d => d.date.slice(5) === date)?.date || `2026-${date}` : `2026-${date}`,
    ...groups
  }));

  // Channel behavior raw (for per-channel table)
  const channelBehaviorRaw = dailyByChannelRaw
    .filter(r => r[3] > 0)
    .map(r => [r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10]]);

  // Calculate MAU (trailing 28-day from daily active users)
  const totalActive = dailyActiveUsers.reduce((s, d) => s + d.dau, 0);
  const trailingMAU = totalActive; // Simplified; real MAU needs unique user counting from warehouse

  // Calculate stickiness
  const latestDAU = dailyActiveUsers.length > 0 ? dailyActiveUsers[dailyActiveUsers.length - 1].dau : 0;
  const stickiness = trailingMAU > 0 ? (latestDAU / trailingMAU * 100).toFixed(1) : '0.0';

  // Generate data.js
  const dataJs = `// Auto-generated by GitHub Action at ${now}
// DO NOT EDIT MANUALLY — changes will be overwritten

window.dashboardData = {
  meta: {
    title: "Sorin Product Dashboard",
    lastUpdated: "${now}",
    dataStartDate: "${daily.length > 0 ? daily[0].date : '2026-04-16'}",
    refreshInterval: "Hourly (auto-refresh via GitHub Action)",
    timeDefinition: "All dates in UTC. Today = current UTC calendar day. DAU/Signups are bot-filtered (PostHog dashboard 16). Retention from warehouse (dashboard 11)."
  },
  upperFunnel: {
    botFilter: {
      tier1: "Referral users with exactly 5 messages + 0 feature events + 1 active day + 0 logins — catches scripted 'send 5 messages and leave' farms.",
      tier2: "Referral users with ≤1 msgs + 0 features + 1 day + 0 logins, from 5 known ghost-farm referral codes (≥80% ghost rate).",
      convRateDefinition: "Clean signups ÷ new visitors (first-pageview users).",
      source: "PostHog events (frontend only, undercounts mobile)."
    },
    filterImpact: ${JSON.stringify(filterImpact, null, 4)},
    daily: ${JSON.stringify(daily, null, 4)},
    dailyByChannel: ${JSON.stringify(dailyByChannelArray, null, 4)},
    channelBehaviorRaw: ${JSON.stringify(channelBehaviorRaw, null, 4)},
    dailyNewUsers: ${JSON.stringify(dailyNewUsers, null, 4)},
    dailyActiveUsers: ${JSON.stringify(dailyActiveUsers, null, 4)}
  },
  retention: {
    d7: 0.0,
    d14: 0.0,
    d30: 0.0,
    classicD1: 0.0,
    classicD7: 0.0,
    classicD30: 0.0,
    classicD90: 0.0,
    curr: 0.0,
    nurr: 0.0,
    currentUsers: 0,
    newUsers: 0
  },
  engagement: {
    current: {
      dau: ${latestDAU},
      mau: ${trailingMAU},
      stickiness: ${stickiness}
    },
    featureAdoption: {
      labels: ["Portfolio", "Market Signal", "Investment DNA", "Monitors", "Swap", "Stake"],
      dailyUsers: [0, 0, 0, 0, 0, 0],
      denominatorWAU: 0
    }
  },
  monetization: {
    monthlyRevenue: 0,
    totalSubscribedUsers: 0,
    msu: 0,
    mau: ${trailingMAU}
  }
};
`;

  const fs = require('fs');
  fs.writeFileSync('data.js', dataJs);
  console.log(`data.js updated at ${now}`);
  console.log(`Daily records: ${daily.length}`);
  console.log(`Channel behavior rows: ${channelBehaviorRaw.length}`);
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
