const data = window.dashboardData;
const charts = {};
let currentRange = "7d";

/* ── Utilities ── */

function fmt(n) { return new Intl.NumberFormat("en-US").format(n); }
function fmtPct(ratio, d = 1) { return `${(ratio * 100).toFixed(d)}%`; }
function fmtPctV(pct, d = 1) { return isNaN(pct) ? "0%" : `${pct.toFixed(d)}%`; }
function fmtMoney(n, d = 0) { return `$${Number(n).toFixed(d)}`; }
function ratio(a, b) { return b ? a / b : 0; }
function deltaPct(cur, prev) { return prev ? ((cur - prev) / prev) * 100 : null; }
function setText(id, v) { const el = document.getElementById(id); if (el) el.textContent = v; }

function setPill(id, value, positiveUp = true, suffix = "%", d = 1) {
  const el = document.getElementById(id);
  if (!el) return;
  if (value === null || value === undefined || Number.isNaN(value)) {
    el.className = "pill pill-neutral"; el.textContent = "\u2014"; return;
  }
  const positive = positiveUp ? value >= 0 : value <= 0;
  el.className = `pill ${positive ? "pill-green" : "pill-red"}`;
  el.textContent = `${value >= 0 ? "\u25B2" : "\u25BC"} ${Math.abs(value).toFixed(d)}${suffix}`;
}

function makeChart(canvasId, config) {
  if (charts[canvasId]) charts[canvasId].destroy();
  charts[canvasId] = new Chart(document.getElementById(canvasId), config);
}

/* ── Time Range Filter ── */

function filterDaily(arr, range) {
  if (range === "all") return arr.slice();
  const last = new Date(arr[arr.length - 1].date);
  const days = range === "3d" ? 3 : range === "7d" ? 7 : 30;
  const start = new Date(last);
  start.setDate(start.getDate() - days + 1);
  return arr.filter(d => new Date(d.date) >= start);
}

function periodLabel(arr) {
  if (!arr.length) return "";
  const first = arr[0].date;
  const last = arr[arr.length - 1].date;
  return first === last ? first : `${first} ~ ${last}`;
}

function onTimeRangeChange(range) {
  currentRange = range;
  document.querySelectorAll(".time-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.range === range);
  });
  buildUpperFunnel();
  buildEngagement();
}

/* ── Bot Filter Toggle ── */

function toggleBotFilter() {
  const c = document.getElementById("botFilterContent");
  const arrow = document.getElementById("botFilterArrow");
  const open = c.classList.toggle("open");
  arrow.textContent = open ? "\u25BC" : "\u25B6";
}

/* ── Upper Funnel (Bot-filtered PostHog Data) ── */

