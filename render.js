const data = window.dashboardData;
const charts = {};
let currentRange = "7d";

/* ── Utilities ── */

function fmt(n) {
  return new Intl.NumberFormat("en-US").format(Number(n || 0));
}

function fmtPctV(pct, digits = 1) {
  if (pct === null || pct === undefined || Number.isNaN(Number(pct))) return "—";
  return `${Number(pct).toFixed(digits)}%`;
}

function ratio(a, b) {
  return b ? a / b : 0;
}

function deltaPct(cur, prev) {
  return prev ? ((cur - prev) / prev) * 100 : null;
}

function last(arr) {
  return arr[arr.length - 1];
}

function latestWithValue(arr, key, predicate = value => value !== null && value !== undefined) {
  return [...arr].reverse().find(item => predicate(item[key]));
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function makeChart(canvasId, config) {
  if (charts[canvasId]) charts[canvasId].destroy();
  charts[canvasId] = new Chart(document.getElementById(canvasId), config);
}

function setPill(id, value, positiveUp = true, suffix = "%", digits = 1) {
  const el = document.getElementById(id);
  if (!el) return;
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    el.className = "pill pill-neutral";
    el.textContent = "—";
    return;
  }
  const positive = positiveUp ? value >= 0 : value <= 0;
  el.className = `pill ${positive ? "pill-green" : "pill-red"}`;
  el.textContent = `${value >= 0 ? "▲" : "▼"} ${Math.abs(value).toFixed(digits)}${suffix}`;
}

function filterDaily(arr, range, key = "date") {
  if (!arr.length || range === "all") return arr.slice();
  const lastDate = new Date(last(arr)[key]);
  const days = range === "3d" ? 3 : range === "7d" ? 7 : 30;
  const start = new Date(lastDate);
  start.setDate(start.getDate() - days + 1);
  return arr.filter(item => new Date(item[key]) >= start);
}

function periodLabel(arr, key = "date") {
  if (!arr.length) return "";
  const first = arr[0][key];
  const final = last(arr)[key];
  return first === final ? first : `${first} ~ ${final}`;
}

function onTimeRangeChange(range) {
  currentRange = range;
  document.querySelectorAll(".time-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.range === range);
  });
  buildUpperFunnel();
  buildRetention();
  buildEngagement();
  buildAcquisitionQuality();
}

function toggleBotFilter() {
  const content = document.getElementById("botFilterContent");
  const arrow = document.getElementById("botFilterArrow");
  const open = content.classList.toggle("open");
  arrow.textContent = open ? "▼" : "▶";
}

function groupChannel(channel) {
  const value = channel.toLowerCase();
  if (value.includes("referral")) return "Referral";
  if (value === "google") return "Search / Paid";
  if (value === "direct") return "Direct";
  if (["youtube", "twitter", "x", "sahara ai", "discord", "telegram"].includes(value)) return "Social / Community";
  return "Owned / Internal";
}

/* ── Upper Funnel ── */

