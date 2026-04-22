window.dashboardData = {
  meta: {
    title: "Sorin Product Dashboard",
    lastUpdated: "2026-04-22",
    dataStartDate: "2026-04-16"
  },
  upperFunnel: {
    botFilter: {
      tier1: "Referral users with exactly 5 messages + 0 feature events + 1 active day + 0 logins — catches scripted 'send 5 messages and leave' farms.",
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
    ]
  },
  retention: {
    d1: 1.0,
    d7: 0.276,
    d30: 0.0,
    previousD1: 1.0,
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