function buildUpperFunnel() {
  const daily = filterDaily(data.upperFunnel.daily, currentRange);
  const channels = filterDaily(data.upperFunnel.dailyByChannel, currentRange);
  const newUsersTable = filterDaily(data.upperFunnel.dailyNewUsers, currentRange);
  const activeUsersTable = filterDaily(data.upperFunnel.dailyActiveUsers, currentRange);
  const bf = data.upperFunnel.botFilter;
  const fi = data.upperFunnel.filterImpact;

  // Period label
  setText("ufPeriod", periodLabel(daily));

  // Bot filter explanation
  setText("bfTier1", bf.tier1);
  setText("bfTier2", bf.tier2);
  setText("bfConvRate", bf.convRateDefinition);
  setText("bfSource", bf.source);
  setText("bfRaw", fmt(fi.totalRaw));
  setText("bfTier1Removed", fmt(fi.removedTier1));
  setText("bfTier2Removed", fmt(fi.removedTier2));
  setText("bfClean", fmt(fi.clean));

  // Aggregate KPIs
  const totalClean = daily.reduce((s, d) => s + d.cleanSignups, 0);
  const totalRaw = daily.reduce((s, d) => s + d.rawSignups, 0);
  const totalVisitors = daily.reduce((s, d) => s + d.newVisitors, 0);
  const convRate = ratio(totalClean, totalVisitors) * 100;
  const botRate = ratio(totalRaw - totalClean, totalRaw) * 100;
  const latestDau = daily[daily.length - 1].dau;
  const prevDau = daily.length >= 2 ? daily[daily.length - 2].dau : null;

  // KPI: Clean Signups
  const prevClean = daily.length >= 2 ? daily[daily.length - 2].cleanSignups : null;
  setText("ufCleanSignups", fmt(totalClean));
  setText("ufCleanSignupsSub", `${fmt(daily[daily.length - 1].cleanSignups)} today (clean)`);
  setPill("ufCleanSignupsDelta", deltaPct(daily[daily.length - 1].cleanSignups, prevClean));

  // KPI: Conv Rate
  setText("ufConvRate", `${convRate.toFixed(2)}%`);
  setText("ufConvRateSub", `${fmt(totalClean)} clean / ${fmt(totalVisitors)} visitors`);
  if (daily.length >= 2) {
    setPill("ufConvRateDelta", daily[daily.length - 1].convRate - daily[daily.length - 2].convRate, true, "pp");
  }

  // KPI: DAU
  setText("ufDau", fmt(latestDau));
  setText("ufDauSub", `${daily[daily.length - 1].date} (clean, bot-filtered)`);
  setPill("ufDauDelta", deltaPct(latestDau, prevDau));

  // KPI: Bot Rate
  setText("ufBotRate", `${botRate.toFixed(1)}%`);
  setText("ufBotRateSub", `${fmt(totalRaw - totalClean)} bots removed / ${fmt(totalRaw)} raw`);

  // Chart: Daily Signups Raw vs Clean
  makeChart("dailySignupsChart", {
    type: "line",
    data: {
      labels: daily.map(d => d.date.slice(5)),
      datasets: [
        {
          label: "Raw Signups",
          data: daily.map(d => d.rawSignups),
          borderColor: "#EF4444",
          backgroundColor: "rgba(239,68,68,0.06)",
          borderDash: [5, 3], pointRadius: 3, tension: 0.3
        },
        {
          label: "Clean Signups",
          data: daily.map(d => d.cleanSignups),
          borderColor: "#2F5496",
          backgroundColor: "rgba(47,84,150,0.10)",
          fill: true, pointRadius: 4, tension: 0.3
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 10 } } },
      scales: { x: { grid: { display: false } }, y: { beginAtZero: true } }
    }
  });

  // Chart: Channel Breakdown
  const channelColors = { Referral: "#10B981", ContentSEO: "#4472C4", Direct: "#F59E0B", Social: "#8B5CF6", Other: "#94A3B8" };
  const channelLabels = { Referral: "Referral", ContentSEO: "Content/SEO", Direct: "Direct", Social: "Social", Other: "Other" };
  const channelKeys = Object.keys(channelColors);

  makeChart("channelChart", {
    type: "bar",
    data: {
      labels: channels.map(d => d.date.slice(5)),
      datasets: channelKeys.map(k => ({
        label: channelLabels[k],
        data: channels.map(d => d[k]),
        backgroundColor: channelColors[k],
        stack: "signups"
      }))
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 10 } } },
      scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, beginAtZero: true } }
    }
  });

  // Channel insight
  const totalReferral = channels.reduce((s, d) => s + d.Referral, 0);
  const refShare = ratio(totalReferral, totalClean) * 100;
  setText("channelInsight",
    `Referral drives ${refShare.toFixed(1)}% of clean signups in this period. Bot filtering removes ghost-farm referrals while keeping genuine organic referrals.`);

  // Channel Behavior Table (aggregated from PostHog Tile 8)
  const raw = data.upperFunnel.channelBehaviorRaw;
  const days = currentRange === "3d" ? 3 : currentRange === "7d" ? 7 : currentRange === "30d" ? 30 : 9999;
  const lastD = new Date(daily[daily.length - 1].date);
  const rangeStart = new Date(lastD);
  rangeStart.setDate(rangeStart.getDate() - days + 1);

  const agg = {};
  raw.filter(r => currentRange === "all" || new Date(r[0]) >= rangeStart).forEach(r => {
    const ch = r[1];
    if (!agg[ch]) agg[ch] = { channel: ch, visitors: 0, signups: 0, msgs: 0, swaps: 0, stakes: 0, market: 0, dna: 0, portfolio: 0, monitors: 0 };
    agg[ch].visitors += r[2];
    agg[ch].signups += r[3];
    agg[ch].msgs += r[4];
    agg[ch].swaps += r[5];
    agg[ch].stakes += r[6];
    agg[ch].market += r[7];
    agg[ch].dna += r[8];
    agg[ch].portfolio += r[9];
    agg[ch].monitors += r[10];
  });

  const sorted = Object.values(agg).sort((a, b) => b.signups - a.signups);
  const chBody = document.querySelector("#channelBehaviorTable tbody");
  chBody.innerHTML = sorted.map(c => {
    const cvr = ratio(c.signups, c.visitors) * 100;
    return `<tr>
      <td><strong>${c.channel}</strong></td>
      <td class="num">${fmt(c.visitors)}</td>
      <td class="num">${fmt(c.signups)}</td>
      <td class="num">${cvr.toFixed(1)}%</td>
      <td class="num">${fmt(c.msgs)}</td>
      <td class="num">${c.swaps}</td>
      <td class="num">${c.stakes}</td>
      <td class="num">${fmt(c.market)}</td>
      <td class="num">${fmt(c.dna)}</td>
      <td class="num">${fmt(c.portfolio)}</td>
      <td class="num">${fmt(c.monitors)}</td>
    </tr>`;
  }).join("");

  // Table: Daily New Users
  const nuBody = document.querySelector("#dailyNewUsersTable tbody");
  nuBody.innerHTML = newUsersTable.map(r => `<tr>
    <td>${r.date.slice(5)}</td>
    <td class="num">${fmt(r.visitors)}</td>
    <td class="num">${fmt(r.signups)}</td>
    <td class="num">${r.convRate.toFixed(1)}%</td>
    <td class="num">${fmt(r.msgs)}</td>
    <td class="num">${r.swaps}</td>
    <td class="num">${r.stakes}</td>
    <td class="num">${fmt(r.market)}</td>
    <td class="num">${fmt(r.dna)}</td>
    <td class="num">${fmt(r.portfolio)}</td>
    <td class="num">${fmt(r.monitors)}</td>
  </tr>`).join("");

  // Table: Daily Active Users
  const auBody = document.querySelector("#dailyActiveUsersTable tbody");
  auBody.innerHTML = activeUsersTable.map(r => `<tr>
    <td>${r.date.slice(5)}</td>
    <td class="num">${fmt(r.dau)}</td>
    <td class="num">${fmt(r.msgs)}</td>
    <td class="num">${r.swaps}</td>
    <td class="num">${r.stakes}</td>
    <td class="num">${fmt(r.market)}</td>
    <td class="num">${fmt(r.dna)}</td>
    <td class="num">${fmt(r.portfolio)}</td>
    <td class="num">${fmt(r.monitors)}</td>
  </tr>`).join("");
}

