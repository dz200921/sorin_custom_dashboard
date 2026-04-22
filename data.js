window.dashboardData = {
  meta: {
    title: "Sorin Product Dashboard",
    currentWeekLabel: "Current week to date",
    liveLabel: "Live"
  },
  upperFunnel: {
    currentWeek: {
      label: "2026-04-20~2026-04-21",
      signups: 1267,
      userViews: 3739
    },
    previousComparable: {
      label: "2026-04-16~2026-04-19",
      signups: 776
    },
    cumulative: {
      since: "2026-04-16",
      totalRegisteredUsers: 2108,
      totalUserViews: 10106
    },
    groupedChannelTrend: [
      { label: "Prev Window", Organic: 0, PaidSocial: 0, Referral: 632, ContentSEO: 51, Other: 93 },
      { label: "Current WTD", Organic: 0, PaidSocial: 0, Referral: 1164, ContentSEO: 17, Other: 66 }
    ],
    groupedChannelCurrentWeek: [
      { channel: "Referral", value: 1164 },
      { channel: "Content/SEO", value: 17 },
      { channel: "Other", value: 66 },
      { channel: "Organic", value: 0 },
      { channel: "Paid Social", value: 0 }
    ],
    currentWeekRawChannels: [
      { channel: "Referrals (organic)", signups: 1140, cvr: 88.5, group: "Referral" },
      { channel: "google", signups: 52, cvr: 4.5, group: "Content/SEO" },
      { channel: "Sahara AI", signups: 15, cvr: 17.05, group: "Other" },
      { channel: "twitter", signups: 12, cvr: 12.24, group: "Other" },
      { channel: "hs_email", signups: 2, cvr: 5.88, group: "Other" },
      { channel: "Direct", signups: 17, cvr: 1.01, group: "Other" },
      { channel: "Referrals (paid)", signups: 1, cvr: 14.29, group: "Other" },
      { channel: "KOL Referrals", signups: 8, cvr: 100.0, group: "Referral" },
      { channel: "beta.heysorin.ai", signups: 0, cvr: 0.0, group: "Other" },
      { channel: "facebook", signups: 0, cvr: 0.0, group: "Paid Social" },
      { channel: "Internal (heysorin)", signups: 0, cvr: 0.0, group: "Other" },
      { channel: "discord", signups: 1, cvr: 14.29, group: "Other" },
      { channel: "Other", signups: 0, cvr: 0.0, group: "Other" },
      { channel: "telegram", signups: 0, cvr: 0.0, group: "Other" },
      { channel: "x", signups: 0, cvr: 0.0, group: "Other" },
      { channel: "tokenpocket", signups: 0, cvr: 0.0, group: "Other" },
      { channel: "blog", signups: 1, cvr: 50.0, group: "Content/SEO" },
      { channel: "youtube", signups: 0, cvr: 0.0, group: "Other" },
      { channel: "ambassador", signups: 0, cvr: 0.0, group: "Other" }
    ]
  },
  retention: {
    d1: 1.0,
    d7: 0.276,
    d30: 0.0,
    previousD1: 1.0
  },
  engagement: {
    current: {
      dau: 260,
      wau: 825,
      mau: 2536,
      usersSendingAtLeastOneMessage: 467,
      chatSessionsCreated: 1715,
      userMessagesSent: 1954
    },
    previousDay: {
      dau: 620,
      wau: 825,
      mau: 2536,
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