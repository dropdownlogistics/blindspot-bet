export default function Governance() {
  return (
    <>
      <style>{`
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        :root{
          --bg:#0D2137;--surface:#0a1a2e;--card:#0f2237;
          --green:#22C55E;--green-light:#86EFAC;
          --text:#E2E8F0;--text-mid:#6B8AA0;--text-dim:#2A4A60;
          --border:#1A3048;--border-green:#22C55E30;--red:#EF4444;
          --amber:#C49A3C;
        }
        body{font-family:'Space Grotesk',sans-serif;background:var(--bg);color:var(--text);min-height:100vh}
        a{color:inherit;text-decoration:none}
        nav{position:sticky;top:0;z-index:100;padding:18px 48px;display:flex;justify-content:space-between;align-items:center;backdrop-filter:blur(12px);background:rgba(13,33,55,0.9);border-bottom:1px solid var(--border)}
        .logo{display:flex;align-items:center;gap:10px}
        .logo-mark{width:30px;height:30px;background:var(--card);border-radius:6px;display:flex;align-items:center;justify-content:center;border:1px solid var(--border-green)}
        .logo-text{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;letter-spacing:0.05em}
        .logo-text strong{color:var(--green)}
        .nav-back{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-mid);transition:color 0.2s}
        .nav-back:hover{color:var(--green)}

        .hero{max-width:860px;margin:0 auto;padding:80px 48px 60px}
        .eyebrow{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--amber);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:20px}
        .hero h1{font-size:clamp(2rem,4vw,3rem);font-weight:700;line-height:1.1;letter-spacing:-0.03em;margin-bottom:16px}
        .hero h1 em{font-family:'Source Serif 4',serif;font-style:italic;font-weight:400;color:var(--green)}
        .hero-sub{font-family:'Source Serif 4',serif;font-size:1rem;font-style:italic;color:var(--text-mid);line-height:1.8;max-width:580px}

        hr.divider{border:none;border-top:1px solid var(--border);margin:0 48px}

        .body{max-width:860px;margin:0 auto;padding:60px 48px 80px;display:flex;flex-direction:column;gap:56px}

        .block h2{font-size:1rem;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:10px}
        .dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}

        /* FOUNDER NOTE */
        .founder-note{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:36px;position:relative;overflow:hidden}
        .founder-note::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--green),transparent)}
        .founder-note p{font-family:'Source Serif 4',serif;font-size:1.05rem;color:var(--text);line-height:1.9;margin-bottom:16px}
        .founder-note p:last-of-type{margin-bottom:0}
        .founder-note .sig{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-mid);margin-top:20px;padding-top:20px;border-top:1px solid var(--border)}
        .founder-note strong{color:var(--green)}

        /* SAFETY */
        .safety-card{background:var(--surface);border:1px solid var(--border);border-radius:10px;overflow:hidden}
        .safety-header{background:var(--card);padding:18px 24px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px}
        .safety-header-text{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--green);letter-spacing:0.12em;text-transform:uppercase}
        .safety-body{padding:28px}
        .safety-body p{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--text-mid);line-height:1.9;margin-bottom:16px}
        .safety-body p:last-child{margin-bottom:0}
        .helpline{background:var(--card);border:1px solid var(--border-green);border-radius:8px;padding:20px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:8px}
        .helpline-label{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-dim);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px}
        .helpline-num{font-size:1.4rem;font-weight:700;color:var(--green);letter-spacing:-0.02em}
        .helpline-meta{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-mid)}
        .helpline-link{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--green);border:1px solid var(--border-green);padding:8px 16px;border-radius:6px;transition:background 0.2s}
        .helpline-link:hover{background:var(--border-green)}

        /* GOVERNANCE ITEMS */
        .gov-grid{display:flex;flex-direction:column;gap:14px}
        .gov-card{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:28px;position:relative}
        .gov-card-header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:12px}
        .gov-card h3{font-size:15px;font-weight:700}
        .gov-status{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;padding:4px 12px;border-radius:20px;flex-shrink:0;margin-top:2px}
        .status-done{background:rgba(34,197,94,0.1);color:var(--green);border:1px solid var(--border-green)}
        .status-pending{background:rgba(196,154,60,0.1);color:var(--amber);border:1px solid rgba(196,154,60,0.3)}
        .gov-card p{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-mid);line-height:1.8}
        .gov-card strong{color:var(--text)}

        /* COUNCIL */
        .council-note{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:20px 24px;display:flex;gap:16px;align-items:flex-start}
        .council-icon{font-size:18px;flex-shrink:0;margin-top:2px}
        .council-note p{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-mid);line-height:1.7}
        .council-note p strong{color:var(--green)}

        /* VERSION */
        .version-block{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-dim);letter-spacing:0.08em;padding-top:24px;border-top:1px solid var(--border)}

        footer{border-top:1px solid var(--border);padding:20px 48px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
        .footer-left{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-dim)}
        .footer-left strong{color:var(--green)}
        .footer-right{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-dim)}

        @media(max-width:768px){
          nav,.hero,.body{padding-left:20px;padding-right:20px}
          hr.divider{margin:0 20px}
          .helpline{flex-direction:column}
          footer{padding:20px}
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
        <div className="eyebrow">Governance · Responsible Use · March 2026</div>
        <h1>How this product<br /><em>is built to protect you.</em></h1>
        <p className="hero-sub">The rules this product operates under, why they exist, and what to do if this stops being useful and starts being something else.</p>
      </section>

      <hr className="divider" />

      <div className="body">

        {/* FOUNDER NOTE */}
        <div className="block">
          <h2><span className="dot" style={{background:'var(--green)'}} />A note from the builder</h2>
          <div className="founder-note">
            <p>I built blindspot.bet because I wanted a tool that helps people see their patterns more clearly. That&apos;s the whole thing. Track your bets, surface your blind spots, understand where your edge actually is — and where it isn&apos;t.</p>
            <p>I know what it looks like when something useful becomes something else. I didn&apos;t build this to be a gateway to that. If you&apos;re here and betting has already crossed a line — this tool isn&apos;t what you need right now. The number that is, is below.</p>
            <p>If you&apos;re here to get sharper — <strong>welcome. Let&apos;s build your edge.</strong></p>
            <div className="sig">— Dave Kitchens · Operator · Dropdown Logistics · blindspot.bet</div>
          </div>
        </div>

        {/* SAFETY */}
        <div className="block">
          <h2><span className="dot" style={{background:'var(--red)'}} />If you need help</h2>
          <div className="safety-card">
            <div className="safety-header">
              <div className="safety-header-text">Responsible Gambling Resources</div>
            </div>
            <div className="safety-body">
              <p>Problem gambling affects approximately 1% of the population — and a much higher percentage of people who bet regularly. The signs are not always obvious from the inside. If any of the following sound familiar, please reach out:</p>
              <p>Betting more than you intended. Chasing losses. Hiding how much you bet. Feeling like you need to win back what you lost. Using betting as an escape. Borrowing money to bet.</p>
              <p>This product tracks your patterns. If the data starts showing something you don&apos;t want to see — that is the product working. Pay attention to it.</p>
              <div className="helpline">
                <div>
                  <div className="helpline-label">National Problem Gambling Helpline</div>
                  <div className="helpline-num">1-800-522-4700</div>
                  <div className="helpline-meta">24/7 · Free · Confidential · Call or text</div>
                </div>
                <a href="https://www.ncpgambling.org" target="_blank" rel="noopener noreferrer" className="helpline-link">ncpgambling.org →</a>
              </div>
            </div>
          </div>
        </div>

        {/* GOVERNANCE FRAMEWORK */}
        <div className="block">
          <h2><span className="dot" style={{background:'var(--amber)'}} />Governance framework</h2>
          <div className="gov-grid">

            <div className="gov-card">
              <div className="gov-card-header">
                <h3>Scope Declaration</h3>
                <div className="gov-status status-done">Live · v1.0</div>
              </div>
              <p>blindspot.bet is an analytics tool. It is <strong>not</strong> a sportsbook, a picks service, a financial advisor, or a predictor of outcomes. The token economy is a simulation — tokens have no real-world value and cannot be redeemed. Every user acknowledges this before accessing the product. Full declaration at <a href="/scope" style={{color:'var(--green)'}}>blindspot.bet/scope</a>.</p>
            </div>

            <div className="gov-card">
              <div className="gov-card-header">
                <h3>Decision Log Protocol</h3>
                <div className="gov-status status-pending">In Build</div>
              </div>
              <p>Every bet logged on this platform will require a <strong>context note</strong> — a brief rationale for why the bet was placed. This is not optional. The note becomes part of the governed bet record and is used in outcome reconciliation. You cannot settle a bet and retroactively justify it. The rationale must exist at entry. This protocol makes the user accountable to their own stated reasoning — which is the core of decision forensics.</p>
            </div>

            <div className="gov-card">
              <div className="gov-card-header">
                <h3>Outcome Reconciliation Rule</h3>
                <div className="gov-status status-pending">In Build</div>
              </div>
              <p>Original bet entry is <strong>immutable</strong>. The rationale, odds, stake, and context note recorded at entry cannot be edited after settlement. This prevents the most common form of self-deception in betting analytics — retroactively reframing bad decisions as good process. The record shows what you believed when you placed the bet, not what you wish you had believed after the result.</p>
            </div>

            <div className="gov-card">
              <div className="gov-card-header">
                <h3>Token Economy Boundary</h3>
                <div className="gov-status status-done">Live · Ratified</div>
              </div>
              <p>All activity on blindspot.bet uses <strong>tokens</strong> — a closed simulation currency. Tokens cannot be purchased, sold, transferred, or redeemed for any real-world value. Starting balance: 1,000 tokens. Rebuys are free and unlimited. Every rebuy is logged. The frequency and timing of rebuys is behavioral data — not a punishment, not a reward. <strong>No financial transaction of any kind occurs on this platform.</strong></p>
            </div>

            <div className="gov-card">
              <div className="gov-card-header">
                <h3>Free Access Commitment</h3>
                <div className="gov-status status-pending">In Design</div>
              </div>
              <p>blindspot.bet is committed to maintaining a <strong>free tier</strong> that includes core bet logging functionality. The people who most benefit from pattern visibility are not always the ones most able to pay for it. Manual bet entry and CSV import will remain free. Paywalling the core logging feature would contradict the purpose of building this product.</p>
            </div>

          </div>
        </div>

        {/* COUNCIL NOTE */}
        <div className="block">
          <h2><span className="dot" style={{background:'var(--green-light)'}} />Council ratification</h2>
          <div className="council-note">
            <div className="council-icon">🏛️</div>
            <p>
              blindspot.bet&apos;s governance framework was reviewed by the <strong>DDL AI Council</strong> (10 seats, CR-BLINDSPOT-001, March 14 2026) before the first real user accessed the platform. The council identified a <strong>&ldquo;consequence-driven fracture risk&rdquo;</strong> — the possibility that analytics data could be misused to justify real-money decisions beyond a user&apos;s means. This page, the Scope Declaration, and the Decision Log Protocol are the ratified responses to that risk. The council advises. The operator decides. The operator decided to build it right before shipping it fast.
            </p>
          </div>
        </div>

        {/* VERSION */}
        <div className="version-block">
          GOVERNANCE FRAMEWORK v1.0 · blindspot.bet · Dropdown Logistics · March 15 2026<br />
          CR-BLINDSPOT-001 ratified · D&A Analytics · signal → structure → edge
        </div>

      </div>

      <footer>
        <div className="footer-left"><strong>blindspot</strong>.bet · Governance · D&amp;A Analytics</div>
        <div className="footer-right">signal → structure → edge · A Dropdown Logistics product</div>
      </footer>
    </>
  );
}
