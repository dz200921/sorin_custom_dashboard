window.dashboardData = {
  meta: {
    title: "Sorin Product Dashboard",
    lastUpdated: "2026-04-22",
    dataStartDate: "2026-04-16",
    timeDefinition: "All dates in UTC. Today = current UTC calendar day. DAU/Signups are bot-filtered (PostHog dashboard 16). Retention from warehouse (dashboard 11)."
  },
  upperFunnel: {
    botFilter: {
      tier1: "Referral users with exactly 5 messages + 0 feature events + 1 active day + 0 logins \u2014 catches scripted 'send 5 messages and leave' farms.",
      tier2: "Referral users with \u22641 msgs + 0 features + 1 day + 0 logins, from 5 known ghost-farm referral codes (\u226580% ghost rate).",
      convRateDefinition: "Clean signups \u00f7 new visitors (first-pageview users).",
      source: "PostHog events (frontend only, undercounts mobile)."
    },
    filterImpact: {
      totalRaw: 2223,
      removedTier1: 1063,
      removedTier2: 250,
      clean: 910
    },
    daily: [
      { date: "2026-04-16", newVisitors: 675, cleanSignups: 67, rawSignups: 67, convRate: 9.93, dau: 129 },
      { date: "2026-04-17", newVisitors: 3621, cleanSignups: 400, rawSignups: 471, convRate: 11.05, dau: 625 },
      { date: "2026-04-18", newVisitors: 1413, cleanSignups: 93, rawSignups: 95, convRate: 6.58, dau: 216 },
      { date: "2026-04-19", newVisitors: 1016, cleanSignups: 143, rawSignups: 143, convRate: 14.07, dau: 254 },
      { date: "2026-04-20", newVisitors: 2182, cleanSignups: 89, rawSignups: 751, convRate: 4.08, dau: 214 },
      { date: "2026-04-21", newVisitors: 1762, cleanSignups: 93, rawSignups: 383, convRate: 5.28, dau: 189 },
      { date: "2026-04-22", newVisitors: 1044, cleanSignups: 25, rawSignups: 134, convRate: 2.39, dau: 40 }
    ],
    dailyByChannel: [
      { date: "2026-04-16", Referral: 15, ContentSEO: 1, Direct: 16, Social: 16, Other: 19 },
      { date: "2026-04-17", Referral: 283, ContentSEO: 4, Direct: 54, Social: 29, Other: 30 },
      { date: "2026-04-18", Referral: 17, ContentSEO: 29, Direct: 18, Social: 14, Other: 15 },
      { date: "2026-04-19", Referral: 119, ContentSEO: 12, Direct: 5, Social: 1, Other: 6 },
      { date: "2026-04-20", Referral: 46, ContentSEO: 17, Direct: 9, Social: 6, Other: 11 },
      { date: "2026-04-21", Referral: 38, ContentSEO: 34, Direct: 9, Social: 6, Other: 6 },
      { date: "2026-04-22", Referral: 4, ContentSEO: 4, Direct: 0, Social: 1, Other: 0 }
    ],
    // From PostHog Tile 9: Daily New Users (clean)
    dailyNewUsers: [
      { date: "2026-04-16", visitors: 675, signups: 67, convRate: 9.93, msgs: 98, swaps: 0, stakes: 1, market: 36, dna: 13, portfolio: 84, monitors: 46 },
      { date: "2026-04-17", visitors: 3621, signups: 400, convRate: 11.05, msgs: 587, swaps: 0, stakes: 1, market: 90, dna: 88, portfolio: 283, monitors: 160 },
      { date: "2026-04-18", visitors: 1413, signups: 93, convRate: 6.58, msgs: 198, swaps: 0, stakes: 0, market: 39, dna: 16, portfolio: 242, monitors: 54 },
      { date: "2026-04-19", visitors: 1016, signups: 143, convRate: 14.07, msgs: 238, swaps: 0, stakes: 6, market: 23, dna: 8, portfolio: 146, monitors: 40 },
      { date: "2026-04-20", visitors: 2182, signups: 89, convRate: 4.08, msgs: 198, swaps: 2, stakes: 1, market: 33, dna: 6, portfolio: 122, monitors: 34 },
      { date: "2026-04-21", visitors: 1762, signups: 93, convRate: 5.28, msgs: 177, swaps: 1, stakes: 0, market: 27, dna: 3, portfolio: 121, monitors: 26 },
      { date: "2026-04-22", visitors: 1044, signups: 25, convRate: 2.39, msgs: 77, swaps: 0, stakes: 0, market: 7, dna: 0, portfolio: 47, monitors: 14 }
    ],
    // From PostHog Tile 8: Daily New Users by channel (clean)
    // [date, channel, visitors, signups, msgs, swaps, stakes, market, dna, portfolio, monitors]
    channelBehaviorRaw: [
      ["2026-04-16","Direct",379,16,7,0,0,2,4,5,6],
      ["2026-04-16","twitter",201,14,10,0,0,6,4,6,7],
      ["2026-04-16","Sahara AI",103,17,16,0,0,7,1,5,4],
      ["2026-04-16","Internal",11,1,0,0,0,0,0,0,0],
      ["2026-04-16","google",10,1,1,0,0,0,0,1,0],
      ["2026-04-16","Referrals (organic)",20,13,4,0,0,2,0,4,3],
      ["2026-04-16","beta.heysorin.ai",11,1,0,0,0,0,0,0,0],
      ["2026-04-16","x",8,2,2,0,0,1,1,1,1],
      ["2026-04-16","Referrals (paid)",3,2,2,0,0,2,0,1,0],
      ["2026-04-17","Direct",1580,54,39,0,0,10,3,25,18],
      ["2026-04-17","twitter",1320,28,18,0,0,7,0,6,6],
      ["2026-04-17","Referrals (organic)",390,266,249,0,1,20,37,48,35],
      ["2026-04-17","Sahara AI",105,21,18,0,0,4,1,9,6],
      ["2026-04-17","hs_email",104,9,7,0,0,1,2,3,1],
      ["2026-04-17","google",38,3,1,0,0,0,0,1,1],
      ["2026-04-17","Referrals (paid)",20,17,12,0,0,7,0,4,4],
      ["2026-04-17","discord",4,1,1,0,0,0,0,0,0],
      ["2026-04-17","blog",2,1,1,0,0,1,0,0,0],
      ["2026-04-18","google",890,29,22,0,0,4,0,4,0],
      ["2026-04-18","Direct",271,18,14,0,0,3,3,6,2],
      ["2026-04-18","twitter",140,13,7,0,0,5,1,3,4],
      ["2026-04-18","Referrals (organic)",28,16,14,0,0,2,2,9,9],
      ["2026-04-18","Sahara AI",50,9,7,0,0,1,1,4,3],
      ["2026-04-18","hs_email",23,5,1,0,0,2,1,3,0],
      ["2026-04-18","discord",7,1,1,0,0,0,1,1,1],
      ["2026-04-18","Referrals (paid)",2,1,1,0,0,1,1,1,1],
      ["2026-04-18","Other",3,1,1,0,0,0,0,1,0],
      ["2026-04-19","google",566,12,7,0,0,2,1,0,0],
      ["2026-04-19","Direct",244,5,5,0,0,1,1,2,2],
      ["2026-04-19","Referrals (organic)",121,116,111,0,5,2,1,3,1],
      ["2026-04-19","twitter",44,1,0,0,0,0,0,1,1],
      ["2026-04-19","Sahara AI",22,4,1,0,0,2,0,4,3],
      ["2026-04-19","hs_email",22,2,0,0,0,0,0,1,0],
      ["2026-04-19","Referrals (paid)",3,3,3,0,0,1,0,1,1],
      ["2026-04-20","Direct",891,9,7,1,0,1,0,2,0],
      ["2026-04-20","google",464,17,13,0,0,2,0,2,0],
      ["2026-04-20","Referrals (organic)",56,45,32,0,0,2,1,5,2],
      ["2026-04-20","twitter",44,6,5,0,0,4,0,1,2],
      ["2026-04-20","Sahara AI",44,9,5,0,0,2,1,4,3],
      ["2026-04-20","hs_email",13,2,2,0,0,0,2,2,2],
      ["2026-04-20","Referrals (paid)",1,1,0,0,0,1,0,0,1],
      ["2026-04-21","google",832,33,25,0,0,3,0,1,0],
      ["2026-04-21","Direct",521,9,8,0,0,1,0,3,1],
      ["2026-04-21","Referrals (organic)",43,38,31,0,0,3,1,2,1],
      ["2026-04-21","twitter",35,5,2,0,0,1,0,3,1],
      ["2026-04-21","Sahara AI",31,6,5,0,0,1,0,1,1],
      ["2026-04-21","discord",3,1,1,0,0,0,0,0,0],
      ["2026-04-21","blog",2,1,0,0,0,0,0,0,0],
      ["2026-04-22","google",144,4,3,0,0,2,0,1,0],
      ["2026-04-22","Referrals (organic)",17,4,3,0,0,0,0,0,0],
      ["2026-04-22","twitter",9,1,1,0,0,0,0,1,0]
    ],
    // From PostHog Tile 10: Daily Active Users (clean)
    dailyActiveUsers: [
      { date: "2026-04-16", dau: 129, msgs: 98, swaps: 0, stakes: 1, market: 36, dna: 13, portfolio: 84, monitors: 46 },
      { date: "2026-04-17", dau: 625, msgs: 587, swaps: 0, stakes: 1, market: 90, dna: 88, portfolio: 283, monitors: 160 },
      { date: "2026-04-18", dau: 216, msgs: 198, swaps: 0, stakes: 0, market: 39, dna: 16, portfolio: 242, monitors: 54 },
      { date: "2026-04-19", dau: 254, msgs: 238, swaps: 0, stakes: 6, market: 23, dna: 8, portfolio: 146, monitors: 40 },
      { date: "2026-04-20", dau: 214, msgs: 198, swaps: 2, stakes: 1, market: 33, dna: 6, portfolio: 122, monitors: 34 },
      { date: "2026-04-21", dau: 189, msgs: 177, swaps: 1, stakes: 0, market: 27, dna: 3, portfolio: 121, monitors: 26 },
      { date: "2026-04-22", dau: 40, msgs: 37, swaps: 0, stakes: 0, market: 3, dna: 0, portfolio: 26, monitors: 10 }
    ]
  },
  retention: {
    d7: 0.276,
    d14: 0.0,
    d30: 0.0,
    classicD1: 0.0,
    classicD7: 0.0,
    classicD30: 0.0,
    classicD90: 0.0,
    curr: 5.65,
    nurr: 4.55,
    currentUsers: 74,
    newUsers: 177
  },
  engagement: {
    current: {
      dau: 260, wau: 825, mau: 2536,
      usersSendingAtLeastOneMessage: 467,
      chatSessionsCreated: 1715,
      userMessagesSent: 1954
    },
    previousDay: {
      dau: 620, wau: 825, mau: 2536,
      usersSendingAtLeastOneMessage: 238,
      chatSessionsCreated: 285,
      userMessagesSent: 657
    },
    dauTrend: [
      { date: "2026-04-16", newUsers: 163, returningUsers: 82, dau: 245 },
      { date: "2026-04-17", newUsers: 672, returningUsers: 116, dau: 788 },
      { date: "2026-04-18", newUsers: 189, returningUsers: 90, dau: 279 },
      { date: "2026-04-19", newUsers: 229, returningUsers: 87, dau: 316 },
      { date: "2026-04-20", newUsers: 492, returningUsers: 128, dau: 620 },
      { date: "2026-04-21", newUsers: 177, returningUsers: 83, dau: 260 }
    ],
    userMessageDistribution: {
      labels: ["1-2", "3-5", "6-10", "11-20", "21-50", ">50"],
      values: [103, 335, 12, 4, 1, 0]
    },
    sessionDepthDistribution: {
      labels: ["1-2", "3-5", "6-10", "11-20", "21-50", ">50"],
      values: [1665, 33, 11, 2, 0, 0]
    },
    modeMix: {
      labels: ["Auto", "Fast", "Research"],
      values: [1937, 11, 6]
    },
    featureAdoption: {
      labels: ["Portfolio", "Market Signal", "Investment DNA", "Monitors", "Swap", "Stake"],
      dailyUsers: [122, 33, 6, 34, 2, 1],
      denominatorWAU: 825
    }
  },
  monetization: {
    monthlyRevenue: 73,
    totalSubscribedUsers: 3,
    msu: 2,
    mau: 2536,
    mockRevenueByTier: [
      { label: "Power (5+ sess/wk)", value: 39 },
      { label: "Medium (2-4 sess/wk)", value: 34 },
      { label: "Casual (1 sess/wk)", value: 0 },
      { label: "Rare (<1 sess/wk)", value: 0 }
    ],
    transactions: [
      { action: "Swap", initiated: 1, confirmed: 0, rate: 0, volume: 0 },
      { action: "Transfer", initiated: 0, confirmed: 0, rate: 0, volume: 0 },
      { action: "Stake", initiated: 0, confirmed: 0, rate: 0, volume: 0 }
    ]
  }
};
