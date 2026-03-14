export default function Home() {
  return (
    <>
      <style>{`
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        :root{
          --bg:#0D2137;
          --surface:#0a1a2e;
          --card:#0f2237;
          --green:#22C55E;
          --green-dim:#0a2818;
          --green-light:#86EFAC;
          --neutral:#E2E8F0;
          --text:#E2E8F0;
          --text-mid:#6B8AA0;
          --text-dim:#2A4A60;
          --border:#1A3048;
          --border-green:#22C55E30;
          --red:#EF4444;
        }
        html{scroll-behavior:smooth}
        body{font-family:'Space Grotesk',sans-serif;background:var(--bg);color:var(--text);overflow-x:hidden;min-height:100vh}
        body::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");opacity:0.4;pointer-events:none;z-index:0}
        .glow-orb{position:fixed;border-radius:50%;filter:blur(140px);pointer-events:none;z-index:0}
        .glow-1{width:600px;height:600px;background:radial-gradient(circle,rgba(34,197,94,0.07) 0%,transparent 70%);top:-200px;right:-100px}
        .glow-2{width:400px;height:400px;background:radial-gradient(circle,rgba(134,239,172,0.04) 0%,transparent 70%);bottom:100px;left:-100px}
        nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:20px 40px;display:flex;justify-content:space-between;align-items:center;backdrop-filter:blur(12px);background:rgba(13,33,55,0.8);border-bottom:1px solid var(--border)}
        .logo{display:flex;align-items:center;gap:10px}
        .logo-mark{width:34px;height:34px;background:#0D2137;border-radius:7px;display:flex;align-items:center;justify-content:center;border:1px solid var(--border-green)}
        .logo-text{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;letter-spacing:0.05em}
        .logo-text strong{color:var(--green)}
        .nav-right{display:flex;align-items:center;gap:14px}
        .nav-badge{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--green);border:1px solid var(--border-green);padding:4px 12px;border-radius:20px;letter-spacing:0.08em;text-transform:uppercase}
        .nav-tagline{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-dim);letter-spacing:0.08em}
        .hero{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:120px 40px 80px;max-width:1100px;margin:0 auto}
        .hero-eyebrow{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--green);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:28px;opacity:0;animation:fadeUp 0.6s 0.1s ease forwards}
        .hero h1{font-size:clamp(3.5rem,7vw,6rem);font-weight:700;line-height:1.05;letter-spacing:-0.03em;margin-bottom:28px;opacity:0;animation:fadeUp 0.6s 0.2s ease forwards}
        .hero h1 em{font-style:italic;font-family:'Source Serif 4',serif;font-weight:400;color:var(--green)}
        .hero-sub{font-family:'JetBrains Mono',monospace;font-size:14px;color:var(--text-mid);max-width:520px;line-height:1.8;margin-bottom:48px;opacity:0;animation:fadeUp 0.6s 0.3s ease forwards}
        .hero-sub strong{color:var(--green);font-weight:500}
        .cta-row{display:flex;gap:14px;align-items:center;flex-wrap:wrap;opacity:0;animation:fadeUp 0.6s 0.4s ease forwards}
        .btn-primary{background:var(--green);color:#0D2137;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:13px;letter-spacing:0.05em;text-transform:uppercase;padding:14px 32px;border-radius:6px;border:none;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(34,197,94,0.3)}
        .btn-secondary{background:transparent;color:var(--text-mid);font-family:'JetBrains Mono',monospace;font-size:12px;padding:14px 24px;border-radius:6px;border:1px solid var(--border);cursor:pointer;transition:all 0.2s}
        .btn-secondary:hover{border-color:var(--border-green);color:var(--text)}
        .ticker-wrap{position:relative;z-index:1;border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:14px 0;margin-bottom:80px;overflow:hidden;background:rgba(10,26,46,0.5)}
        .ticker-inner{display:flex;gap:48px;animation:ticker 30s linear infinite;white-space:nowrap;width:max-content}
        .ticker-item{display:flex;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:11px}
        .ticker-label{color:var(--text-dim);letter-spacing:0.08em;text-transform:uppercase}
        .ticker-val{font-weight:600}
        .up{color:var(--green)}.down{color:var(--red)}.neutral{color:var(--green-light)}
        .ticker-dot{width:4px;height:4px;border-radius:50%;background:var(--border)}
        .stats-section{position:relative;z-index:1;max-width:1100px;margin:0 auto 100px;padding:0 40px}
        .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:12px;overflow:hidden}
        .stat-card{background:var(--surface);padding:32px 28px}
        .stat-num{font-size:2.4rem;font-weight:700;letter-spacing:-0.04em;margin-bottom:6px}
        .stat-label{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-dim);letter-spacing:0.1em;text-transform:uppercase}
        .stat-delta{font-family:'JetBrains Mono',monospace;font-size:10px;margin-top:8px}
        .features-section{position:relative;z-index:1;max-width:1100px;margin:0 auto 100px;padding:0 40px}
        .section-label{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--green);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:10px}
        .section-title{font-size:2.2rem;font-weight:700;letter-spacing:-0.03em;margin-bottom:60px;max-width:500px}
        .section-title em{font-style:italic;font-family:'Source Serif 4',serif;font-weight:400;color:var(--green)}
        .feature-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .feature-card{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:28px;transition:border-color 0.2s,transform 0.2s}
        .feature-card:hover{border-color:var(--border-green);transform:translateY(-2px)}
        .feature-icon{width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;margin-bottom:18px}
        .feature-card h3{font-size:15px;font-weight:600;margin-bottom:8px}
        .feature-card p{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-mid);line-height:1.7}
        .preview-section{position:relative;z-index:1;max-width:1100px;margin:0 auto 100px;padding:0 40px}
        .preview-frame{background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden}
        .preview-bar{background:var(--card);padding:14px 20px;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--border)}
        .preview-dot{width:10px;height:10px;border-radius:50%}
        .preview-url{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-dim);margin-left:8px}
        .preview-body{padding:28px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
        .mini-card{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:16px}
        .mini-label{font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px}
        .mini-val{font-size:1.6rem;font-weight:700;letter-spacing:-0.03em}
        .mini-sub{font-family:'JetBrains Mono',monospace;font-size:9px;margin-top:4px}
        .mini-bar{height:3px;background:var(--border);border-radius:2px;margin-top:12px;overflow:hidden}
        .mini-bar-fill{height:100%;border-radius:2px}
        .preview-bets{grid-column:1/-1;background:var(--card);border:1px solid var(--border);border-radius:8px;padding:16px}
        .bet-row{display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-family:'JetBrains Mono',monospace;font-size:11px}
        .bet-row:last-child{border:none}
        .bet-sport{color:var(--text-dim);font-size:9px;text-transform:uppercase;letter-spacing:0.08em}
        .bet-team{color:var(--text);font-size:11px;font-weight:500}
        .bet-result{font-weight:600}
        .waitlist-section{position:relative;z-index:1;max-width:1100px;margin:0 auto 60px;padding:0 40px}
        .waitlist-card{background:var(--surface);border:1px solid var(--border-green);border-radius:12px;padding:60px;position:relative;overflow:hidden}
        .waitlist-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--green),transparent)}
        .waitlist-inner{max-width:500px}
        .waitlist-card h2{font-size:2rem;font-weight:700;letter-spacing:-0.03em;margin-bottom:12px}
        .waitlist-card h2 em{font-style:italic;font-family:'Source Serif 4',serif;font-weight:400;color:var(--green)}
        .waitlist-card p{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--text-mid);line-height:1.7;margin-bottom:28px}
        .input-row{display:flex;gap:10px}
        .email-input{flex:1;background:var(--card);border:1px solid var(--border);border-radius:6px;padding:13px 16px;font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--text);outline:none;transition:border-color 0.2s}
        .email-input:focus{border-color:var(--border-green)}
        .email-input::placeholder{color:var(--text-dim)}
        footer{position:relative;z-index:1;border-top:1px solid var(--border);padding:24px 40px;max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
        .footer-left{display:flex;flex-direction:column;gap:4px}
        .footer-logo{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--text-dim)}
        .footer-logo strong{color:var(--green)}
        .footer-tagline{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-dim);letter-spacing:0.08em}
        .footer-right{display:flex;flex-direction:column;align-items:flex-end;gap:4px}
        .footer-ddl{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-dim)}
        .footer-ddl a{color:var(--green-light);text-decoration:none;transition:color 0.2s}
        .footer-ddl a:hover{color:var(--green)}
        .footer-copy{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-dim)}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @media(max-width:768px){
          .stats-grid{grid-template-columns:1fr 1fr}
          .feature-grid{grid-template-columns:1fr}
          .preview-body{grid-template-columns:1fr}
          .hero h1{font-size:3rem}
          nav,.hero{padding-left:20px;padding-right:20px}
          .nav-tagline{display:none}
          .stats-section,.features-section,.preview-section,.waitlist-section{padding:0 20px}
          .waitlist-card{padding:32px 24px}
          .input-row{flex-direction:column}
          footer{padding:24px 20px}
          .footer-right{align-items:flex-start}
        }
      `}</style>

      <div className="glow-orb glow-1" />
      <div className="glow-orb glow-2" />

      <nav>
        <div className="logo">
          <div className="logo-mark">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 2C7 2 13 5.5 13 8C13 10.5 7 12 7 14.5C7 17 13 19 13 19" stroke="#22C55E" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M13 2C13 2 7 5.5 7 8C7 10.5 13 12 13 14.5C13 17 7 19 7 19" stroke="#86EFAC" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="7.5" y1="6" x2="12.5" y2="6" stroke="#E2E8F0" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="7.5" y1="10" x2="12.5" y2="10" stroke="#E2E8F0" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="7.5" y1="14" x2="12.5" y2="14" stroke="#E2E8F0" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="logo-text"><strong>blindspot</strong>.bet</div>
        </div>
        <div className="nav-right">
          <span className="nav-tagline">signal â†’ structure â†’ edge</span>
          <div className="nav-badge">Early Access</div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-eyebrow">D&amp;A Analytics · Sports Betting · blindspot.bet</div>
        <h1>You&apos;re not losing.<br />You&apos;re <em>not seeing.</em></h1>
        <p className="hero-sub">
          <strong>blindspot.bet</strong> tracks every bet, surfaces every pattern, and shows you exactly where your edge is â€” and where it isn&apos;t. The house doesn&apos;t have better odds. It has better data.
        </p>
        <div className="cta-row">
          <button className="btn-primary">Join the Waitlist</button>
          <button className="btn-secondary">See How It Works â†’</button>
        </div>
      </section>

      <div className="ticker-wrap">
        <div className="ticker-inner">
          {[
            {label:'NBA Spreads',val:'+4.2% ROI',cls:'up'},
            {label:'NFL Moneyline',val:'-1.8% ROI',cls:'down'},
            {label:'MLB O/U',val:'+2.9% ROI',cls:'up'},
            {label:'Props',val:'0.4% ROI',cls:'neutral'},
            {label:'March Madness',val:'+7.1% ROI',cls:'up'},
            {label:'Live Betting',val:'-3.2% ROI',cls:'down'},
          ].flatMap((item, i) => [
            <div key={`a${i}`} className="ticker-item"><span className="ticker-label">{item.label}</span><span className={`ticker-val ${item.cls}`}>{item.val}</span></div>,
            <div key={`d${i}`} className="ticker-dot" />,
            <div key={`b${i}`} className="ticker-item"><span className="ticker-label">{item.label}</span><span className={`ticker-val ${item.cls}`}>{item.val}</span></div>,
            <div key={`e${i}`} className="ticker-dot" />,
          ])}
        </div>
      </div>

      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-num" style={{color:'var(--green)'}}>84%</div><div className="stat-label">of bettors have never tracked a single bet</div><div className="stat-delta" style={{color:'var(--text-dim)'}}>â€” that&apos;s your edge</div></div>
          <div className="stat-card"><div className="stat-num" style={{color:'var(--green-light)'}}>+6.2%</div><div className="stat-label">avg ROI improvement after 90 days of tracking</div><div className="stat-delta up">â†‘ vs untracked bettors</div></div>
          <div className="stat-card"><div className="stat-num" style={{color:'var(--neutral)'}}>12</div><div className="stat-label">behavioral patterns that predict long-run losses</div><div className="stat-delta" style={{color:'var(--text-dim)'}}>all trackable from bet logs</div></div>
          <div className="stat-card"><div className="stat-num" style={{color:'var(--red)'}}>$0</div><div className="stat-label">cost to identify your blind spots</div><div className="stat-delta" style={{color:'var(--green)'}}>free tier at launch</div></div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-label">What We Track</div>
        <div className="section-title">Your data.<br /><em>Fully visible.</em></div>
        <div className="feature-grid">
          {[
            {icon:'ðŸ“Š',bg:'#0a2818',title:'Bet Log',desc:'Every bet. Every platform. Moneyline, spread, O/U, props, parlays, live. Log in 3 taps. Review in seconds.'},
            {icon:'ðŸŽ¯',bg:'#0a2818',title:'ROI by Everything',desc:'Sport, bet type, platform, day of week, time of day. Your edge lives in the splits.'},
            {icon:'âš¡',bg:'#1a1030',title:'Tilt Detection',desc:'Bet size spikes after losses. Late-night variance. Chase patterns. We flag the behavior before it costs you.'},
            {icon:'ðŸ’°',bg:'#2A0A0A',title:'Cash-Out Tracker',desc:'Did you leave money on the table or dodge a bullet? Track every early exit and see the pattern over time.'},
            {icon:'ðŸ“¡',bg:'#0a1830',title:'Live Lines',desc:'Real odds from DraftKings, FanDuel, BetMGM and more. Shop lines. Log the best one.'},
            {icon:'ðŸ†',bg:'#0a2818',title:'Parlay Analysis',desc:"Each leg tracked independently. Win rate per leg type. Expected value vs actual. The math doesn't lie."},
          ].map((f,i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon" style={{background:f.bg}}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="preview-section">
        <div className="section-label">Dashboard Preview</div>
        <div className="section-title">What it <em>looks like</em><br />to see clearly.</div>
        <div className="preview-frame">
          <div className="preview-bar">
            <div className="preview-dot" style={{background:'#EF4444'}} />
            <div className="preview-dot" style={{background:'#F59E0B'}} />
            <div className="preview-dot" style={{background:'#22C55E'}} />
            <div className="preview-url">blindspot.bet/dashboard</div>
          </div>
          <div className="preview-body">
            <div className="mini-card"><div className="mini-label">Season ROI</div><div className="mini-val" style={{color:'var(--green)'}}>+4.8%</div><div className="mini-sub up">â†‘ +1.2% vs last month</div><div className="mini-bar"><div className="mini-bar-fill" style={{width:'68%',background:'var(--green)'}} /></div></div>
            <div className="mini-card"><div className="mini-label">Win Rate</div><div className="mini-val" style={{color:'var(--green-light)'}}>54.3%</div><div className="mini-sub" style={{color:'var(--text-dim)'}}>Break-even: 52.4%</div><div className="mini-bar"><div className="mini-bar-fill" style={{width:'54%',background:'var(--green-light)'}} /></div></div>
            <div className="mini-card"><div className="mini-label">Blind Spot</div><div className="mini-val" style={{color:'var(--red)',fontSize:'1.1rem'}}>Late Night</div><div className="mini-sub down">-8.2% ROI after 11pm</div><div className="mini-bar"><div className="mini-bar-fill" style={{width:'82%',background:'var(--red)'}} /></div></div>
            <div className="preview-bets">
              <div className="mini-label" style={{marginBottom:'12px'}}>Recent Bets</div>
              {[
                {sport:'NBA · Spread',team:'Lakers -4.5',book:'DraftKings · -110',result:'+$95.45',cls:'up'},
                {sport:'MLB · Moneyline',team:'Yankees ML',book:'FanDuel · -145',result:'-$100.00',cls:'down'},
                {sport:'NCAAB · O/U',team:'Kansas o152.5',book:'BetMGM · -108',result:'+$92.59',cls:'up'},
              ].map((b,i) => (
                <div key={i} className="bet-row">
                  <div><div className="bet-sport">{b.sport}</div><div className="bet-team">{b.team}</div></div>
                  <div style={{color:'var(--text-dim)',fontSize:'10px'}}>{b.book}</div>
                  <div className={`bet-result ${b.cls}`}>{b.result}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="waitlist-section">
        <div className="waitlist-card">
          <div className="waitlist-inner">
            <h2>Get in <em>early.</em></h2>
            <p>blindspot.bet is in active development. Early access members get free tier for life, priority features, and first look at the behavioral analytics layer.</p>
            <div className="input-row">
              <input className="email-input" type="email" placeholder="your@email.com" />
              <button className="btn-primary">Reserve Spot</button>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-left">
          <div className="footer-logo"><strong>blindspot</strong>.bet · D&amp;A Analytics</div>
          <div className="footer-tagline">signal â†’ structure â†’ edge</div>
        </div>
        <div className="footer-right">
          <div className="footer-ddl">A <a href="https://www.dropdownlogistics.com" target="_blank" rel="noopener noreferrer">Dropdown Logistics</a> product</div>
          <div className="footer-copy">Â© 2026 · built by two people who share actual DNA</div>
        </div>
      </footer>
    </>
  );
}