function buildUpperFunnel() {
  const rawClean = filterDaily(data.upperFunnel.rawVsCleanDaily, currentRange);
  const daily = filterDaily(data.upperFunnel.daily, currentRange);
  const active = filterDaily(data.upperFunnel.dailyActiveUsers, currentRange);
  const channelDetails = filterDaily(data.upperFunnel.channelDetails, currentRange);
  const todayRealtime = data.upperFunnel.todayRealtime;
  const bf = data.upperFunnel.botFilter;
  const fi = data.upperFunnel.filterImpact;
  const passRate = ratio(fi.clean, fi.totalRaw) * 100;

  setText("ufPeriod", periodLabel(rawClean));
  setText("bfTier1", bf.tier1);
  setText("bfTier2", bf.tier2);
  setText("bfConvRate", bf.convRateDefinition);
  setText("bfSource", bf.source);
  setText("bfRaw", fmt(fi.totalRaw));
  setText("bfTier1Removed", fmt(fi.removedTier1));
  setText("bfTier2Removed", fmt(fi.removedTier2));
  setText("bfClean", fmt(fi.clean));

  const headline = data.upperFunnel.headline;
  const yesterday = data.upperFunnel.daily[data.upperFunnel.daily.length - 2];
  const latestUpperFunnelAction = last(data.upperFunnel.daily);

  setText("ufTodayFloor", fmt(headline.todayCleanSignupsFloor));
  setText("ufTodayFloorSub", `Live floor; latest detailed row snapshot sums to ${fmt(latestUpperFunnelAction.cleanSignups)} clean signups`);
  setPill("ufTodayFloorDelta", deltaPct(headline.todayCleanSignupsFloor, headline.yesterdayCleanSignups));

  setText("ufTodayConv", fmtPctV(headline.todayFloorConvRate, 2));
  setText("ufTodayConvSub", `Live floor conv rate; latest detailed table snapshot is ${fmtPctV(latestUpperFunnelAction.convRate, 2)}`);
  setPill("ufTodayConvDelta", headline.todayFloorConvRate - headline.yesterdayCleanConvRate, true, "pp", 2);

  setText("ufYesterdayClean", fmt(headline.yesterdayCleanSignups));
  setText("ufYesterdayCleanSub", `${yesterday.date} clean signups`);
  setPill("ufYesterdayCleanDelta", deltaPct(headline.yesterdayCleanSignups, data.upperFunnel.daily[data.upperFunnel.daily.length - 3].cleanSignups));

  setText("ufYesterdayDau", fmt(headline.yesterdayCleanDau));
  setText("ufYesterdayDauSub", `${yesterday.date} clean DAU`);
  setPill("ufYesterdayDauDelta", deltaPct(headline.yesterdayCleanDau, data.upperFunnel.dailyActiveUsers[data.upperFunnel.dailyActiveUsers.length - 3].dau));

  setText("ufPassRate", fmtPctV(passRate, 1));
  setText("ufPassRateSub", `${fmt(fi.clean)} passed / ${fmt(fi.totalRaw)} raw`);
  setText("ufPassRateHint", `${fmt(fi.removedTier1)} Tier 1 removed · ${fmt(fi.removedTier2)} Tier 2 removed`);

  const latestActionReach = {
    msgs: ratio(latestUpperFunnelAction.msgs, latestUpperFunnelAction.dau) * 100,
    market: ratio(latestUpperFunnelAction.market, latestUpperFunnelAction.dau) * 100,
    portfolio: ratio(latestUpperFunnelAction.portfolio, latestUpperFunnelAction.dau) * 100,
    monitors: ratio(latestUpperFunnelAction.monitors, latestUpperFunnelAction.dau) * 100
  };
  setText("ufActionMessages", fmt(latestUpperFunnelAction.msgs));
  setText("ufActionMessagesSub", `${fmtPctV(latestActionReach.msgs, 1)} of upper-funnel DAU on ${latestUpperFunnelAction.date}`);
  setText("ufActionMarket", fmt(latestUpperFunnelAction.market));
  setText("ufActionMarketSub", `${fmtPctV(latestActionReach.market, 1)} of upper-funnel DAU`);
  setText("ufActionPortfolio", fmt(latestUpperFunnelAction.portfolio));
  setText("ufActionPortfolioSub", `${fmtPctV(latestActionReach.portfolio, 1)} of upper-funnel DAU`);
  setText("ufActionMonitors", fmt(latestUpperFunnelAction.monitors));
  setText("ufActionMonitorsSub", `${fmtPctV(latestActionReach.monitors, 1)} of upper-funnel DAU`);

  makeChart("dailySignupsChart", {
    type: "line",
    data: {
      labels: rawClean.map(item => item.date.slice(5)),
      datasets: [
        {
          label: "Raw signups",
          data: rawClean.map(item => item.rawSignups),
          borderColor: "#EF4444",
          backgroundColor: "rgba(239,68,68,0.06)",
          borderDash: [6, 4],
          pointRadius: 3,
          tension: 0.28
        },
        {
          label: "Clean signups",
          data: rawClean.map(item => item.cleanSignups),
          borderColor: "#2F5496",
          backgroundColor: "rgba(47,84,150,0.12)",
          fill: true,
          pointRadius: 4,
          tension: 0.28
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 10 } }
      },
      scales: {
        x: { grid: { display: false } },
        y: { beginAtZero: true }
      }
    }
  });

  const groupedByDate = {};
  channelDetails.forEach(row => {
    if (!groupedByDate[row.date]) {
      groupedByDate[row.date] = {
        date: row.date,
        "Referral": 0,
        "Search / Paid": 0,
        "Direct": 0,
        "Social / Community": 0,
        "Owned / Internal": 0
      };
    }
    groupedByDate[row.date][groupChannel(row.channel)] += row.signups;
  });
  const channelSeries = Object.values(groupedByDate).sort((a, b) => a.date.localeCompare(b.date));
  const channelGroups = ["Referral", "Search / Paid", "Direct", "Social / Community", "Owned / Internal"];
  const channelColors = ["#10B981", "#3559A1", "#F59E0B", "#7C3AED", "#94A3B8"];

  makeChart("channelChart", {
    type: "bar",
    data: {
      labels: channelSeries.map(item => item.date.slice(5)),
      datasets: channelGroups.map((group, index) => ({
        label: group,
        data: channelSeries.map(item => item[group]),
        backgroundColor: channelColors[index],
        stack: "signups"
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 10 } }
      },
      scales: {
        x: { stacked: true, grid: { display: false } },
        y: { stacked: true, beginAtZero: true }
      }
    }
  });

  const normalizeChannel = (ch) => {
    const lower = ch.toLowerCase();
    if (lower === "x") return "twitter";
    return ch;
  };
  const channelAgg = {};
  channelDetails.forEach(row => {
    const key = normalizeChannel(row.channel);
    if (!channelAgg[key]) {
      channelAgg[key] = {
        channel: key,
        newVisitors: 0,
        signups: 0,
        msgs: 0,
        transfers: 0,
        swaps: 0,
        stakes: 0,
        market: 0,
        dna: 0,
        portfolio: 0,
        monitors: 0
      };
    }
    channelAgg[key].newVisitors += row.newVisitors;
    channelAgg[key].signups += row.signups;
    channelAgg[key].msgs += row.msgs;
    channelAgg[key].transfers += row.transfers;
    channelAgg[key].swaps += row.swaps;
    channelAgg[key].stakes += row.stakes;
    channelAgg[key].market += row.market;
    channelAgg[key].dna += row.dna;
    channelAgg[key].portfolio += row.portfolio;
    channelAgg[key].monitors += row.monitors;
  });
  const topChannel = Object.values(channelAgg).sort((a, b) => b.signups - a.signups)[0];
  if (topChannel) {
    const topChannelShare = ratio(topChannel.signups, Object.values(channelAgg).reduce((sum, row) => sum + row.signups, 0)) * 100;
    setText("channelInsight", `${topChannel.channel} generated the most clean signups in the visible channel detail rows, contributing ${fmt(topChannel.signups)} signups (${fmtPctV(topChannelShare, 1)} share).`);
  }

  const realtimeBody = document.querySelector("#todayRealtimeTable tbody");
  realtimeBody.innerHTML = todayRealtime.map(row => `
    <tr>
      <td>${row.date.slice(5)}</td>
      <td><strong>${row.channel}</strong></td>
      <td class="num">${fmt(row.pageVisits)}</td>
      <td class="num">${fmt(row.newVisitors)}</td>
      <td class="num">${fmt(row.signups)}</td>
      <td class="num">${fmtPctV(row.convRate, 1)}</td>
      <td class="num">${fmt(row.msgs)}</td>
      <td class="num">${fmt(row.market)}</td>
      <td class="num">${fmt(row.dna)}</td>
      <td class="num">${fmt(row.portfolio)}</td>
      <td class="num">${fmt(row.monitors)}</td>
    </tr>
  `).join("");

  const behaviorBody = document.querySelector("#channelBehaviorTable tbody");
  behaviorBody.innerHTML = Object.values(channelAgg)
    .sort((a, b) => b.signups - a.signups)
    .map(row => `
      <tr>
        <td><strong>${row.channel}</strong></td>
        <td class="num">${fmt(row.newVisitors)}</td>
        <td class="num">${fmt(row.signups)}</td>
        <td class="num">${fmtPctV(ratio(row.signups, row.newVisitors) * 100, 1)}</td>
        <td class="num">${fmt(row.msgs)}</td>
        <td class="num">${fmt(row.market)}</td>
        <td class="num">${fmt(row.dna)}</td>
        <td class="num">${fmt(row.portfolio)}</td>
        <td class="num">${fmt(row.monitors)}</td>
      </tr>
    `).join("");

  const dailyBody = document.querySelector("#dailyNewUsersTable tbody");
  dailyBody.innerHTML = daily.map(row => `
    <tr>
      <td>${row.date.slice(5)}</td>
      <td class="num">${fmt(row.newVisitors)}</td>
      <td class="num">${fmt(row.cleanSignups)}</td>
      <td class="num">${fmtPctV(row.convRate, 2)}</td>
      <td class="num">${fmt(row.rawSignups)}</td>
      <td class="num">${fmt(row.msgs)}</td>
      <td class="num">${fmt(row.market)}</td>
      <td class="num">${fmt(row.dna)}</td>
      <td class="num">${fmt(row.portfolio)}</td>
      <td class="num">${fmt(row.monitors)}</td>
    </tr>
  `).join("");

  const activeBody = document.querySelector("#dailyActiveUsersTable tbody");
  activeBody.innerHTML = active.map(row => `
    <tr>
      <td>${row.date.slice(5)}</td>
      <td class="num">${fmt(row.dau)}</td>
      <td class="num">${fmt(row.msgs)}</td>
      <td class="num">${fmt(row.transfers)}</td>
      <td class="num">${fmt(row.swaps)}</td>
      <td class="num">${fmt(row.stakes)}</td>
      <td class="num">${fmt(row.market)}</td>
      <td class="num">${fmt(row.dna)}</td>
      <td class="num">${fmt(row.portfolio)}</td>
      <td class="num">${fmt(row.monitors)}</td>
    </tr>
  `).join("");
}

