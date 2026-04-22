const data = window.dashboardData;

function fmtNumber(n) {
  return new Intl.NumberFormat("en-US").format(n);
}
function fmtPctFromRatio(ratio, digits = 1) {
  return `${(ratio * 100).toFixed(digits)}%`;
}
function fmtPctValue(pct, digits = 1) {
  if (isNaN(pct)) return "0%";
  return `${pct.toFixed(digits)}%`;
}
function fmtMoney(n, digits = 0) {
  return `$${Number(n).toFixed(digits)}`;
}
function ratio(a, b) {
  if (!b) return 0;
  return a / b;
}
function deltaPct(current, previous) {
  if (!previous) return null;
  return ((current - previous) / previous) * 100;
}
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}
function setPill(el, value, positiveWhenHigher = true, suffix = "%", digits = 1) {
  if (!el) return;
  if (value === null || value === undefined || Number.isNaN(value)) {
    el.className = "pill gray";
    el.textContent = "No comparison";
    return;
  }
  const positive = positiveWhenHigher ? value >= 0 : value <= 0;
  el.className = `pill ${positive ? "green" : "red"}`;
  const arrow = value >= 0 ? "▲" : "▼";
  const abs = Math.abs(value).toFixed(digits);
  el.textContent = `${arrow} ${abs}${suffix}`;
}

function buildUpperFunnel() {
  const current = data.upperFunnel.currentWeek;
  const prev = data.upperFunnel.previousComparable;
  const cumulative = data.upperFunnel.cumulative;
  const newSignups = current.signups;
  const signupsDelta = deltaPct(current.signups, prev.signups);
  const registerRate = ratio(cumulative.totalRegisteredUsers, cumulative.totalUserViews);

  setText("overviewNewSignups", fmtNumber(newSignups));
  setText(
    "overviewNewSignupsDelta",
    `vs last comparable window: ${signupsDelta >= 0 ? "▲" : "▼"} ${Math.abs(signupsDelta).toFixed(1)}%`
  );
  setText("overviewRegisterRate", fmtPctFromRatio(registerRate, 2));

  const maxVal = Math.max(current.userViews, current.signups, cumulative.totalRegisteredUsers);
  const rows = [
    { label: "User views", value: current.userViews, cls: "funnel-views" },
    { label: "Signups", value: current.signups, cls: "funnel-signups" },
    { label: "Registered", value: cumulative.totalRegisteredUsers, cls: "funnel-registered" }
  ];

  const wrap = document.getElementById("acquisitionFunnel");
  wrap.innerHTML = rows.map(r => {
    const width = `${Math.max((r.value / maxVal) * 100, 8)}%`;
    return `
      <div class="funnel-row">
        <div class="funnel-label">${r.label}</div>
        <div class="funnel-bar-bg">
          <div class="funnel-bar-fill ${r.cls}" style="width:${width}">${fmtNumber(r.value)}</div>
        </div>
        <div class="funnel-val">${fmtNumber(r.value)}</div>
      </div>
    `;
  }).join("");

  const referral = data.upperFunnel.currentWeekRawChannels.find(x => x.channel === "Referrals (organic)");
  const share = ratio(referral.signups, current.signups) * 100;
  setText("acquisitionInsight",
    `Referrals (organic) drives ${share.toFixed(1)}% of current-week signups with ${referral.cvr.toFixed(1)}% conversion.`
  );
  setText("channelInsight",
    `Current mix: Referral ${(ratio(1164, 1267)*100).toFixed(1)}%, Content/SEO measurable, Paid Social inactive.`
  );

  new Chart(document.getElementById("signupsByChannelChart"), {
    type: "bar",
    data: {
      labels: data.upperFunnel.groupedChannelTrend.map(d => d.label),
      datasets: [
        { label: "Organic", data: data.upperFunnel.groupedChannelTrend.map(d => d.Organic), backgroundColor: "#3559a1", stack: "signups" },
        { label: "Paid Social", data: data.upperFunnel.groupedChannelTrend.map(d => d.PaidSocial), backgroundColor: "#4d77c3", stack: "signups" },
        { label: "Referral", data: data.upperFunnel.groupedChannelTrend.map(d => d.Referral), backgroundColor: "#1fb980", stack: "signups" },
        { label: "Content/SEO", data: data.upperFunnel.groupedChannelTrend.map(d => d.ContentSEO), backgroundColor: "#87b0e3", stack: "signups" },
        { label: "Other", data: data.upperFunnel.groupedChannelTrend.map(d => d.Other), backgroundColor: "#c7d0dd", stack: "signups" }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 10 } } },
      scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, beginAtZero: true } }
    }
  });
}

