window.dashboardData = {
  meta: {
    title: "Sorin Product Dashboard",
    currentWeekLabel: "Current week to date",
    liveLabel: "Live"
  },
  upperFunnel: {
    currentWeek: {
      label: "2026-04-20~2026-04-21",
      signups: 1090,
      userViews: 3479
    },
    previousComparable: {
      label: "2026-04-16~2026-04-19",
      signups: 776
    },
    cumulative: {
      since: "2026-04-16",
      totalRegisteredUsers: 1931,
      totalUserViews: 9846
    },
    groupedChannelTrend: [
      { label: "Prev Window", Organic: 0,   PaidSocial: 0, Referral: 632, ContentSEO: 51, Other: 93 },
      { label: "Current WTD", Organic: 0,   PaidSocial: 0, Referral: 1024, ContentSEO: 13, Other: 53 }
    ],
    groupedChannelCurrentWeek: [
      { channel: "Referral", value: 1024 },
      { channel: "Content/SEO", value: 13 },
      { channel: "Other", value: 53 },
      { channel: "Organic", value: 0 },
      { channel: "Paid Social", value: 0 }
    ],
    currentWeekRawChannels: [
      { channel: "Referrals (organic)", signups: 1024, cvr: 89.2, group: "Referral" },
      { channel: "google", signups: 29, cvr: 4.37, group: "Content/SEO" },
      { channel: "Sahara AI", signups: 13, cvr: 20.63, group: "Other" },
      { channel: "twitter", signups: 7, cvr: 11.86, group: "Other" },
      { channel: "hs_email", signups: 2, cvr: 8.0, group: "Other" },
      { channel: "Direct", signups: 11, cvr: 0.75, group: "Other" },
      { channel: "Referrals (paid)", signups: 1, cvr: 20.0, group: "Other" },
      { channel: "KOL Referrals", signups: 2, cvr: 100.0, group: "Referral" },
      { channel: "beta.heysorin.ai", signups: 0, cvr: 0.0, group: "Other" },
      { channel: "facebook", signups: 0, cvr: 0.0, group: "Paid Social" },
      { channel: "Internal (heysorin)", signups: 0, cvr: 0.0, group: "Other" },
      { channel: "discord", signups: 0, cvr: 0.0, group: "Other" },
      { channel: "Other", signups: 0, cvr: 0.0, group: "Other" },
      { channel: "telegram", signups: 0, cvr: 0.0, group: "Other" },
      { channel: "x", signups: 0, cvr: 0.0, group: "Other" },
      { channel: "tokenpocket", signups: 0, cvr: 0.0, group: "Other" },
      { channel: "blog", signups: 1, cvr: 50.0, group: "Content/SEO" }
    ]
  },
  retention: {
    d1: 1.0,
    d7: 0.0,
    d30: 0.0,
    previousD1: 1.0
  },
  engagement: {
    current: {
      dau: 620,
      wau: 620,
      mau: 2357,
      usersSendingAtLeastOneMessage: 858,
      chatSessionsCreated: 3168,
      userMessagesSent: 3101
    },
    previousDay: {
      dau: 316,
      wau: 1472,
      mau: 2357,
      usersSendingAtLeastOneMessage: 238,
      chatSessionsCreated: 285,
      userMessagesSent: 657
    },
    dauTrend: [
      { date: "2026-04-16", newUsers: 163, returningUsers: 82, dau: 245 },
      { date: "2026-04-17", newUsers: 672, returningUsers: 116, dau: 788 },
      { date: "2026-04-18", newUsers: 189, returningUsers: 90, dau: 279 },
      { date: "2026-04-19", newUsers: 229, returningUsers: 87, dau: 316 },
      { date: "2026-04-20", newUsers: 492, returningUsers: 128, dau: 620 }
    ],
    userMessageDistribution: {
      labels: ["1-2", "3-5", "6-10", "11-20", "21-50", ">50"],
      values: [308, 583, 12, 7, 1, 0]
    },
    sessionDepthDistribution: {
      labels: ["1-2", "3-5", "6-10", "11-20", "21-50", ">50"],
      values: [3116, 35, 7, 4, 1, 0]
    },
    modeMix: {
      labels: ["Auto", "Fast", "Research"],
      values: [3076, 5, 20]
    },
    featureAdoption: {
      labels: ["Portfolio", "Market Signal", "Investment DNA", "Monitors", "Swap", "Stake"],
      dailyUsers: [122, 33, 6, 34, 2, 1],
      denominatorWAU: 620
    }
  },
  monetization: {
    monthlyRevenue: 73,
    totalSubscribedUsers: 3,    // 真实：3个付费用户
    msu: 2,                     // 真实：本月付费2人
    mau: 2357,
    // 按3人真实分布做的mock，更合理
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