export default function Scope() {
  return (
    <>
      <style>{`
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        :root{
          --bg:#0D2137;--surface:#0a1a2e;--card:#0f2237;
          --green:#22C55E;--green-light:#86EFAC;
          --text:#E2E8F0;--text-mid:#6B8AA0;--text-dim:#2A4A60;
          --border:#1A3048;--border-green:#22C55E30;
          --amber:#C49A3C;--red:#EF4444;
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
        .hero h1{font-size:clamp(2.2rem,4vw,3.2rem);font-weight:700;line-height:1.1;letter-spacing:-0.03em;margin-bottom:16px}
        .hero h1 em{font-family:'Source Serif 4',serif;font-style:italic;font-weight:400;color:var(--green)}
        .hero-sub{font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--text-mid);line-height:1.8;max-width:600px}

        .divider{border:none;border-top:1px solid var(--border);margin:0 48px}

        .body{max-width:860px;margin:0 auto;padding:60px 48px 80px;display:flex;flex-direction:column;gap:48px}

        .block h2{font-size:1rem;font-weight:700;letter-spacing:-0.01em;margin-bottom:16px;display:flex;align-items:center;gap:10px}
        .block-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
        .block p{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--text-mid);line-height:1.9;max-width:700px}
        .block p strong{color:var(--text)}

        .declaration-card{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:32px;position:relative;overflow:hidden}
        .declaration-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--amber),transparent)}
        .declaration-card h3{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--amber);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:20px}

        .decl-row{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:24px}
        .decl-is{background:var(--card);border:1px solid #22C55E20;border-radius:8px;padding:20px}
        .decl-is h4{font-size:12px;font-weight:700;color:var(--green);margin-bottom:12px;letter-spacing:0.05em;text-transform:uppercase}
        .decl-isnot{background:var(--card);border:1px solid #EF444420;border-radius:8px;padding:20px}
        .decl-isnot h4{font-size:12px;font-weight:700;color:var(--red);margin-bottom:12px;letter-spacing:0.05em;text-transform:uppercase}
        .decl-list{list-style:none;display:flex;flex-direction:column;gap:8px}
        .decl-list li{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-mid);padding-left:16px;position:relative;line-height:1.6}
        .decl-list.is li::before{content:'✓';position:absolute;left:0;color:var(--green);font-size:10px}
        .decl-list.isnot li::before{content:'✗';position:absolute;left:0;color:var(--red);font-size:10px}

        .canon-statement{background:var(--card);border-left:3px solid var(--amber);border-radius:0 6px 6px 0;padding:20px 24px;font-family:'Source Serif 4',serif;font-style:italic;font-size:1rem;color:var(--text);line-height:1.7}

        .token-block{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:28px}
        .token-block h3{font-size:14px;font-weight:700;margin-bottom:12px}
        .token-block p{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--text-mid);line-height:1.8}
        .token-block p strong{color:var(--text)}

        .responsibility-block{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:28px}
        .responsibility-block h3{font-size:14px;font-weight:700;margin-bottom:12px}
        .responsibility-block ul{list-style:none;display:flex;flex-direction:column;gap:8px}
        .responsibility-block li{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--text-mid);padding-left:16px;position:relative;line-height:1.6}
        .responsibility-block li::before{content:'→';position:absolute;left:0;color:var(--green);font-size:10px}
        .responsibility-block li strong{color:var(--text)}

        .governance-note{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:20px 24px;display:flex;gap:16px;align-items:flex-start}
        .governance-icon{font-size:18px;margin-top:2px;flex-shrink:0}
        .governance-note p{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-mid);line-height:1.7}
        .governance-note p strong{color:var(--green)}

        .version-block{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-dim);letter-spacing:0.08em;padding-top:24px;border-top:1px solid var(--border)}

        footer{border-top:1px solid var(--border);padding:20px 48px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
        .footer-left{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-dim)}
        .footer-left strong{color:var(--green)}
        .footer-right{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-dim)}

        @media(max-width:768px){
          nav,.hero,.body{padding-left:24px;padding-right:24px}
          .divider{margin:0 24px}
          .decl-row{grid-template-columns:1fr}
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
        <div className="eyebrow">Scope Declaration · v1.0 · March 2026</div>
        <h1>What this product<br /><em>is and is not.</em></h1>
        <p className="hero-sub">blindspot.bet is an analytics tool. Not a sportsbook. Not a picks service. Not financial advice. This page defines the boundaries clearly — for users, for collaborators, and for the record.</p>
      </section>

      <hr className="divider" />

      <div className="body">

        {/* IS / IS NOT */}
        <div className="block">
          <h2>
            <span className="block-dot" style={{background:'var(--amber)'}} />
            The Declaration
          </h2>
          <div className="declaration-card">
            <h3>Scope Declaration — blindspot.bet v1.0</h3>
            <div className="decl-row">
              <div className="decl-is">
                <h4>What blindspot.bet IS</h4>
                <ul className="decl-list is">
                  <li>A personal betting analytics tool</li>
                  <li>A behavioral pattern detection system</li>
                  <li>A governed, append-only bet log</li>
                  <li>A token-based simulation economy</li>
                  <li>A tool for identifying your own blind spots</li>
                  <li>A retrospective diagnostic instrument</li>
                  <li>A data layer for your own decision history</li>
                </ul>
              </div>
              <div className="decl-isnot">
                <h4>What blindspot.bet IS NOT</h4>
                <ul className="decl-list isnot">
                  <li>A sportsbook or gambling service</li>
                  <li>A picks service or tipping platform</li>
                  <li>Financial or investment advice</li>
                  <li>A predictor of future outcomes</li>
                  <li>A guarantee of edge or profitability</li>
                  <li>A real-money wagering platform</li>
                  <li>A substitute for responsible gambling judgment</li>
                </ul>
              </div>
            </div>
            <div className="canon-statement">
              blindspot.bet does not predict outcomes. It does not provide picks, odds advantages, or financial advice. It is a retrospective diagnostic tool designed to analyze historical decision quality. The platform operates exclusively on a closed token economy. Tokens possess zero financial value and are not redeemable for any real-world consideration.
            </div>
          </div>
        </div>

        {/* TOKEN ECONOMY */}
        <div className="token-block">
          <h3>The Token Economy</h3>
          <p>
            All activity on blindspot.bet uses <strong>tokens</strong> — a closed simulation currency with no real-world value. Tokens cannot be purchased, sold, transferred, or redeemed. They exist solely as a unit of measurement for tracking betting behavior within the platform.<br /><br />
            The token economy is modeled on <strong>SimCasino v1.0</strong> — a DDL council-reviewed probability sandbox built on de-monetized terminology and append-only ledger design. Starting balance is 1,000 tokens. Rebuys are free and unlimited. Every rebuy is logged. The frequency and timing of rebuys is itself behavioral data — not a punishment, not a reward.<br /><br />
            <strong>No financial transaction of any kind occurs on this platform.</strong>
          </p>
        </div>

        {/* RESPONSIBILITY */}
        <div className="responsibility-block">
          <h3>User Responsibility</h3>
          <ul>
            <li><strong>You are solely responsible</strong> for any real-world financial decisions you make.</li>
            <li><strong>blindspot.bet does not know</strong> how much real money you are wagering, if any.</li>
            <li><strong>Pattern data is retrospective.</strong> Past behavior does not predict future results.</li>
            <li><strong>Blind spots flagged by this platform</strong> are observations, not instructions.</li>
            <li><strong>If you have a gambling problem</strong>, please contact the National Problem Gambling Helpline: 1-800-522-4700 or visit ncpgambling.org.</li>
          </ul>
        </div>

        {/* GOVERNANCE NOTE */}
        <div className="block">
          <h2>
            <span className="block-dot" style={{background:'var(--green)'}} />
            Governance Context
          </h2>
          <div className="governance-note">
            <div className="governance-icon">🏛️</div>
            <p>
              This Scope Declaration was ratified as a required governance insertion before real users access the platform. It was recommended unanimously by the DDL AI Council (CR-BLINDSPOT-001, March 14 2026) in response to a risk flag identifying <strong>&ldquo;consequence-driven fracture risk&rdquo;</strong> — the possibility that analytics data could be misused to justify real-money decisions beyond the user&apos;s means. The Declaration establishes the platform&apos;s boundary and intent on the record, before any user trust transfer begins.
            </p>
          </div>
        </div>

        {/* VERSION */}
        <div className="version-block">
          SCOPE DECLARATION v1.0 · blindspot.bet · Dropdown Logistics · March 14 2026<br />
          Ratified: CR-BLINDSPOT-001 · D&A Analytics · signal → structure → edge
        </div>

      </div>

      <footer>
        <div className="footer-left"><strong>blindspot</strong>.bet · Scope Declaration · D&amp;A Analytics</div>
        <div className="footer-right">signal → structure → edge · A Dropdown Logistics product</div>
      </footer>
    </>
  );
}