function buildRetention() {
  setText("retentionD1", fmtPctValue(data.retention.d1 * 100, 0));
  setText("retentionD7", fmtPctValue(data.retention.d7 * 100, 1));
  setText("retentionD30", fmtPctValue(data.retention.d30 * 100, 0));

  const d1Delta = (data.retention.d1 - data.retention.previousD1) * 100;
  setPill(document.getElementById("retentionD1Delta"), d1Delta, true, "pp", 1);

  const currRate = 5.65;
  const nurrRate = 4.55;
  setText("ret-health", `${currRate.toFixed(2)}% / ${nurrRate.toFixed(2)}%`);
  setText("curr", `${currRate.toFixed(2)}%`);
  setText("nurr", `${nurrRate.toFixed(2)}%`);
  setText("current-users", "74");
  setText("new-users", fmtNumber(data.engagement.dauTrend[data.engagement.dauTrend.length-1].newUsers));

  new Chart(document.getElementById("retentionChart"), {
    type: "bar",
    data: {
      labels: ["D1", "D7", "D30"],
      datasets: [{
        label: "Retention",
        data: [data.retention.d1*100, data.retention.d7*100, data.retention.d30*100],
        backgroundColor: ["#1fb980", "#f59e0b", "#ef4444"]
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
      scales: { x: { grid: { display: false } }, y: { beginAtZero: true, max: 100 } }
    }
  });
}

function buildEngagement() {
  const cur = data.engagement.current;
  const prev = data.engagement.previousDay;
  const stickinessCur = ratio(cur.dau, cur.mau);
  const stickinessPrev = ratio(prev.dau, prev.mau);
  const mpsCur = ratio(cur.userMessagesSent, cur.chatSessionsCreated);
  const mpsPrev = ratio(prev.userMessagesSent, prev.chatSessionsCreated);
  const mpuCur = ratio(cur.userMessagesSent, cur.usersSendingAtLeastOneMessage);
  const mpuPrev = ratio(prev.userMessagesSent, prev.usersSendingAtLeastOneMessage);

  setText("engagementDAU", fmtNumber(cur.dau));
  setText("engagementDAUSub", `WAU: ${fmtNumber(cur.wau)} · MAU: ${fmtNumber(cur.mau)}`);
  setPill(document.getElementById("engagementDAUDelta"), deltaPct(cur.dau, prev.dau), true, "%", 1);

  setText("engagementStickiness", fmtPctFromRatio(stickinessCur, 1));
  setPill(document.getElementById("engagementStickinessDelta"), (stickinessCur - stickinessPrev)*100, true, "pp", 1);

  setText("engagementMsgsPerSession", mpsCur.toFixed(2));
  setPill(document.getElementById("engagementMsgsPerSessionDelta"), deltaPct(mpsCur, mpsPrev), true, "%", 1);

  setText("engagementMsgsPerUser", mpuCur.toFixed(2));
  setPill(document.getElementById("engagementMsgsPerUserDelta"), deltaPct(mpuCur, mpuPrev), true, "%", 1);

  new Chart(document.getElementById("dauTrendChart"), {
    type: "line",
    data: {
      labels: data.engagement.dauTrend.map(d => d.date.slice(5)),
      datasets: [
        { label: "Returning DAU", data: data.engagement.dauTrend.map(d => d.returningUsers), borderColor: "#3559a1", backgroundColor: "rgba(53,89,161,0.08)", pointRadius: 4, tension: 0.25 },
        { label: "New DAU", data: data.engagement.dauTrend.map(d => d.newUsers), borderColor: "#1fb980", backgroundColor: "rgba(31,185,128,0.08)", pointRadius: 4, tension: 0.25 }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom" } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true } } }
  });

  new Chart(document.getElementById("userMsgDistChart"), {
    type: "bar",
    data: {
      labels: data.engagement.userMessageDistribution.labels,
      datasets: [{ data: data.engagement.userMessageDistribution.values, backgroundColor: ["#4d77c3","#6d28d9","#2a9d8f","#db2777","#ef4444","#8b5a2b"] }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true } } }
  });

  new Chart(document.getElementById("sessionDepthChart"), {
    type: "bar",
    data: {
      labels: data.engagement.sessionDepthDistribution.labels,
      datasets: [{ data: data.engagement.sessionDepthDistribution.values, backgroundColor: ["#4d77c3","#6d28d9","#2a9d8f","#db2777","#ef4444","#8b5a2b"] }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true } } }
  });

  new Chart(document.getElementById("modeMixChart"), {
    type: "doughnut",
    data: {
      labels: data.engagement.modeMix.labels,
      datasets: [{ data: data.engagement.modeMix.values, backgroundColor: ["#3559a1","#f59e0b","#1fb980"], borderColor: "#fff", borderWidth: 2 }]
    },
    options: { responsive: true, maintainAspectRatio: false, cutout: "68%", plugins: { legend: { position: "bottom" } } }
  });

  const featurePct = data.engagement.featureAdoption.dailyUsers.map(v => ratio(v, data.engagement.featureAdoption.denominatorWAU) * 100);
  new Chart(document.getElementById("featureAdoptionChart"), {
    type: "bar",
    data: {
      labels: data.engagement.featureAdoption.labels,
      datasets: [{ data: featurePct, backgroundColor: ["#3559a1","#4d77c3","#87b0e3","#1fb980","#f59e0b","#f97316"] }]
    },
    options: { indexAxis: "y", responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.raw.toFixed(2)}%` } } }, scales: { x: { beginAtZero: true, max: 100, ticks: { callback: v => `${v}%` } }, y: { grid: { display: false } } } }
  });
}

function buildMonetization() {
  const m = data.monetization;
  const freeToPaidProxy = ratio(m.msu, m.mau);
  const monthlyArpu = ratio(m.monthlyRevenue, m.mau);
  const revenuePerPayingUser = ratio(m.monthlyRevenue, m.msu);

  setText("freeToPaid", fmtPctFromRatio(freeToPaidProxy, 2));
  setText("monthlyArpu", fmtMoney(monthlyArpu, 2));
  setText("monthlyRevenue", fmtMoney(m.monthlyRevenue, 0));
  setText("totalSubscribedUsers", fmtNumber(m.totalSubscribedUsers));
  setText("revenuePerPayingUser", fmtMoney(revenuePerPayingUser, 2));
  setText("msuValue", fmtNumber(m.msu));

  new Chart(document.getElementById("revenueTierChart"), {
    type: "doughnut",
    data: {
      labels: m.mockRevenueByTier.map(x => x.label),
      datasets: [{ data: m.mockRevenueByTier.map(x => x.value), backgroundColor: ["#3559a1","#4d77c3","#9ec8f5","#c7d0dd"], borderColor: "#fff", borderWidth: 2 }]
    },
    options: { responsive: true, maintainAspectRatio: false, cutout: "62%", plugins: { legend: { position: "right" } } }
  });

  const table = document.getElementById("transactionsTable");
  table.innerHTML = `
    <thead><tr><th>Action</th><th>Initiated</th><th>Confirmed</th><th>Rate</th><th>Volume</th></tr></thead>
    <tbody>
      ${m.transactions.map(r => `
        <tr>
          <td>${r.action}</td>
          <td>${fmtNumber(r.initiated)}</td>
          <td>${fmtNumber(r.confirmed)}</td>
          <td>${r.rate.toFixed(1)}%</td>
          <td>${fmtMoney(r.volume, 2)}</td>
        </tr>
      `).join("")}
    </tbody>
  `;
}

function init() {
  setText("weekLabelTop", data.meta.liveLabel);
  buildUpperFunnel();
  buildRetention();
  buildEngagement();
  buildMonetization();
}

document.addEventListener("DOMContentLoaded", init);