/* ── Retention ── */

function buildRetention() {
  const cohorts = filterDaily(data.retention.cohorts, currentRange);
  const bounded = filterDaily(data.retention.bounded, currentRange);
  const stickiness = filterDaily(data.retention.stickiness, currentRange);
  const latestCohort = last(data.retention.cohorts);
  const latestDay1 = latestWithValue(data.retention.cohorts, "day1", value => value > 0);
  const latestDay7 = latestWithValue(data.retention.cohorts, "day7", value => value > 0);
  const latestStickiness = last(data.retention.stickiness);

  setText("retPeriod", periodLabel(cohorts));

  // ── Classic Retention KPIs ──
  setText("classicD0", fmtPctV(latestCohort.day0, 1));
  setText("classicD0Sub", `${latestCohort.date} cohort · ${fmt(latestCohort.signups)} signups`);

  const d1Value = latestDay1 ? latestDay1.day1 : 0;
  setText("classicD1", fmtPctV(d1Value, 1));
  const d1El = document.getElementById("classicD1Status");
  if (d1El) {
    if (d1Value >= 35) d1El.className = "pill pill-green", d1El.textContent = "▲ Healthy";
    else if (d1Value >= 25) d1El.className = "pill pill-neutral", d1El.textContent = "─ Below benchmark";
    else d1El.className = "pill pill-red", d1El.textContent = "▼ Value not clear";
  }

  setText("classicD7", fmtPctV(latestDay7 ? latestDay7.day7 : 0, 1));
  setText("classicD30", fmtPctV(latestCohort.day30, 1));
  setText("classicD90", "—");
  // D90 not available yet (product < 90 days old)

  // Classic cohort table
  const classicBody = document.querySelector("#classicCohortTable tbody");
  classicBody.innerHTML = cohorts.map(row => `
    <tr>
      <td>${row.date}</td>
      <td class="num">${fmt(row.signups)}</td>
      <td class="num">${fmtPctV(row.day0, 1)}</td>
      <td class="num">${fmtPctV(row.day1, 1)}</td>
      <td class="num">${fmtPctV(row.day2, 1)}</td>
      <td class="num">${fmtPctV(row.day3, 1)}</td>
      <td class="num">${fmtPctV(row.day7, 1)}</td>
      <td class="num">${fmtPctV(row.day14, 1)}</td>
      <td class="num">${fmtPctV(row.day30, 1)}</td>
    </tr>
  `).join("");

  // ── Bounded Retention KPIs ──
  const latestBounded = last(data.retention.bounded);
  const latestBoundedD7 = latestWithValue(data.retention.bounded, "boundedD7", value => value > 0);

  setText("boundedD7", fmtPctV(latestBoundedD7 ? latestBoundedD7.boundedD7 : 0, 1));
  setText("boundedD7Sub", latestBoundedD7 ? `${latestBoundedD7.date} latest non-zero` : "No non-zero D7 yet");
  const bD7El = document.getElementById("boundedD7Status");
  if (bD7El && latestBoundedD7) {
    const v = latestBoundedD7.boundedD7;
    if (v >= 30) bD7El.className = "pill pill-green", bD7El.textContent = "▲ Healthy";
    else if (v >= 15) bD7El.className = "pill pill-neutral", bD7El.textContent = "─ Below benchmark";
    else bD7El.className = "pill pill-red", bD7El.textContent = "▼ Weak";
  }

  setText("boundedD14", fmtPctV(latestBounded.boundedD14, 1));
  setText("boundedD14Sub", "Active at least once during Day 8–14");
  setText("boundedD30", fmtPctV(latestBounded.boundedD30, 1));
  setText("boundedD30Sub", "Active at least once during Day 24–30");

  // Bounded cohort table
  const boundedBody = document.querySelector("#boundedCohortTable tbody");
  boundedBody.innerHTML = bounded.map(row => `
    <tr>
      <td>${row.date}</td>
      <td class="num">${fmt(row.signups)}</td>
      <td class="num">${fmtPctV(row.boundedD7, 1)}</td>
      <td class="num">${fmtPctV(row.boundedD14, 1)}</td>
      <td class="num">${fmtPctV(row.boundedD30, 1)}</td>
    </tr>
  `).join("");

  // ── Stickiness chart ──
  makeChart("stickinessChart", {
    type: "bar",
    data: {
      labels: stickiness.map(row => row.date.slice(5)),
      datasets: [
        {
          type: "bar",
          label: "DAU",
          data: stickiness.map(row => row.dau),
          backgroundColor: "rgba(47,84,150,0.18)",
          borderColor: "#2F5496",
          borderWidth: 1,
          yAxisID: "y"
        },
        {
          type: "line",
          label: "Stickiness",
          data: stickiness.map(row => row.stickiness),
          borderColor: "#10B981",
          backgroundColor: "rgba(16,185,129,0.10)",
          pointRadius: 4,
          tension: 0.25,
          yAxisID: "y1"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 10 } }
      },
      scales: {
        x: { grid: { display: false } },
        y: { beginAtZero: true, title: { display: true, text: "DAU" } },
        y1: {
          beginAtZero: true,
          position: "right",
          grid: { drawOnChartArea: false },
          ticks: { callback: value => `${value}%` },
          title: { display: true, text: "Stickiness %" }
        }
      }
    }
  });

  // Summary table
  setText("retStickiness", fmtPctV(latestStickiness.stickiness, 1));
  setText("retWau", fmt(latestStickiness.wau));
  setText("retClassicD1Note", latestDay1 ? `${fmtPctV(latestDay1.day1, 1)} (${latestDay1.date} cohort)` : "—");

  setText("retentionInsight", `Same-day usage is strong (D0: ${fmtPctV(latestCohort.day0, 1)}), but next-day return is weak (Classic D1: ${fmtPctV(d1Value, 1)}). Stickiness has dropped from 87% to ${fmtPctV(latestStickiness.stickiness, 1)}. The product needs a hook that pulls users back on Day 1.`);
}

