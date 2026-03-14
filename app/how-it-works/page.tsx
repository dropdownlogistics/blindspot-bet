export default function HowItWorks() {
  return (
    <>
      <style>{`
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        :root{
          --bg:#0D2137;--surface:#0a1a2e;--card:#0f2237;
          --green:#22C55E;--green-light:#86EFAC;--green-dim:#0a2818;
          --neutral:#E2E8F0;--text:#E2E8F0;--text-mid:#6B8AA0;--text-dim:#2A4A60;
          --border:#1A3048;--border-green:#22C55E30;--red:#EF4444;--red-dim:#2A0A0A;
          --amber:#C49A3C;
        }
        html{scroll-behavior:smooth}
        body{font-family:'Space Grotesk',sans-serif;background:var(--bg);color:var(--text);min-height:100vh}
        a{color:inherit;text-decoration:none}

        /* NAV */
        nav{position:sticky;top:0;z-index:100;padding:18px 48px;display:flex;justify-content:space-between;align-items:center;backdrop-filter:blur(12px);background:rgba(13,33,55,0.9);border-bottom:1px solid var(--border)}
        .logo{display:flex;align-items:center;gap:10px}
        .logo-mark{width:30px;height:30px;background:var(--card);border-radius:6px;display:flex;align-items:center;justify-content:center;border:1px solid var(--border-green)}
        .logo-text{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;letter-spacing:0.05em}
        .logo-text strong{color:var(--green)}
        .nav-back{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-mid);letter-spacing:0.05em;transition:color 0.2s}
        .nav-back:hover{color:var(--green)}

        /* HERO */
        .hero{max-width:900px;margin:0 auto;padding:80px 48px 60px}
        .eyebrow{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--green);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:20px}
        .hero h1{font-size:clamp(2.4rem,4.5vw,3.6rem);font-weight:700;line-height:1.1;letter-spacing:-0.03em;margin-bottom:16px}
        .hero h1 em{font-family:'Source Serif 4',serif;font-style:italic;font-weight:400;color:var(--green)}
        .hero-sub{font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--text-mid);line-height:1.8;max-width:580px}

        .divider{border:none;border-top:1px solid var(--border);margin:0 48px}

        /* STEP FLOW */
        .flow-section{max-width:900px;margin:0 auto;padding:60px 48px}
        .section-label{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--amber);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:32px}
        .step-grid{display:flex;flex-direction:column;gap:2px}
        .step{display:grid;grid-template-columns:48px 1fr;gap:24px;background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:28px;transition:border-color 0.2s}
        .step:hover{border-color:var(--border-green)}
        .step-num{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--green);font-weight:600;letter-spacing:0.1em;padding-top:3px}
        .step-body h3{font-size:16px;font-weight:700;margin-bottom:8px;letter-spacing:-0.01em}
        .step-body p{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--text-mid);line-height:1.7}
        .step-body p strong{color:var(--text)}
        .step-tag{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:9px;padding:2px 8px;border-radius:4px;margin-top:10px;letter-spacing:0.08em;text-transform:uppercase;font-weight:600}
        .tag-green{background:var(--green-dim);color:var(--green);border:1px solid var(--border-green)}
        .tag-red{background:var(--red-dim);color:var(--red);border:1px solid #EF444430}
        .tag-amber{background:#1a1000;color:var(--amber);border:1px solid #C49A3C30}

        /* TOKEN ECONOMY */
        .token-section{max-width:900px;margin:0 auto;padding:0 48px 60px}
        .token-header{margin-bottom:32px}
        .token-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px}
        .token-card{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:28px}
        .token-card h3{font-size:14px;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:8px}
        .token-card ul{list-style:none;display:flex;flex-direction:column;gap:9px}
        .token-card li{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-mid);padding-left:16px;position:relative;line-height:1.6}
        .token-card li::before{content:'→';position:absolute;left:0;color:var(--green);font-size:9px}
        .token-card li.red::before{color:var(--red)}
        .token-card li.amber::before{color:var(--amber)}
        .token-card li strong{color:var(--text)}
        .token-full{background:var(--surface);border:1px solid var(--border-green);border-radius:10px;padding:28px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px}
        .token-stat{text-align:center}
        .token-stat-num{font-size:2rem;font-weight:700;letter-spacing:-0.04em;margin-bottom:4px}
        .token-stat-label{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-dim);letter-spacing:0.08em;text-transform:uppercase}

        /* REBUY */
        .rebuy-section{max-width:900px;margin:0 auto;padding:0 48px 60px}
        .rebuy-card{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:32px;display:grid;grid-template-columns:1fr 1fr;gap:32px}
        .rebuy-left h3{font-size:16px;font-weight:700;margin-bottom:12px}
        .rebuy-left p{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--text-mid);line-height:1.8}
        .rebuy-left p strong{color:var(--green)}
        .rebuy-right{background:var(--card);border-radius:8px;padding:20px;border:1px solid var(--border)}
        .rebuy-right h4{font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:14px}
        .rebuy-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);font-family:'JetBrains Mono',monospace;font-size:11px}
        .rebuy-row:last-child{border:none}
        .rebuy-date{color:var(--text-dim)}
        .rebuy-tokens{color:var(--green);font-weight:600}
        .rebuy-flag{font-size:9px;padding:2px 7px;border-radius:4px;background:var(--red-dim);color:var(--red);border:1px solid #EF444430;letter-spacing:0.06em}

        /* METRICS */
        .metrics-section{max-width:900px;margin:0 auto;padding:0 48px 60px}
        .metrics-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .metric-card{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:24px}
        .metric-card h4{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--green);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:10px}
        .metric-val{font-size:1.8rem;font-weight:700;letter-spacing:-0.04em;margin-bottom:4px}
        .metric-sub{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-dim);line-height:1.5}
        .metric-bar{height:3px;background:var(--border);border-radius:2px;margin-top:12px;overflow:hidden}
        .metric-bar-fill{height:100%;border-radius:2px}

        /* SIMCASINO CREDIT */
        .credit-section{max-width:900px;margin:0 auto;padding:0 48px 60px}
        .credit-card{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:28px;display:flex;gap:20px;align-items:flex-start}
        .credit-icon{font-size:24px;margin-top:2px}
        .credit-body h4{font-size:13px;font-weight:700;margin-bottom:8px}
        .credit-body p{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-mid);line-height:1.7}
        .credit-body p strong{color:var(--green)}

        /* CTA */
        .cta-section{max-width:900px;margin:0 auto;padding:0 48px 80px}
        .cta-card{background:var(--surface);border:1px solid var(--border-green);border-radius:10px;padding:40px;position:relative;overflow:hidden}
        .cta-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--green),transparent)}
        .cta-card h2{font-size:1.6rem;font-weight:700;letter-spacing:-0.02em;margin-bottom:8px}
        .cta-card h2 em{font-family:'Source Serif 4',serif;font-style:italic;font-weight:400;color:var(--green)}
        .cta-card p{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--text-mid);line-height:1.7;margin-bottom:24px;max-width:480px}
        .cta-row{display:flex;gap:12px;flex-wrap:wrap}
        .btn-primary{background:var(--green);color:#0D2137;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:12px;letter-spacing:0.05em;text-transform:uppercase;padding:12px 28px;border-radius:6px;border:none;cursor:pointer;transition:opacity 0.2s;display:inline-block}
        .btn-primary:hover{opacity:0.9}
        .btn-secondary{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--text-mid);padding:12px 20px;border-radius:6px;border:1px solid var(--border);cursor:pointer;transition:all 0.2s;display:inline-block}
        .btn-secondary:hover{border-color:var(--border-green);color:var(--text)}

        footer{border-top:1px solid var(--border);padding:20px 48px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
        .footer-left{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-dim)}
        .footer-left strong{color:var(--green)}
        .footer-right{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-dim)}

        @media(max-width:768px){
          nav,.hero,.flow-section,.token-section,.rebuy-section,.metrics-section,.credit-section,.cta-section{padding-left:24px;padding-right:24px}
          .divider{margin:0 24px}
          .token-grid,.rebuy-card,.metrics-grid{grid-template-columns:1fr}
          .token-full{grid-template-columns:1fr}
          footer{padding:20px 24px}
          .step{grid-template-columns:32px 1fr;gap:16px}
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
        <div className="eyebrow">How It Works</div>
        <h1>Log it. Track it.<br /><em>See it.</em></h1>
        <p className="hero-sub">blindspot.bet runs on tokens — a simulation currency that mirrors real betting without real stakes. Every bet logged. Every pattern surfaced. Every blind spot named.</p>
      </section>

      <hr className="divider" />

      {/* THE FLOW */}
      <section className="flow-section">
        <div className="section-label">The Loop</div>
        <div className="step-grid">
          {[
            { num:"01", title:"Get your token stack", body:"Every account starts with <strong>1,000 tokens</strong>. No credit card. No deposit. Tokens are simulation units — like poker chips in a practice game. They have no real-world value and are not redeemable.", tag:"FREE TO START", tagClass:"tag-green" },
            { num:"02", title:"Log a bet", body:"3 taps on mobile. Select your sport, bet type, platform, odds, and token stake. Add a note if you want context — <strong>why you made the bet matters as much as whether it won.</strong>", tag:"3 TAPS", tagClass:"tag-green" },
            { num:"03", title:"Record the result", body:"Win: tokens added based on payout odds. Loss: tokens deducted. <strong>Cash-out tracked separately</strong> — we log what you got vs what you would have gotten if you let it ride. That delta is signal.", tag:"ALL OUTCOMES LOGGED", tagClass:"tag-green" },
            { num:"04", title:"Read your dashboard", body:"ROI by sport. ROI by bet type. ROI by platform. ROI by time of day. Your edge — or your leak — <strong>lives in the splits.</strong> The dashboard shows you where.", tag:"BEHAVIORAL LAYER", tagClass:"tag-amber" },
            { num:"05", title:"Run out? Free rebuy.", body:"Stack hits zero — no problem. <strong>Free rebuy, unlimited.</strong> You get 1,000 tokens back instantly. But every rebuy is logged. Rebuy frequency is itself a blind spot. Eight rebuys in a month tells you something.", tag:"LOGGED", tagClass:"tag-red" },
          ].map((s,i) => (
            <div key={i} className="step">
              <div className="step-num">{s.num}</div>
              <div className="step-body">
                <h3>{s.title}</h3>
                <p dangerouslySetInnerHTML={{__html: s.body}} />
                <span className={`step-tag ${s.tagClass}`}>{s.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* TOKEN ECONOMY */}
      <section className="token-section">
        <div className="section-label">Token Economy</div>
        <div className="token-grid">
          <div className="token-card">
            <h3>📈 <span>When you win</span></h3>
            <ul>
              <li><strong>Moneyline -110:</strong> stake 100 tokens, win 91 tokens</li>
              <li><strong>Spread -110:</strong> same payout structure</li>
              <li><strong>+150 underdog:</strong> stake 100, win 150 tokens</li>
              <li><strong>Parlay:</strong> each leg multiplies — all legs must hit</li>
              <li><strong>Cash-out:</strong> logged at actual exit value vs full payout</li>
            </ul>
          </div>
          <div className="token-card">
            <h3>📉 <span>When you lose</span></h3>
            <ul className="">
              <li className="red"><strong>Standard loss:</strong> stake deducted in full</li>
              <li className="red"><strong>Parlay bust:</strong> full stake lost on first miss</li>
              <li className="red"><strong>Late cash-out:</strong> logged as partial loss vs hold</li>
              <li className="amber"><strong>Tilt flag:</strong> stake spike after 2+ losses triggers alert</li>
              <li className="amber"><strong>Rebuy:</strong> stack reset to 1,000, event logged</li>
            </ul>
          </div>
        </div>
        <div className="token-full">
          <div className="token-stat">
            <div className="token-stat-num" style={{color:'var(--green)'}}>1,000</div>
            <div className="token-stat-label">Starting token balance</div>
          </div>
          <div className="token-stat">
            <div className="token-stat-num" style={{color:'var(--green-light)'}}>∞</div>
            <div className="token-stat-label">Free rebuys available</div>
          </div>
          <div className="token-stat">
            <div className="token-stat-num" style={{color:'var(--red)'}}>$0</div>
            <div className="token-stat-label">Real money involved</div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* REBUY AS SIGNAL */}
      <section className="rebuy-section">
        <div className="section-label">The Rebuy Signal</div>
        <div className="rebuy-card">
          <div className="rebuy-left">
            <h3>Every rebuy is a data point.</h3>
            <p>
              Running out of tokens isn&apos;t a punishment — it&apos;s information.<br /><br />
              <strong>One rebuy:</strong> variance. It happens.<br />
              <strong>Three rebuys in a week:</strong> pattern. Worth looking at.<br />
              <strong>Eight rebuys in a month:</strong> blind spot. This is the product working.<br /><br />
              The rebuy log timestamps every reset. Combined with your bet log, it shows exactly <strong>what you were betting when your stack bled out.</strong>
            </p>
          </div>
          <div className="rebuy-right">
            <h4>Sample Rebuy Log</h4>
            {[
              {date:"Jan 04",tokens:"1,000",flag:false},
              {date:"Jan 11",tokens:"1,000",flag:false},
              {date:"Jan 14",tokens:"1,000",flag:true},
              {date:"Jan 14",tokens:"1,000",flag:true},
              {date:"Jan 20",tokens:"1,000",flag:false},
            ].map((r,i) => (
              <div key={i} className="rebuy-row">
                <span className="rebuy-date">{r.date}</span>
                <span className="rebuy-tokens">+{r.tokens} tokens</span>
                {r.flag && <span className="rebuy-flag">TILT WINDOW</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* DASHBOARD METRICS */}
      <section className="metrics-section">
        <div className="section-label">What The Dashboard Shows</div>
        <div className="metrics-grid">
          {[
            {label:"Token Balance", val:"6,240", sub:"Trajectory over time. The shape of the line tells the story.", color:"var(--green)", pct:62},
            {label:"Observed Win Rate", val:"54.3%", sub:"Break-even at -110 is 52.4%. Are you above the line?", color:"var(--green-light)", pct:54},
            {label:"ROI by Sport", val:"+4.8%", sub:"NBA spreads. MLB moneyline. Where is your edge actually?", color:"var(--green)", pct:48},
            {label:"Blind Spot", val:"11pm+", sub:"-8.2% ROI after 11pm. Late-night bets are leaking tokens.", color:"var(--red)", pct:82},
            {label:"Max Drawdown", val:"−430", sub:"Peak-to-trough. How deep did the hole get before recovery?", color:"var(--red)", pct:43},
            {label:"Rebuy Count", val:"3", sub:"This month. Frequency matters more than the number.", color:"var(--amber)", pct:30},
          ].map((m,i) => (
            <div key={i} className="metric-card">
              <h4>{m.label}</h4>
              <div className="metric-val" style={{color:m.color}}>{m.val}</div>
              <div className="metric-sub">{m.sub}</div>
              <div className="metric-bar"><div className="metric-bar-fill" style={{width:`${m.pct}%`,background:m.color}} /></div>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* SIMCASINO CREDIT */}
      <section className="credit-section">
        <div className="section-label">Under The Hood</div>
        <div className="credit-card">
          <div className="credit-icon">🎲</div>
          <div className="credit-body">
            <h4>Token economy based on SimCasino — DDL council-reviewed v1.0</h4>
            <p>
              The token ledger schema, rebuy logic, and EV tracking methodology originate from <strong>SimCasino</strong> — a DDL-built probability sandbox that went through a full council review before v1.0 was frozen. Terminology is de-monetized by design: <strong>token balance</strong> (not bankroll), <strong>net change</strong> (not profit/loss), <strong>observed win frequency</strong> (not hit rate). The ledger is append-only. Every run is stamped. No overwrites.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-card">
          <h2>Ready to find your <em>blind spots?</em></h2>
          <p>Early access is open. Free tier at launch. Token stack waiting.</p>
          <div className="cta-row">
            <a href="/" className="btn-primary">Join the Waitlist</a>
            <a href="/glossary" className="btn-secondary">Glossary →</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-left"><strong>blindspot</strong>.bet · How It Works · D&amp;A Analytics</div>
        <div className="footer-right">signal → structure → edge · A Dropdown Logistics product</div>
      </footer>
    </>
  );
}