/* ── Retention (numbers only) ── */

function buildRetention() {
  const r = data.retention;

  // Window retention
  setText("retentionD7", fmtPctV(r.d7 * 100, 1));
  setText("retentionD14", fmtPctV(r.d14 * 100, 1));
  setText("retentionD30", fmtPctV(r.d30 * 100, 1));

  // Classic retention D_k
  setText("classicD1", fmtPctV((r.classicD1 || 0) * 100, 1));
  setText("classicD7", fmtPctV((r.classicD7 || 0) * 100, 1));
  setText("classicD30", fmtPctV((r.classicD30 || 0) * 100, 1));
  setText("classicD90", fmtPctV((r.classicD90 || 0) * 100, 1));

  // Stickiness = DAU / trailing 28-day MAU
  const dau = data.upperFunnel.dailyActiveUsers;
  const latestDAU = dau.length > 0 ? dau[dau.length - 1].dau : 0;
  const trailing28 = dau.slice(-28).reduce((s, d) => s + d.dau, 0);
  const stickiness = trailing28 > 0 ? (latestDAU / trailing28 * 100).toFixed(1) + "%" : "—";
  setText("stickiness", stickiness);

  // Retention health
  setText("ret-health", `${r.curr.toFixed(2)}% / ${r.nurr.toFixed(2)}%`);
  setText("curr", `${r.curr.toFixed(2)}%`);
  setText("nurr", `${r.nurr.toFixed(2)}%`);
  setText("current-users", fmt(r.currentUsers));
  setText("new-users", fmt(r.newUsers));
  setText("retPeriod", `Data as of ${data.meta.lastUpdated}`);
}

