const GLOSSARY = [
  {
    category: "Token Economy",
    color: "#22C55E",
    terms: [
      { term: "Token", def: "The simulation currency of blindspot.bet. Tokens have no real-world value and are not redeemable. They mirror real betting math without real stakes. Like poker chips in a practice game." },
      { term: "Token Balance", def: "Your current stack. Starts at 1,000. Goes up on wins, down on losses. Hits zero — you rebuy. The trajectory of your balance over time is a signal." },
      { term: "Starting Balance", def: "1,000 tokens. What every account gets on signup. What every rebuy resets to. Not a reward. Not a punishment. A baseline." },
      { term: "Rebuy", def: "A free token reset when your stack hits zero. Unlimited. Instant. But every rebuy is logged — timestamp, session context, what you were betting. Rebuy frequency is behavioral data." },
      { term: "Rebuy Log", def: "The append-only record of every stack reset. Combined with your bet log, it shows what you were betting when your tokens bled out. This is where tilt becomes visible." },
      { term: "Net Change", def: "Tokens won or lost on a single bet. Positive on wins, negative on losses. Never called profit or loss — those words imply real money." },
      { term: "Token Balance Trajectory", def: "The shape of your balance over time — plotted as a line on the dashboard. A flat line is treading water. A rising line is edge. A sawtooth is variance. A cliff is a blind spot." },
    ]
  },
  {
    category: "Bet Tracking",
    color: "#86EFAC",
    terms: [
      { term: "Bet Log", def: "The core fact table of blindspot.bet. Every bet you log becomes a row: date, sport, bet type, platform, odds, stake, result, net change. Append-only. No edits. No deletes." },
      { term: "Stake", def: "The number of tokens wagered on a single bet. Fixed per bet at entry. Used to calculate net change and cost-per-mile (tokens per unit wagered)." },
      { term: "Observed Win Rate", def: "Your actual win percentage across all logged bets. Break-even at standard -110 juice is 52.4%. Above that and you're generating positive EV. Below and you're leaking." },
      { term: "Observed EV", def: "Expected value calculated from your actual results — not theoretical. The difference between your observed EV and theoretical EV is where your edge (or your leak) lives." },
      { term: "Cash-Out", def: "An early exit on a live bet. Logged at actual exit value vs full payout. The delta between what you took and what you would have gotten is its own data point — and its own pattern." },
      { term: "Partial Bet", def: "A bet where you didn't go full stake. Noted at entry. Tracked separately from standard bets to avoid distorting your average stake calculations." },
      { term: "Context Note", def: "An optional text field on every bet log entry. Why did you make this bet? What did you see? This is where the narrative goes. Over time, notes become pattern data." },
    ]
  },
  {
    category: "Performance Metrics",
    color: "#C49A3C",
    terms: [
      { term: "ROI", def: "Return on investment — calculated in tokens. Net change divided by total staked, expressed as a percentage. The headline number. But ROI by split (sport, platform, time) is where the story is." },
      { term: "ROI by Split", def: "Your ROI filtered by a single dimension — sport, bet type, platform, day of week, time of day. This is the analytic layer. Your blind spot lives in the splits." },
      { term: "Max Drawdown", def: "The largest peak-to-trough decline in your token balance. Measures how deep the hole got before recovery. A large max drawdown with a positive ROI means you survived variance — but it was close." },
      { term: "Win Streak", def: "The longest consecutive winning run in your bet log. Interesting, but not the number to optimize. Streaks revert. Edge doesn't." },
      { term: "Loss Streak", def: "The longest consecutive losing run. More useful than win streak — loss streaks are where tilt enters and bet sizing errors compound." },
      { term: "Variance", def: "The statistical spread of your outcomes around the expected value. High variance means your results are volatile even if EV is positive. Low variance means your results are stable. Both can be profitable — but they feel very different." },
      { term: "Theoretical EV", def: "What the math says you should average per bet given the odds. At -110 juice: -1/21 per unit staked (the house edge). Your observed EV vs theoretical EV is the gap between skill and luck." },
    ]
  },
  {
    category: "Behavioral Layer",
    color: "#EF4444",
    terms: [
      { term: "Blind Spot", def: "A pattern in your betting behavior that costs you tokens — and that you couldn't see without data. Betting worse after 11pm. Losing on props while winning on spreads. Rebuying three times in a week. This is what the product exists to surface." },
      { term: "Tilt", def: "Emotional or reactive betting that deviates from your normal pattern. In blindspot.bet, tilt is flagged when bet size spikes after consecutive losses, when session length exceeds a threshold, or when rebuy frequency clusters in a short window." },
      { term: "Tilt Flag", def: "An automated alert when a behavioral pattern consistent with tilt is detected. Not a judgment — a signal. What you do with it is up to you." },
      { term: "Chase Pattern", def: "Increasing stake size after a loss in an attempt to recover. One of the 12 behavioral patterns tracked by blindspot.bet. Visible in the stake-over-time chart." },
      { term: "Late Night Variance", def: "Statistically worse performance on bets placed after a certain hour. One of the most common blind spots in the dataset. Flagged automatically when your after-hours ROI diverges from your overall ROI by more than 3%." },
      { term: "Stake Spike", def: "A bet where your stake is significantly above your average. Tracked and flagged. Stake spikes after losses are the primary tilt indicator." },
      { term: "Session", def: "A grouping of bets within a defined time window. Sessions help cluster behavior — a losing session that ends with a stake spike followed by a rebuy is a complete tilt pattern." },
    ]
  },
  {
    category: "Bet Types",
    color: "#6B8AA0",
    terms: [
      { term: "Moneyline (ML)", def: "A straight bet on who wins. No spread. Odds expressed as +/- American. -150 means stake 150 to win 100. +130 means stake 100 to win 130." },
      { term: "Spread", def: "A bet on the margin of victory. The favorite gives points; the underdog gets them. Standard juice is -110 on both sides. Most common bet type in the log." },
      { term: "Over/Under (O/U)", def: "A bet on the total combined score of both teams. Over = more than the line. Under = less. Also at standard -110 juice." },
      { term: "Prop Bet", def: "A bet on a specific outcome within a game — player stats, first scorer, method of first score. Higher variance, higher juice, and often where recreational bettors leak the most." },
      { term: "Parlay", def: "Multiple bets combined into one. All legs must win. Payout multiplies with each leg. EV is negative in expectation — but the variance is the point for some bettors. Tracked leg by leg." },
      { term: "Live Bet", def: "A bet placed during the game on in-play markets. Higher variance, faster decisions, higher tilt risk. Tracked separately in the bet log." },
      { term: "Futures", def: "A long-term bet on a season or tournament outcome — division winner, MVP, champion. Tracked in the log but held open until settlement." },
    ]
  },
  {
    category: "Platform & Lines",
    color: "#3B82F6",
    terms: [
      { term: "Book / Sportsbook", def: "The platform where a bet is placed. DraftKings, FanDuel, BetMGM, Caesars, and others. blindspot.bet tracks which book you used — because line shopping matters." },
      { term: "Line Shopping", def: "Comparing odds across multiple books before placing a bet to get the best price. Even small differences compound over volume. blindspot.bet surfaces your best and worst books by ROI." },
      { term: "Juice / Vig", def: "The sportsbook's commission. Standard is -110 (you stake 110 to win 100). The built-in house edge that your win rate must overcome." },
      { term: "Opening Line", def: "The initial odds posted by the book. Moves based on action and sharp money. Logged if captured — useful context for the bet." },
      { term: "Closing Line Value (CLV)", def: "How your odds at bet placement compare to the closing line. Positive CLV (you got better odds than closing) is the strongest indicator of long-term edge. Optional field in the log." },
      { term: "The Odds API", def: "The data source powering live lines in blindspot.bet. Legal, documented REST API covering major US books. Used to surface current odds at bet entry — no scraping, no gray area." },
    ]
  },
  {
    category: "DDL / SimCasino Canon",
    color: "#22C55E",
    terms: [
      { term: "SimCasino", def: "The DDL probability sandbox that the blindspot.bet token economy is built on. European roulette simulation, council-reviewed at v1.0. Established the ledger schema, token terminology, and de-monetized framing used throughout blindspot.bet." },
      { term: "Append-Only Ledger", def: "A data design principle inherited from SimCasino. Once a bet is logged, it cannot be edited or deleted. The log is a permanent, auditable record. Trust requires immutability." },
      { term: "Simulation Only", def: "The core framing of the token layer. Tokens are simulation units. blindspot.bet does not handle real money, does not constitute gambling, and does not provide betting advice. It tracks. It reveals. The auditor issues the opinion." },
      { term: "Signal → Structure → Edge", def: "The D&A Analytics tagline. Raw data (signal) organized into governed schema (structure) that surfaces actionable insight (edge). The philosophy behind every feature in blindspot.bet." },
      { term: "CoherentVelocity", def: "Complete, auditable systems built at speed. The DDL operating principle. blindspot.bet was scaffolded, branded, and deployed in one Friday night session. The schema was designed before a single line of app code was written." },
      { term: "Blind Spot (canon)", def: "A DDL canon term. A pattern you couldn't see without instrumentation. The test reveals something unexpected and important. The product is named for this moment — the thing you didn't know you needed to see." },
    ]
  }
];