/* ── Engagement ── */

function buildEngagement() {
  const latest = data.engagement.latest;
  const previous = data.engagement.previousDay;
  const messageTrend = filterDaily(data.engagement.messagesPerDau, currentRange);
  const featureReach = filterDaily(data.engagement.featureReach, currentRange);

  setText("engPeriod", periodLabel(messageTrend));
  setText("engLatestDau", fmt(latest.dau));
  setText("engLatestDauSub", `${latest.date} clean DAU snapshot`);
  setPill("engLatestDauDelta", deltaPct(latest.dau, previous.dau));

  setText("engWau", fmt(latest.wau));
  setText("engWauSub", "Trailing 7D clean WAU");
  setPill("engWauDelta", deltaPct(latest.wau, previous.wau));

  setText("engSendRate", fmtPctV(latest.sendRate, 1));
  setText("engSendRateSub", `${fmt(latest.usersWhoSent)} senders / ${fmt(latest.dau)} DAU`);
  setPill("engSendRateDelta", latest.sendRate - previous.sendRate, true, "pp", 1);

  setText("engMsgsPerSender", latest.msgsPerSender.toFixed(1));
  setText("engMsgsPerSenderSub", `${fmt(latest.messagesSent)} messages sent`);
  setPill("engMsgsPerSenderDelta", deltaPct(latest.msgsPerSender, previous.msgsPerSender));

  setText("engMsgsPerDau", latest.msgsPerDau.toFixed(1));
  setText("engMsgsPerDauSub", "Message depth across all DAU");
  setPill("engMsgsPerDauDelta", deltaPct(latest.msgsPerDau, previous.msgsPerDau));

  const totals = data.engagement.chatTotals;
  setText("engOverview", `${fmt(totals.usersSendingAtLeastOneMessage)} users sent >=1 message · ${fmtPctV(totals.chatEngagementRate, 2)} engagement rate · ${fmt(totals.totalChatSessions)} chat sessions · ${fmt(totals.totalUserMessages)} user messages`);

  makeChart("messagesPerDauChart", {
    type: "line",
    data: {
      labels: messageTrend.map(row => row.date.slice(5)),
      datasets: [
        {
          label: "Msgs / DAU",
          data: messageTrend.map(row => row.msgsPerDau),
          borderColor: "#2F5496",
          backgroundColor: "rgba(47,84,150,0.10)",
          pointRadius: 4,
          tension: 0.25
        },
        {
          label: "Msgs / Sender",
          data: messageTrend.map(row => row.msgsPerSender),
          borderColor: "#10B981",
          backgroundColor: "rgba(16,185,129,0.10)",
          pointRadius: 4,
          tension: 0.25
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 10 } }
      },
      scales: {
        x: { grid: { display: false } },
        y: { beginAtZero: true }
      }
    }
  });

  makeChart("featureReachChart", {
    type: "line",
    data: {
      labels: featureReach.map(row => row.date.slice(5)),
      datasets: [
        { label: "Send message", data: featureReach.map(row => row.sendMessage), borderColor: "#2F5496", pointRadius: 3, tension: 0.25 },
        { label: "Portfolio", data: featureReach.map(row => row.portfolio), borderColor: "#10B981", pointRadius: 3, tension: 0.25 },
        { label: "Monitor", data: featureReach.map(row => row.monitor), borderColor: "#F59E0B", pointRadius: 3, tension: 0.25 },
        { label: "Market signal", data: featureReach.map(row => row.marketSignal), borderColor: "#7C3AED", pointRadius: 3, tension: 0.25 },
        { label: "Persona quiz", data: featureReach.map(row => row.personaQuiz), borderColor: "#EC4899", pointRadius: 3, tension: 0.25 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 10 } },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.dataset.label}: ${ctx.raw.toFixed(1)}%`
          }
        }
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          beginAtZero: true,
          ticks: { callback: value => `${value}%` }
        }
      }
    }
  });

  const distribution = data.engagement.messageDistribution;
  makeChart("userMsgDistChart", {
    type: "bar",
    data: {
      labels: distribution.labels,
      datasets: [{
        label: distribution.date,
        data: distribution.values,
        backgroundColor: ["#3559A1", "#6D28D9", "#2A9D8F", "#DB2777", "#EF4444", "#8B5A2B"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { x: { grid: { display: false } }, y: { beginAtZero: true } }
    }
  });

  const sessionDepth = data.engagement.sessionDepthDistribution;
  makeChart("sessionDepthChart", {
    type: "bar",
    data: {
      labels: sessionDepth.labels,
      datasets: [{
        label: sessionDepth.date,
        data: sessionDepth.values,
        backgroundColor: ["#3559A1", "#6D28D9", "#2A9D8F", "#DB2777", "#EF4444", "#8B5A2B"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { x: { grid: { display: false } }, y: { beginAtZero: true } }
    }
  });

  const modeMix = data.engagement.modeMix;
  makeChart("modeMixChart", {
    type: "doughnut",
    data: {
      labels: modeMix.labels,
      datasets: [{
        data: modeMix.values,
        backgroundColor: ["#3559A1", "#F59E0B", "#10B981"],
        borderColor: "#FFFFFF",
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "66%",
      plugins: {
        legend: { position: "bottom" },
        tooltip: {
          callbacks: {
            label: ctx => {
              const pct = ratio(ctx.raw, modeMix.total) * 100;
              return `${ctx.label}: ${fmt(ctx.raw)} (${fmtPctV(pct, 1)})`;
            }
          }
        }
      }
    }
  });

  setText("engDistributionNote", `${distribution.date} user-message distribution totals ${fmt(distribution.total)} user buckets; session-depth distribution totals ${fmt(sessionDepth.total)} sessions.`);
}

/* ── Acquisition Quality ── */

function buildAcquisitionQuality() {
  const fi = data.upperFunnel.filterImpact;
  const rawClean = filterDaily(data.upperFunnel.rawVsCleanDaily, currentRange);
  const cumulativeNew = data.upperFunnel.cumulativeNewUsers;
  const cumulativeActive = data.upperFunnel.cumulativeActiveUsers;
  const passRate = ratio(fi.clean, fi.totalRaw) * 100;
  const portfolioReach = ratio(cumulativeActive.portfolio, cumulativeActive.dau) * 100;

  setText("aqPeriod", `Cumulative view since ${data.meta.dataStartDate}`);
  setText("aqRaw", fmt(fi.totalRaw));
  setText("aqRawSub", "Raw signups observed");
  setText("aqClean", fmt(fi.clean));
  setText("aqCleanSub", `${fmtPctV(passRate, 1)} clean pass rate`);
  setText("aqActive", fmt(cumulativeActive.dau));
  setText("aqActiveSub", "Cumulative clean active users");
  setText("aqPortfolioReach", fmtPctV(portfolioReach, 1));
  setText("aqPortfolioReachSub", `${fmt(cumulativeActive.portfolio)} portfolio opens / ${fmt(cumulativeActive.dau)} clean active users`);

  const dailyFilterBody = document.querySelector("#dailyFilterTable tbody");
  dailyFilterBody.innerHTML = rawClean.map(row => {
    const removed = row.rawSignups - row.cleanSignups;
    const pass = ratio(row.cleanSignups, row.rawSignups) * 100;
    return `
      <tr>
        <td>${row.date}</td>
        <td class="num">${fmt(row.rawSignups)}</td>
        <td class="num">${fmt(row.cleanSignups)}</td>
        <td class="num">${fmt(removed)}</td>
        <td class="num">${fmtPctV(pass, 1)}</td>
      </tr>
    `;
  }).join("");

  const newCumulativeBody = document.querySelector("#newUserCumulativeTable tbody");
  newCumulativeBody.innerHTML = `
    <tr>
      <td>${cumulativeNew.period}</td>
      <td class="num">${fmt(cumulativeNew.userView)}</td>
      <td class="num">${fmt(cumulativeNew.newUsers)}</td>
      <td class="num">${fmtPctV(cumulativeNew.convRate, 2)}</td>
      <td class="num">${fmt(cumulativeNew.msgs)}</td>
      <td class="num">${fmt(cumulativeNew.market)}</td>
      <td class="num">${fmt(cumulativeNew.dna)}</td>
      <td class="num">${fmt(cumulativeNew.portfolio)}</td>
      <td class="num">${fmt(cumulativeNew.monitors)}</td>
      <td class="num">${fmt(cumulativeNew.subscribedUsers)}</td>
    </tr>
  `;

  const activeCumulativeBody = document.querySelector("#activeCumulativeTable tbody");
  activeCumulativeBody.innerHTML = `
    <tr>
      <td>${cumulativeActive.period}</td>
      <td class="num">${fmt(cumulativeActive.dau)}</td>
      <td class="num">${fmt(cumulativeActive.msgs)}</td>
      <td class="num">${fmt(cumulativeActive.transfers)}</td>
      <td class="num">${fmt(cumulativeActive.swaps)}</td>
      <td class="num">${fmt(cumulativeActive.stakes)}</td>
      <td class="num">${fmt(cumulativeActive.market)}</td>
      <td class="num">${fmt(cumulativeActive.dna)}</td>
      <td class="num">${fmt(cumulativeActive.portfolio)}</td>
      <td class="num">${fmt(cumulativeActive.monitors)}</td>
    </tr>
  `;

  const utmBody = document.querySelector("#utmCampaignTable tbody");
  utmBody.innerHTML = data.upperFunnel.utmCampaigns.map(row => `
    <tr>
      <td>${row.source}</td>
      <td>${row.medium}</td>
      <td><strong>${row.campaign}</strong></td>
      <td class="num">${fmt(row.newVisitors)}</td>
      <td class="num">${fmt(row.signups)}</td>
      <td class="num">${fmtPctV(row.convRate, 2)}</td>
      <td class="num">${fmt(row.sentMessages)}</td>
      <td class="num">${fmt(row.featureClickers)}</td>
    </tr>
  `).join("");

  const topCampaign = [...data.upperFunnel.utmCampaigns].sort((a, b) => b.signups - a.signups)[0];
  setText("aqInsight", `${topCampaign.source} / ${topCampaign.campaign} is the top visible campaign row by clean signups with ${fmt(topCampaign.signups)} signups from ${fmt(topCampaign.newVisitors)} new visitors.`);
}

/* ── Init ── */

function init() {
  setText("dashboardTitle", data.meta.title);
  setText("versionBadge", `● ${data.meta.version} · 0423 refresh`);
  setText("lastUpdated", `Updated ${data.meta.lastUpdated}`);
  setText("snapshotNote", data.meta.snapshotNote);
  buildUpperFunnel();
  buildRetention();
  buildEngagement();
  buildAcquisitionQuality();
}

document.addEventListener("DOMContentLoaded", init);