/* ── Engagement (PostHog bot-filtered data) ── */

function buildEngagement() {
  const cur = data.engagement.current;
  const prev = data.engagement.previousDay;

  // Use PostHog DAU data (bot-filtered), filtered by time range
  const phDau = filterDaily(data.upperFunnel.dailyActiveUsers, currentRange);
  const phSignups = filterDaily(data.upperFunnel.dailyNewUsers, currentRange);
  setText("engPeriod", periodLabel(phDau));

  // Build merged trend: DAU from PostHog, new/returning split
  const dauTrend = phDau.map((d, i) => {
    const s = phSignups[i];
    const dnu = s ? s.signups : 0;
    const returning = Math.max(d.dau - dnu, 0);
    return { date: d.date, dau: d.dau, newUsers: dnu, returningUsers: returning };
  });

  const lastDay = dauTrend[dauTrend.length - 1];
  const prevDay = dauTrend.length >= 2 ? dauTrend[dauTrend.length - 2] : null;
  const displayDAU = lastDay.dau;
  const displayPrevDAU = prevDay ? prevDay.dau : null;

  const stickCur = ratio(displayDAU, cur.mau);
  const stickPrev = prevDay ? ratio(prevDay.dau, cur.mau) : stickCur;
  const mpsCur = ratio(cur.userMessagesSent, cur.chatSessionsCreated);
  const mpsPrev = ratio(prev.userMessagesSent, prev.chatSessionsCreated);
  const mpuCur = ratio(cur.userMessagesSent, cur.usersSendingAtLeastOneMessage);
  const mpuPrev = ratio(prev.userMessagesSent, prev.usersSendingAtLeastOneMessage);

  setText("engagementDAU", fmt(displayDAU));
  setText("engagementDAUSub", `WAU: ${fmt(cur.wau)} \u00b7 MAU: ${fmt(cur.mau)} \u00b7 Source: PostHog (clean)`);
  setPill("engagementDAUDelta", deltaPct(displayDAU, displayPrevDAU));

  setText("engagementStickiness", fmtPct(stickCur, 1));
  setPill("engagementStickinessDelta", (stickCur - stickPrev) * 100, true, "pp");

  setText("engagementMsgsPerSession", mpsCur.toFixed(2));
  setPill("engagementMsgsPerSessionDelta", deltaPct(mpsCur, mpsPrev));

  setText("engagementMsgsPerUser", mpuCur.toFixed(2));
  setPill("engagementMsgsPerUserDelta", deltaPct(mpuCur, mpuPrev));

  makeChart("dauTrendChart", {
    type: "line",
    data: {
      labels: dauTrend.map(d => d.date.slice(5)),
      datasets: [
        { label: "Returning DAU", data: dauTrend.map(d => d.returningUsers), borderColor: "#3559a1", backgroundColor: "rgba(53,89,161,0.08)", pointRadius: 4, tension: 0.25 },
        { label: "New DAU", data: dauTrend.map(d => d.newUsers), borderColor: "#1fb980", backgroundColor: "rgba(31,185,128,0.08)", pointRadius: 4, tension: 0.25 }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true } } }
  });

  makeChart("userMsgDistChart", {
    type: "bar",
    data: { labels: data.engagement.userMessageDistribution.labels, datasets: [{ data: data.engagement.userMessageDistribution.values, backgroundColor: ["#4d77c3","#6d28d9","#2a9d8f","#db2777","#ef4444","#8b5a2b"] }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true } } }
  });

  makeChart("sessionDepthChart", {
    type: "bar",
    data: { labels: data.engagement.sessionDepthDistribution.labels, datasets: [{ data: data.engagement.sessionDepthDistribution.values, backgroundColor: ["#4d77c3","#6d28d9","#2a9d8f","#db2777","#ef4444","#8b5a2b"] }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true } } }
  });

  makeChart("modeMixChart", {
    type: "doughnut",
    data: { labels: data.engagement.modeMix.labels, datasets: [{ data: data.engagement.modeMix.values, backgroundColor: ["#3559a1","#f59e0b","#1fb980"], borderColor: "#fff", borderWidth: 2 }] },
    options: { responsive: true, maintainAspectRatio: false, cutout: "68%", plugins: { legend: { position: "bottom" } } }
  });

  const featPct = data.engagement.featureAdoption.dailyUsers.map(v => ratio(v, data.engagement.featureAdoption.denominatorWAU) * 100);
  makeChart("featureAdoptionChart", {
    type: "bar",
    data: { labels: data.engagement.featureAdoption.labels, datasets: [{ data: featPct, backgroundColor: ["#3559a1","#4d77c3","#87b0e3","#1fb980","#f59e0b","#f97316"] }] },
    options: { indexAxis: "y", responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.raw.toFixed(1)}%` } } }, scales: { x: { beginAtZero: true, max: 100, ticks: { callback: v => `${v}%` } }, y: { grid: { display: false } } } }
  });
}

/* ── Monetization ── */

function buildMonetization() {
  const m = data.monetization;
  const arpu = ratio(m.monthlyRevenue, m.mau);
  const rppu = ratio(m.monthlyRevenue, m.msu);

  setText("monthlyArpu", fmtMoney(arpu, 2));
  setText("monthlyRevenue", fmtMoney(m.monthlyRevenue));
  setText("totalSubscribedUsers", fmt(m.totalSubscribedUsers));
  setText("revenuePerPayingUser", fmtMoney(rppu, 2));
  setText("msuValue", fmt(m.msu));
  setText("monPeriod", `Monthly data as of ${data.meta.lastUpdated}`);

  makeChart("revenueTierChart", {
    type: "doughnut",
    data: { labels: m.mockRevenueByTier.map(x => x.label), datasets: [{ data: m.mockRevenueByTier.map(x => x.value), backgroundColor: ["#3559a1","#4d77c3","#9ec8f5","#c7d0dd"], borderColor: "#fff", borderWidth: 2 }] },
    options: { responsive: true, maintainAspectRatio: false, cutout: "62%", plugins: { legend: { position: "right" } } }
  });

  const table = document.getElementById("transactionsTable");
  table.innerHTML = `
    <thead><tr><th>Action</th><th>Initiated</th><th>Confirmed</th><th>Rate</th><th>Volume</th></tr></thead>
    <tbody>${m.transactions.map(r => `<tr><td>${r.action}</td><td>${fmt(r.initiated)}</td><td>${fmt(r.confirmed)}</td><td>${r.rate.toFixed(1)}%</td><td>${fmtMoney(r.volume, 2)}</td></tr>`).join("")}</tbody>`;
}

/* ── Init ── */

function init() {
  setText("versionBadge", "\u25CF v4");
  setText("lastUpdated", `Updated ${data.meta.lastUpdated}`);
  setText("timeDef", data.meta.timeDefinition || "All dates in UTC. Bot-filtered from PostHog.");
  buildUpperFunnel();
  buildRetention();
  buildEngagement();
  buildMonetization();
}

document.addEventListener("DOMContentLoaded", init);