export default function Glossary() {
  return (
    <>
      <style>{`
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        :root{
          --bg:#0D2137;--surface:#0a1a2e;--card:#0f2237;
          --green:#22C55E;--green-light:#86EFAC;
          --text:#E2E8F0;--text-mid:#6B8AA0;--text-dim:#2A4A60;
          --border:#1A3048;--border-green:#22C55E30;
        }
        body{font-family:'Space Grotesk',sans-serif;background:var(--bg);color:var(--text);min-height:100vh}
        a{color:inherit;text-decoration:none}
        nav{position:sticky;top:0;z-index:100;padding:18px 48px;display:flex;justify-content:space-between;align-items:center;backdrop-filter:blur(12px);background:rgba(13,33,55,0.9);border-bottom:1px solid var(--border)}
        .logo{display:flex;align-items:center;gap:10px}
        .logo-mark{width:30px;height:30px;background:var(--card);border-radius:6px;display:flex;align-items:center;justify-content:center;border:1px solid var(--border-green)}
        .logo-text{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;letter-spacing:0.05em}
        .logo-text strong{color:var(--green)}
        .nav-back{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-mid);letter-spacing:0.05em;transition:color 0.2s}
        .nav-back:hover{color:var(--green)}
        .hero{max-width:900px;margin:0 auto;padding:80px 48px 60px}
        .eyebrow{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--green);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:20px}
        .hero h1{font-size:clamp(2.4rem,4.5vw,3.6rem);font-weight:700;line-height:1.1;letter-spacing:-0.03em;margin-bottom:16px}
        .hero h1 em{font-family:'Source Serif 4',serif;font-style:italic;font-weight:400;color:var(--green)}
        .hero-sub{font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--text-mid);line-height:1.8;max-width:580px}
        .divider{border:none;border-top:1px solid var(--border);margin:0 48px}
        .glossary-body{max-width:900px;margin:0 auto;padding:60px 48px 80px;display:flex;flex-direction:column;gap:60px}
        .category-block h2{font-size:1.1rem;font-weight:700;letter-spacing:-0.01em;margin-bottom:4px;display:flex;align-items:center;gap:10px}
        .category-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
        .category-count{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-dim);letter-spacing:0.08em;margin-bottom:20px;padding-left:18px}
        .terms-list{display:flex;flex-direction:column;gap:2px}
        .term-row{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:20px 24px;display:grid;grid-template-columns:200px 1fr;gap:24px;transition:border-color 0.2s}
        .term-row:hover{border-color:var(--border-green)}
        .term-name{font-size:13px;font-weight:700;letter-spacing:-0.01em;padding-top:2px}
        .term-def{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-mid);line-height:1.7}
        footer{border-top:1px solid var(--border);padding:20px 48px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
        .footer-left{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-dim)}
        .footer-left strong{color:var(--green)}
        .footer-right{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-dim)}
        @media(max-width:768px){
          nav,.hero,.glossary-body{padding-left:24px;padding-right:24px}
          .divider{margin:0 24px}
          .term-row{grid-template-columns:1fr}
          footer{padding:20px 24px}
        }
      `}</style>

      <nav>
        <a href="/" className="logo">
          <div className="logo-mark">
            <svg width="18" height="18" viewBox="0 0 26 26" fill="none">
              <path d="M9 3C9 3 17 7 17 10.5C17 14 9 16 9 19.5C9 23 17 24 17 24" stroke="#22C55E" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M17 3C17 3 9 7 9 10.5C9 14 17 16 17 19.5C17 23 9 24 9 24" stroke="#86EFAC" strokeWidth="2.2" strokeLinecap="round"/>
              <line x1="10" y1="7.5" x2="16" y2="7.5" stroke="#E2E8F0" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="10" y1="13" x2="16" y2="13" stroke="#E2E8F0" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="10" y1="18.5" x2="16" y2="18.5" stroke="#E2E8F0" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="logo-text"><strong>blindspot</strong>.bet</div>
        </a>
        <a href="/" className="nav-back">← Back to Home</a>
      </nav>

      <section className="hero">
        <div className="eyebrow">Glossary</div>
        <h1>Every term.<br /><em>Defined.</em></h1>
        <p className="hero-sub">From token economy to tilt detection. From bet types to behavioral layer. If it&apos;s in the product, it&apos;s in here.</p>
      </section>

      <hr className="divider" />

      <div className="glossary-body">
        {GLOSSARY.map((cat, ci) => (
          <div key={ci} className="category-block">
            <h2>
              <span className="category-dot" style={{background:cat.color}} />
              {cat.category}
            </h2>
            <div className="category-count">{cat.terms.length} terms</div>
            <div className="terms-list">
              {cat.terms.map((t, ti) => (
                <div key={ti} className="term-row">
                  <div className="term-name" style={{color:cat.color}}>{t.term}</div>
                  <div className="term-def">{t.def}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer>
        <div className="footer-left"><strong>blindspot</strong>.bet · Glossary · D&amp;A Analytics</div>
        <div className="footer-right">signal → structure → edge · A Dropdown Logistics product</div>
      </footer>
    </>
  );
}
