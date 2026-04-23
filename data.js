window.dashboardData = {
  meta: {
    title: "Sorin Product Dashboard",
    version: "v6",
    lastUpdated: "2026-04-23",
    dataStartDate: "2026-04-16",
    snapshotNote: "Upper funnel uses the latest clean / raw comparison and 2026-04-23 live floor snapshot. Detailed channel and campaign tables use the latest available screenshot rows."
  },
  upperFunnel: {
    botFilter: {
      tier1: "Referral users with exactly 5 messages, 0 feature clicks, 1 active day, and 0 sign-ins. This removes the scripted 'send 5 messages and leave' pattern.",
      tier2: "Referral users from 5 known ghost-farm codes with <=1 message, 0 engagement, and 0 sign-ins.",
      convRateDefinition: "Clean signups / new visitors, where new visitors are first-ever pageview users on heysorin.ai.",
      source: "PostHog frontend events for live and product-action views; warehouse-backed screenshots for cumulative and prior-day rows."
    },
    headline: {
      todayCleanSignupsFloor: 40,
      todayFloorConvRate: 5.31,
      yesterdayCleanSignups: 100,
      yesterdayCleanConvRate: 4.4,
      yesterdayCleanDau: 210
    },
    filterImpact: {
      totalRaw: 2667,
      removedTier1: 1401,
      removedTier2: 250,
      clean: 1016
    },
    rawVsCleanDaily: [
      { date: "2026-04-16", rawSignups: 67, cleanSignups: 67 },
      { date: "2026-04-17", rawSignups: 471, cleanSignups: 400 },
      { date: "2026-04-18", rawSignups: 95, cleanSignups: 93 },
      { date: "2026-04-19", rawSignups: 143, cleanSignups: 143 },
      { date: "2026-04-20", rawSignups: 751, cleanSignups: 89 },
      { date: "2026-04-21", rawSignups: 383, cleanSignups: 93 },
      { date: "2026-04-22", rawSignups: 547, cleanSignups: 100 },
      { date: "2026-04-23", rawSignups: 210, cleanSignups: 31 }
    ],
    daily: [
      { date: "2026-04-16", newVisitors: 675, cleanSignups: 67, rawSignups: 67, convRate: 9.93, dau: 121, msgs: 98, transfers: 0, swaps: 0, stakes: 1, market: 36, dna: 13, portfolio: 84, monitors: 46 },
      { date: "2026-04-17", newVisitors: 3550, cleanSignups: 400, rawSignups: 471, convRate: 11.27, dau: 625, msgs: 587, transfers: 1, swaps: 0, stakes: 1, market: 90, dna: 88, portfolio: 283, monitors: 160 },
      { date: "2026-04-18", newVisitors: 1411, cleanSignups: 93, rawSignups: 95, convRate: 6.59, dau: 216, msgs: 198, transfers: 0, swaps: 0, stakes: 0, market: 39, dna: 16, portfolio: 242, monitors: 54 },
      { date: "2026-04-19", newVisitors: 1016, cleanSignups: 143, rawSignups: 143, convRate: 14.07, dau: 254, msgs: 238, transfers: 0, swaps: 0, stakes: 6, market: 23, dna: 8, portfolio: 146, monitors: 40 },
      { date: "2026-04-20", newVisitors: 1520, cleanSignups: 89, rawSignups: 751, convRate: 5.86, dau: 214, msgs: 198, transfers: 0, swaps: 2, stakes: 1, market: 33, dna: 6, portfolio: 122, monitors: 34 },
      { date: "2026-04-21", newVisitors: 1472, cleanSignups: 93, rawSignups: 383, convRate: 6.32, dau: 189, msgs: 177, transfers: 0, swaps: 1, stakes: 0, market: 27, dna: 3, portfolio: 121, monitors: 26 },
      { date: "2026-04-22", newVisitors: 2271, cleanSignups: 100, rawSignups: 547, convRate: 4.4, dau: 210, msgs: 194, transfers: 0, swaps: 0, stakes: 0, market: 30, dna: 10, portfolio: 190, monitors: 32 },
      { date: "2026-04-23", newVisitors: 655, cleanSignups: 31, rawSignups: 210, convRate: 4.73, dau: 47, msgs: 39, transfers: 0, swaps: 0, stakes: 0, market: 9, dna: 1, portfolio: 42, monitors: 3 }
    ],
    dailyActiveUsers: [
      { date: "2026-04-16", dau: 121, msgs: 98, transfers: 0, swaps: 0, stakes: 1, market: 36, dna: 13, portfolio: 84, monitors: 46 },
      { date: "2026-04-17", dau: 625, msgs: 587, transfers: 1, swaps: 0, stakes: 1, market: 90, dna: 88, portfolio: 283, monitors: 160 },
      { date: "2026-04-18", dau: 216, msgs: 198, transfers: 0, swaps: 0, stakes: 0, market: 39, dna: 16, portfolio: 241, monitors: 54 },
      { date: "2026-04-19", dau: 254, msgs: 238, transfers: 0, swaps: 0, stakes: 6, market: 23, dna: 8, portfolio: 146, monitors: 40 },
      { date: "2026-04-20", dau: 214, msgs: 198, transfers: 0, swaps: 2, stakes: 1, market: 33, dna: 6, portfolio: 122, monitors: 34 },
      { date: "2026-04-21", dau: 189, msgs: 177, transfers: 0, swaps: 1, stakes: 0, market: 27, dna: 3, portfolio: 121, monitors: 26 },
      { date: "2026-04-22", dau: 210, msgs: 194, transfers: 0, swaps: 0, stakes: 0, market: 30, dna: 10, portfolio: 190, monitors: 32 },
      { date: "2026-04-23", dau: 47, msgs: 39, transfers: 0, swaps: 0, stakes: 0, market: 9, dna: 1, portfolio: 42, monitors: 3 }
    ],
    todayRealtime: [
      { date: "2026-04-23", channel: "google", pageVisits: 479, newVisitors: 393, signups: 0, convRate: 0, msgs: 0, transfers: 0, swaps: 0, stakes: 0, market: 0, dna: 0, portfolio: 0, monitors: 0 },
      { date: "2026-04-23", channel: "Direct", pageVisits: 400, newVisitors: 282, signups: 0, convRate: 0, msgs: 0, transfers: 0, swaps: 0, stakes: 0, market: 0, dna: 0, portfolio: 0, monitors: 0 },
      { date: "2026-04-23", channel: "Referrals (organic)", pageVisits: 70, newVisitors: 30, signups: 30, convRate: 100, msgs: 22, transfers: 0, swaps: 0, stakes: 0, market: 5, dna: 1, portfolio: 2, monitors: 0 },
      { date: "2026-04-23", channel: "youtube", pageVisits: 10, newVisitors: 9, signups: 0, convRate: 0, msgs: 0, transfers: 0, swaps: 0, stakes: 0, market: 0, dna: 0, portfolio: 0, monitors: 0 },
      { date: "2026-04-23", channel: "Sahara AI", pageVisits: 9, newVisitors: 8, signups: 1, convRate: 12.5, msgs: 1, transfers: 0, swaps: 0, stakes: 0, market: 1, dna: 0, portfolio: 0, monitors: 0 },
      { date: "2026-04-23", channel: "twitter", pageVisits: 6, newVisitors: 3, signups: 0, convRate: 0, msgs: 0, transfers: 0, swaps: 0, stakes: 0, market: 0, dna: 0, portfolio: 0, monitors: 0 },
      { date: "2026-04-23", channel: "Internal (heysorin)", pageVisits: 1, newVisitors: 1, signups: 0, convRate: 0, msgs: 0, transfers: 0, swaps: 0, stakes: 0, market: 0, dna: 0, portfolio: 0, monitors: 0 }
    ],
    channelDetails: [
      { date: "2026-04-22", channel: "google", newVisitors: 1457, signups: 28, convRate: 1.92, msgs: 23, transfers: 0, swaps: 0, stakes: 0, market: 6, dna: 1, portfolio: 4, monitors: 0 },
      { date: "2026-04-22", channel: "Direct", newVisitors: 565, signups: 8, convRate: 1.42, msgs: 8, transfers: 0, swaps: 0, stakes: 0, market: 2, dna: 1, portfolio: 4, monitors: 3 },
      { date: "2026-04-22", channel: "Referrals (organic)", newVisitors: 59, signups: 51, convRate: 86.44, msgs: 39, transfers: 0, swaps: 0, stakes: 0, market: 6, dna: 5, portfolio: 4, monitors: 1 },
      { date: "2026-04-22", channel: "youtube", newVisitors: 86, signups: 0, convRate: 0, msgs: 0, transfers: 0, swaps: 0, stakes: 0, market: 0, dna: 0, portfolio: 0, monitors: 0 },
      { date: "2026-04-22", channel: "Sahara AI", newVisitors: 44, signups: 6, convRate: 13.64, msgs: 6, transfers: 0, swaps: 0, stakes: 0, market: 1, dna: 1, portfolio: 2, monitors: 1 },
      { date: "2026-04-22", channel: "x", newVisitors: 31, signups: 0, convRate: 0, msgs: 0, transfers: 0, swaps: 0, stakes: 0, market: 0, dna: 0, portfolio: 0, monitors: 0 },
      { date: "2026-04-22", channel: "twitter", newVisitors: 22, signups: 5, convRate: 22.73, msgs: 4, transfers: 0, swaps: 0, stakes: 0, market: 0, dna: 0, portfolio: 2, monitors: 1 },
      { date: "2026-04-22", channel: "hs_email", newVisitors: 12, signups: 2, convRate: 16.67, msgs: 2, transfers: 0, swaps: 0, stakes: 0, market: 1, dna: 1, portfolio: 1, monitors: 1 },
      { date: "2026-04-22", channel: "beta.heysorin.ai", newVisitors: 0, signups: 0, convRate: null, msgs: 0, transfers: 0, swaps: 0, stakes: 0, market: 0, dna: 0, portfolio: 0, monitors: 0 },
      { date: "2026-04-22", channel: "Internal (heysorin)", newVisitors: 4, signups: 0, convRate: 0, msgs: 0, transfers: 0, swaps: 0, stakes: 0, market: 0, dna: 0, portfolio: 0, monitors: 0 },
      { date: "2026-04-22", channel: "Other", newVisitors: 3, signups: 0, convRate: 0, msgs: 0, transfers: 0, swaps: 0, stakes: 0, market: 0, dna: 0, portfolio: 0, monitors: 0 },
      { date: "2026-04-22", channel: "telegram", newVisitors: 0, signups: 0, convRate: null, msgs: 0, transfers: 0, swaps: 0, stakes: 0, market: 0, dna: 0, portfolio: 0, monitors: 0 },
      { date: "2026-04-22", channel: "discord", newVisitors: 0, signups: 0, convRate: null, msgs: 0, transfers: 0, swaps: 0, stakes: 0, market: 0, dna: 0, portfolio: 0, monitors: 0 },
      { date: "2026-04-22", channel: "Referrals (paid)", newVisitors: 0, signups: 0, convRate: null, msgs: 0, transfers: 0, swaps: 0, stakes: 0, market: 0, dna: 0, portfolio: 0, monitors: 0 },
      { date: "2026-04-23", channel: "google", newVisitors: 393, signups: 0, convRate: 0, msgs: 0, transfers: 0, swaps: 0, stakes: 0, market: 0, dna: 0, portfolio: 0, monitors: 0 },
      { date: "2026-04-23", channel: "Direct", newVisitors: 282, signups: 0, convRate: 0, msgs: 0, transfers: 0, swaps: 0, stakes: 0, market: 0, dna: 0, portfolio: 0, monitors: 0 },
      { date: "2026-04-23", channel: "Referrals (organic)", newVisitors: 30, signups: 30, convRate: 100, msgs: 22, transfers: 0, swaps: 0, stakes: 0, market: 5, dna: 1, portfolio: 2, monitors: 0 },
      { date: "2026-04-23", channel: "youtube", newVisitors: 9, signups: 0, convRate: 0, msgs: 0, transfers: 0, swaps: 0, stakes: 0, market: 0, dna: 0, portfolio: 0, monitors: 0 },
      { date: "2026-04-23", channel: "Sahara AI", newVisitors: 8, signups: 1, convRate: 12.5, msgs: 1, transfers: 0, swaps: 0, stakes: 0, market: 1, dna: 0, portfolio: 0, monitors: 0 },
      { date: "2026-04-23", channel: "twitter", newVisitors: 3, signups: 0, convRate: 0, msgs: 0, transfers: 0, swaps: 0, stakes: 0, market: 0, dna: 0, portfolio: 0, monitors: 0 },
      { date: "2026-04-23", channel: "Internal (heysorin)", newVisitors: 1, signups: 0, convRate: 0, msgs: 0, transfers: 0, swaps: 0, stakes: 0, market: 0, dna: 0, portfolio: 0, monitors: 0 }
    ],
    cumulativeNewUsers: {
      period: "2026-04-16 through 2026-04-22",
      userView: 13613,
      newUsers: 7780,
      convRate: 57.15,
      msgs: 2693,
      transfers: 1,
      swaps: 2,
      stakes: 9,
      market: 247,
      dna: 144,
      portfolio: 1099,
      monitors: 338,
      subscribedUsers: 3
    },
    cumulativeActiveUsers: {
      period: "2026-04-16 through now",
      dau: 1377,
      msgs: 1272,
      transfers: 1,
      swaps: 2,
      stakes: 9,
      market: 255,
      dna: 145,
      portfolio: 1142,
      monitors: 341
    },
    utmCampaigns: [
      { source: "(direct)", medium: "(none)", campaign: "(none)", newVisitors: 7069, signups: 271, convRate: 3.83, sentMessages: 448, featureClickers: 598 },
      { source: "google", medium: "cpc", campaign: "sorin", newVisitors: 1724, signups: 43, convRate: 2.49, sentMessages: 31, featureClickers: 389 },
      { source: "google", medium: "cpc", campaign: "sorin-fi", newVisitors: 1097, signups: 33, convRate: 3.01, sentMessages: 27, featureClickers: 212 },
      { source: "google", medium: "cpc", campaign: "sorin-data-feeds", newVisitors: 893, signups: 6, convRate: 0.67, sentMessages: 6, featureClickers: 150 },
      { source: "Referrals (organic)", medium: "(referral)", campaign: "(referral)", newVisitors: 744, signups: 571, convRate: 76.75, sentMessages: 659, featureClickers: 274 },
      { source: "google", medium: "cpc", campaign: "sorin-custom-bot", newVisitors: 433, signups: 31, convRate: 7.16, sentMessages: 22, featureClickers: 77 },
      { source: "google", medium: "cpc", campaign: "sorin-video-network", newVisitors: 332, signups: 0, convRate: 0, sentMessages: 0, featureClickers: 6 },
      { source: "hs_email", medium: "email", campaign: "sorin-waitlist", newVisitors: 192, signups: 20, convRate: 10.42, sentMessages: 44, featureClickers: 52 },
      { source: "youtube", medium: "cpc", campaign: "sorin-video", newVisitors: 95, signups: 0, convRate: 0, sentMessages: 0, featureClickers: 2 },
      { source: "X", medium: "cpc", campaign: "sorin-video-network", newVisitors: 30, signups: 0, convRate: 0, sentMessages: 0, featureClickers: 0 },
      { source: "Referrals (paid)", medium: "(referral)", campaign: "(referral)", newVisitors: 29, signups: 24, convRate: 82.76, sentMessages: 25, featureClickers: 17 },
      { source: "google", medium: "cpc", campaign: "sorin-trading-101", newVisitors: 19, signups: 1, convRate: 5.26, sentMessages: 1, featureClickers: 3 },
      { source: "discord", medium: "(none)", campaign: "(none)", newVisitors: 16, signups: 3, convRate: 18.75, sentMessages: 5, featureClickers: 2 },
      { source: "google", medium: "cpc", campaign: "sorin-rebalancing", newVisitors: 12, signups: 0, convRate: 0, sentMessages: 0, featureClickers: 1 }
    ]
  },
  retention: {
    cohorts: [
      { date: "2026-04-16", signups: 67, day0: 77.6, day1: 9.0, day2: 13.4, day3: 9.0, day7: 1.5, day14: 0, day30: 0 },
      { date: "2026-04-17", signups: 400, day0: 91.0, day1: 6.2, day2: 4.2, day3: 4.5, day7: 0, day14: 0, day30: 0 },
      { date: "2026-04-18", signups: 93, day0: 81.7, day1: 10.8, day2: 8.6, day3: 8.6, day7: 0, day14: 0, day30: 0 },
      { date: "2026-04-19", signups: 143, day0: 92.3, day1: 1.4, day2: 2.1, day3: 0.7, day7: 0, day14: 0, day30: 0 },
      { date: "2026-04-20", signups: 94, day0: 79.8, day1: 2.1, day2: 3.2, day3: 0, day7: 0, day14: 0, day30: 0 },
      { date: "2026-04-21", signups: 99, day0: 81.8, day1: 5.1, day2: 1.0, day3: 0, day7: 0, day14: 0, day30: 0 },
      { date: "2026-04-22", signups: 103, day0: 86.4, day1: 2.9, day2: 0, day3: 0, day7: 0, day14: 0, day30: 0 },
      { date: "2026-04-23", signups: 63, day0: 81.0, day1: 0, day2: 0, day3: 0, day7: 0, day14: 0, day30: 0 }
    ],
    bounded: [
      { date: "2026-04-16", signups: 67, boundedD7: 22.4, boundedD14: 0, boundedD30: 0 },
      { date: "2026-04-17", signups: 400, boundedD7: 14.0, boundedD14: 0, boundedD30: 0 },
      { date: "2026-04-18", signups: 93, boundedD7: 19.4, boundedD14: 0, boundedD30: 0 },
      { date: "2026-04-19", signups: 143, boundedD7: 4.2, boundedD14: 0, boundedD30: 0 },
      { date: "2026-04-20", signups: 94, boundedD7: 5.3, boundedD14: 0, boundedD30: 0 },
      { date: "2026-04-21", signups: 99, boundedD7: 6.1, boundedD14: 0, boundedD30: 0 },
      { date: "2026-04-22", signups: 103, boundedD7: 2.9, boundedD14: 0, boundedD30: 0 },
      { date: "2026-04-23", signups: 63, boundedD7: 0, boundedD14: 0, boundedD30: 0 }
    ],
    stickiness: [
      { date: "2026-04-16", dau: 121, wau: 121, stickiness: 100.0 },
      { date: "2026-04-17", dau: 625, wau: 717, stickiness: 87.2 },
      { date: "2026-04-18", dau: 216, wau: 854, stickiness: 25.3 },
      { date: "2026-04-19", dau: 254, wau: 1014, stickiness: 25.0 },
      { date: "2026-04-20", dau: 219, wau: 1142, stickiness: 19.2 },
      { date: "2026-04-21", dau: 195, wau: 1245, stickiness: 15.7 },
      { date: "2026-04-22", dau: 213, wau: 1361, stickiness: 15.7 },
      { date: "2026-04-23", dau: 107, wau: 1342, stickiness: 8.0 }
    ]
  },
  engagement: {
    chatTotals: {
      usersSendingAtLeastOneMessage: 10580,
      chatEngagementRate: 98.79,
      totalChatSessions: 24213,
      totalUserMessages: 61181
    },
    latest: {
      date: "2026-04-23",
      dau: 107,
      wau: 1342,
      usersWhoSent: 96,
      sendRate: 89.7,
      messagesSent: 290,
      msgsPerSender: 3.0,
      msgsPerDau: 2.7
    },
    previousDay: {
      date: "2026-04-22",
      dau: 213,
      wau: 1361,
      usersWhoSent: 197,
      sendRate: 92.5,
      messagesSent: 598,
      msgsPerSender: 3.0,
      msgsPerDau: 2.8
    },
    messageDistribution: {
      date: "2026-04-22",
      labels: ["1-2", "3-5", "6-10", "11-20", "21-50", ">50"],
      values: [934, 2877, 1604, 89, 7, 0],
      total: 5511
    },
    sessionDepthDistribution: {
      date: "2026-04-22",
      labels: ["1-2", "3-5", "6-10", "11-20", "21-50", ">50"],
      values: [3311, 2571, 1705, 5, 1, 0],
      total: 7593
    },
    modeMix: {
      date: "2026-04-23",
      labels: ["Auto", "Fast", "Research"],
      values: [284, 3, 3],
      total: 290
    },
    featureReach: [
      { date: "2026-04-16", dau: 121, sendMessage: 81.0, portfolio: 44.6, monitor: 36.4, marketSignal: 29.8, personaQuiz: 10.7 },
      { date: "2026-04-17", dau: 625, sendMessage: 93.9, portfolio: 31.0, monitor: 25.4, marketSignal: 14.4, personaQuiz: 14.1 },
      { date: "2026-04-18", dau: 216, sendMessage: 91.7, portfolio: 32.4, monitor: 23.6, marketSignal: 18.1, personaQuiz: 7.4 },
      { date: "2026-04-19", dau: 254, sendMessage: 93.7, portfolio: 19.7, monitor: 15.7, marketSignal: 9.1, personaQuiz: 3.1 },
      { date: "2026-04-20", dau: 219, sendMessage: 92.7, portfolio: 20.1, monitor: 15.1, marketSignal: 15.1, personaQuiz: 2.7 },
      { date: "2026-04-21", dau: 195, sendMessage: 93.8, portfolio: 19.0, monitor: 13.3, marketSignal: 13.8, personaQuiz: 1.5 },
      { date: "2026-04-22", dau: 213, sendMessage: 92.5, portfolio: 16.4, monitor: 15.0, marketSignal: 14.1, personaQuiz: 4.7 },
      { date: "2026-04-23", dau: 107, sendMessage: 89.7, portfolio: 8.4, monitor: 6.5, marketSignal: 15.9, personaQuiz: 0.9 }
    ],
    messagesPerDau: [
      { date: "2026-04-16", dau: 121, messagesSent: 300, usersWhoSent: 98, msgsPerSender: 3.1, msgsPerDau: 2.5 },
      { date: "2026-04-17", dau: 625, messagesSent: 2972, usersWhoSent: 587, msgsPerSender: 5.1, msgsPerDau: 4.8 },
      { date: "2026-04-18", dau: 216, messagesSent: 757, usersWhoSent: 198, msgsPerSender: 3.8, msgsPerDau: 3.5 },
      { date: "2026-04-19", dau: 254, messagesSent: 657, usersWhoSent: 238, msgsPerSender: 2.8, msgsPerDau: 2.6 },
      { date: "2026-04-20", dau: 219, messagesSent: 602, usersWhoSent: 203, msgsPerSender: 3.0, msgsPerDau: 2.7 },
      { date: "2026-04-21", dau: 195, messagesSent: 534, usersWhoSent: 183, msgsPerSender: 2.9, msgsPerDau: 2.7 },
      { date: "2026-04-22", dau: 213, messagesSent: 598, usersWhoSent: 197, msgsPerSender: 3.0, msgsPerDau: 2.8 },
      { date: "2026-04-23", dau: 107, messagesSent: 290, usersWhoSent: 96, msgsPerSender: 3.0, msgsPerDau: 2.7 }
    ]
  }
};
