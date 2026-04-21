Sorin dashboard v5

Changes from v4:
- Upper funnel overview corrected to latest warehouse values:
  - New Signups (This Week) = WNU on 2026-04-20 = 492
  - Download -> Register Rate = total_registered_users / total_user_views
    = 2423 / 9846 = 24.6%
- Engagement section corrected to use real available data since Apr 16.
- DAU Trend now shows:
  - New DAU = DNU
  - Returning DAU = DAU - DNU
- Added calculable deltas on engagement KPI cards vs previous day.
- Feature adoption tooltip now shows percentages correctly.

Key formulas:
- returning_dau = dau - dnu
- stickiness = dau / mau
- msgs_per_session = daily_user_messages / daily_sessions
- messages_per_user = daily_user_messages / daily_users_sending_message

Daily points used (warehouse):
2026-04-16: dnu 163, dau 245
2026-04-17: dnu 672, dau 788
2026-04-18: dnu 189, dau 279
2026-04-19: dnu 229, dau 316
2026-04-20: dnu 492, dau 620
