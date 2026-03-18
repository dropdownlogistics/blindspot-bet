"use client";
import { WelcomeModal } from "@/components/WelcomeModal";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const submit = async () => {
    if (!email) return;
    setStatus("loading");
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setStatus(res.ok ? "success" : "error");
  };
  if (status === "success") return (
    <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,color:"#22C55E",padding:"12px 0"}}>
      ✓ You&apos;re on the list. signal → structure → edge
    </div>
  );
  return (
    <div className="input-row">
      <input className="email-input" type="email" placeholder="your@email.com" value={email}
        onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()}
        disabled={status === "loading"} />
      <button className="btn-primary" onClick={submit} disabled={status === "loading"}>
        {status === "loading" ? "..." : "Get Started Free"}
      </button>
      {status === "error" && <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#EF4444",marginTop:8}}>Something went wrong. Try again.</div>}
    </div>
  );
}

const NODES = [
  { label: "Bet Log", sub: "3-tap entry", angle: -90 },
  { label: "Dashboard", sub: "ROI by split", angle: -18 },
  { label: "Tilt Detection", sub: "behavior flags", angle: 54 },
  { label: "Token Economy", sub: "no real money", angle: 126 },
  { label: "Scope", sub: "boundaries", angle: 198 },
];


function NavActions() {
  const { isSignedIn } = useUser();
  if (isSignedIn) return (
    <a href="/dashboard" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",color:"var(--green)",border:"1px solid var(--border-green)",padding:"6px 16px",borderRadius:"20px",letterSpacing:"0.08em",textDecoration:"none",textTransform:"uppercase"}}>Dashboard →</a>
  );
  return (
    <div style={{display:"flex",gap:"10px",alignItems:"center"}}>
      <a href="/sign-in" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",color:"var(--text-mid)",textDecoration:"none",letterSpacing:"0.06em"}}>Sign In</a>
      <a href="/sign-up" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",color:"var(--green)",border:"1px solid var(--border-green)",padding:"6px 16px",borderRadius:"20px",letterSpacing:"0.08em",textDecoration:"none",textTransform:"uppercase"}}>Get Started</a>
    </div>
  );
}

function OrbitalHero({ visible }: { visible: boolean }) {
  const R = 165;
  const CX = 260;
  const CY = 260;

  return (
    <div style={{
      position:"relative",width:"100%",maxWidth:520,margin:"0 auto",
      opacity:visible?1:0,transition:"opacity 1s ease 0.3s",
    }}>
      <svg viewBox="0 0 520 520" style={{width:"100%",height:"auto"}}>
        {/* Rings */}
        <circle cx={CX} cy={CY} r={R+55} fill="none" stroke="#22C55E" strokeWidth="0.3" strokeOpacity="0.1" />
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#22C55E" strokeWidth="0.6" strokeOpacity="0.3" />
        <circle cx={CX} cy={CY} r={R-38} fill="none" stroke="#1A3048" strokeWidth="0.5" />

        {/* Rotating arc segment */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#22C55E" strokeWidth="2"
          strokeDasharray={`${R*0.45} ${R*5.8}`} strokeLinecap="round" opacity="0.7"
          style={{animation:"spin 14s linear infinite",transformOrigin:`${CX}px ${CY}px`}} />

        {/* Spokes */}
        {NODES.map((node, i) => {
          const rad = (node.angle*Math.PI)/180;
          const x1 = CX+(R-38)*Math.cos(rad);
          const y1 = CY+(R-38)*Math.sin(rad);
          const x2 = CX+R*Math.cos(rad);
          const y2 = CY+R*Math.sin(rad);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#22C55E" strokeWidth="0.5" strokeOpacity="0.35" />;
        })}

        {/* Center card */}
        <rect x={CX-54} y={CY-54} width={108} height={108} rx={18} fill="#0D2137" stroke="#22C55E" strokeWidth="1" strokeOpacity="0.5" />
        <rect x={CX-51} y={CY-51} width={102} height={102} rx={16} fill="#0a1a2e" stroke="#1A3048" strokeWidth="0.5" />

        {/* Helix mark — nested SVG with canonical viewBox */}
        <foreignObject x={CX-38} y={CY-38} width="76" height="76">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" width="76" height="76" fill="none">
            <path d="M9 3C9 3 17 7 17 10.5C17 14 9 16 9 19.5C9 23 17 24 17 24" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
            <path d="M17 3C17 3 9 7 9 10.5C9 14 17 16 17 19.5C17 23 9 24 9 24" stroke="#86EFAC" strokeWidth="2" strokeLinecap="round"/>
            <line x1="10" y1="7.5" x2="16" y2="7.5" stroke="#E2E8F0" strokeWidth="1.4" strokeLinecap="round"/>
            <line x1="10" y1="13" x2="16" y2="13" stroke="#E2E8F0" strokeWidth="1.4" strokeLinecap="round"/>
            <line x1="10" y1="18.5" x2="16" y2="18.5" stroke="#E2E8F0" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </foreignObject>

        {/* Nodes */}
        {NODES.map((node, i) => {
          const rad = (node.angle*Math.PI)/180;
          const nx = CX+R*Math.cos(rad);
          const ny = CY+R*Math.sin(rad);
          const isRight = nx > CX+15;
          const isLeft = nx < CX-15;
          const bx = isRight ? nx+10 : isLeft ? nx-114 : nx-52;
          return (
            <g key={i}>
              <circle cx={nx} cy={ny} r={6} fill="#0D2137" stroke="#22C55E" strokeWidth="1.3" />
              <circle cx={nx} cy={ny} r={3} fill="#22C55E" />
              <rect x={bx} y={ny-20} width={104} height={40} rx={7} fill="#0a1a2e" stroke="#1A3048" strokeWidth="0.5" />
              <text x={bx+10} y={ny-4} fontFamily="'Space Grotesk',sans-serif" fontSize="11.5" fontWeight="600" fill="#E2E8F0" letterSpacing="0.01em">{node.label}</text>
              <text x={bx+10} y={ny+12} fontFamily="'JetBrains Mono',monospace" fontSize="9.5" fill="#6B8AA0" letterSpacing="0.04em">{node.sub}</text>
            </g>
          );
        })}

        {/* Arc text stamp */}
        <path id="arcStamp" d={`M ${CX-R-28},${CY} a ${R+28},${R+28} 0 0,1 ${2*(R+28)},0`} fill="none" />
        <text fontFamily="'JetBrains Mono',monospace" fontSize="9.5" fill="#2A4A60" letterSpacing="0.16em">
          <textPath href="#arcStamp" startOffset="8%">D&amp;A ANALYTICS · SIGNAL → STRUCTURE → EDGE · BLINDSPOT.BET ·</textPath>
        </text>
      </svg>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

export default function Home() {
  const [visible, setVisible] = useState(false);
  useEffect(()=>{setTimeout(()=>setVisible(true),120);},[]);

  return (
    <>
      <style>{`
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        :root{
          --bg:#0D2137;--surface:#0a1a2e;--card:#0f2237;
          --green:#22C55E;--green-light:#86EFAC;
          --text:#E2E8F0;--text-mid:#6B8AA0;--text-dim:#2A4A60;
          --border:#1A3048;--border-green:#22C55E30;--red:#EF4444;
        }
        html{scroll-behavior:smooth}
        body{font-family:'Space Grotesk',sans-serif;background:var(--bg);color:var(--text);overflow-x:hidden;min-height:100vh}
        body::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");opacity:0.4;pointer-events:none;z-index:0}
        .glow-orb{position:fixed;border-radius:50%;filter:blur(140px);pointer-events:none;z-index:0}
        .glow-1{width:700px;height:700px;background:radial-gradient(circle,rgba(34,197,94,0.07) 0%,transparent 70%);top:-200px;right:-150px}
        .glow-2{width:500px;height:500px;background:radial-gradient(circle,rgba(134,239,172,0.04) 0%,transparent 70%);bottom:0;left:-150px}
        nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:18px 48px;display:flex;justify-content:space-between;align-items:center;backdrop-filter:blur(12px);background:rgba(13,33,55,0.88);border-bottom:1px solid var(--border)}
        .logo{display:flex;align-items:center;gap:10px}
        .logo-mark{width:30px;height:30px;background:#0D2137;border-radius:6px;display:flex;align-items:center;justify-content:center;border:1px solid var(--border-green)}
        .logo-text{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;letter-spacing:0.05em}
        .logo-text strong{color:var(--green)}
        .nav-right{display:flex;align-items:center;gap:14px}
        .nav-badge{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--green);border:1px solid var(--border-green);padding:4px 12px;border-radius:20px;letter-spacing:0.08em;text-transform:uppercase}
        .nav-tagline{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-dim);letter-spacing:0.06em}

        .hero{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:40px;padding:100px 64px 56px;max-width:1240px;margin:0 auto}
        .hero-text{display:flex;flex-direction:column}
        .hero-eyebrow{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--green);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:22px;opacity:0;animation:fadeUp 0.7s 0.2s ease forwards}
        .hero h1{font-size:clamp(2.6rem,4.5vw,4.2rem);font-weight:700;line-height:1.06;letter-spacing:-0.03em;margin-bottom:20px;opacity:0;animation:fadeUp 0.7s 0.3s ease forwards}
        .hero h1 em{font-style:italic;font-family:'Source Serif 4',serif;font-weight:400;color:var(--green)}
        .hero-sub{font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--text-mid);max-width:420px;line-height:1.9;margin-bottom:36px;opacity:0;animation:fadeUp 0.7s 0.4s ease forwards}
        .hero-sub strong{color:var(--green);font-weight:500}
        .cta-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap;opacity:0;animation:fadeUp 0.7s 0.5s ease forwards}
        .orbital-col{opacity:0;animation:fadeUp 0.9s 0.25s ease forwards}

        .btn-primary{background:var(--green);color:#0D2137;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;padding:13px 28px;border-radius:6px;border:none;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(34,197,94,0.3)}
        .btn-primary:disabled{opacity:0.6;cursor:not-allowed;transform:none}
        .btn-secondary{background:transparent;color:var(--text-mid);font-family:'JetBrains Mono',monospace;font-size:11px;padding:13px 20px;border-radius:6px;border:1px solid var(--border);cursor:pointer;transition:all 0.2s;text-decoration:none;display:inline-flex;align-items:center}
        .btn-secondary:hover{border-color:var(--border-green);color:var(--text)}

        .ticker-wrap{position:relative;z-index:1;border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:12px 0;overflow:hidden;background:rgba(10,26,46,0.6)}
        .ticker-inner{display:flex;gap:48px;animation:ticker 30s linear infinite;white-space:nowrap;width:max-content}
        .ticker-item{display:flex;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:11px}
        .ticker-label{color:var(--text-dim);letter-spacing:0.08em;text-transform:uppercase}
        .ticker-val{font-weight:600}
        .up{color:var(--green)}.down{color:var(--red)}.neutral{color:var(--green-light)}
        .ticker-dot{width:4px;height:4px;border-radius:50%;background:var(--border)}

        .stats-section{position:relative;z-index:1;max-width:1100px;margin:60px auto;padding:0 40px}
        .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:12px;overflow:hidden}
        .stat-card{background:var(--surface);padding:28px 24px}
        .stat-num{font-size:2.2rem;font-weight:700;letter-spacing:-0.04em;margin-bottom:6px}
        .stat-label{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-dim);letter-spacing:0.1em;text-transform:uppercase}
        .stat-delta{font-family:'JetBrains Mono',monospace;font-size:10px;margin-top:8px}

        .features-section{position:relative;z-index:1;max-width:1100px;margin:0 auto 80px;padding:0 40px}
        .section-label{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--green);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:10px}
        .section-title{font-size:2rem;font-weight:700;letter-spacing:-0.03em;margin-bottom:48px;max-width:440px}
        .section-title em{font-style:italic;font-family:'Source Serif 4',serif;font-weight:400;color:var(--green)}
        .feature-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
        .feature-card{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:24px;transition:border-color 0.2s,transform 0.2s}
        .feature-card:hover{border-color:var(--border-green);transform:translateY(-2px)}
        .feature-icon{width:36px;height:36px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:16px;margin-bottom:14px}
        .feature-card h3{font-size:14px;font-weight:600;margin-bottom:7px}
        .feature-card p{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-mid);line-height:1.7}

        .preview-section{position:relative;z-index:1;max-width:1100px;margin:0 auto 80px;padding:0 40px}
        .preview-frame{background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden}
        .preview-bar{background:var(--card);padding:12px 18px;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--border)}
        .preview-dot{width:10px;height:10px;border-radius:50%}
        .preview-url{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-dim);margin-left:8px}
        .preview-body{padding:24px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
        .mini-card{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:14px}
        .mini-label{font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:7px}
        .mini-val{font-size:1.5rem;font-weight:700;letter-spacing:-0.03em}
        .mini-sub{font-family:'JetBrains Mono',monospace;font-size:9px;margin-top:4px}
        .mini-bar{height:3px;background:var(--border);border-radius:2px;margin-top:10px;overflow:hidden}
        .mini-bar-fill{height:100%;border-radius:2px}
        .preview-bets{grid-column:1/-1;background:var(--card);border:1px solid var(--border);border-radius:8px;padding:14px}
        .bet-row{display:flex;align-items:center;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--border);font-family:'JetBrains Mono',monospace;font-size:11px}
        .bet-row:last-child{border:none}
        .bet-sport{color:var(--text-dim);font-size:9px;text-transform:uppercase;letter-spacing:0.08em}
        .bet-team{color:var(--text);font-size:11px;font-weight:500}
        .bet-result{font-weight:600}

        .waitlist-section{position:relative;z-index:1;max-width:1100px;margin:0 auto 60px;padding:0 40px}
        .waitlist-card{background:var(--surface);border:1px solid var(--border-green);border-radius:12px;padding:56px;position:relative;overflow:hidden}
        .waitlist-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--green),transparent)}
        .waitlist-inner{max-width:480px}
        .waitlist-card h2{font-size:1.8rem;font-weight:700;letter-spacing:-0.03em;margin-bottom:10px}
        .waitlist-card h2 em{font-style:italic;font-family:'Source Serif 4',serif;font-weight:400;color:var(--green)}
        .waitlist-card p{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-mid);line-height:1.8;margin-bottom:24px}
        .input-row{display:flex;gap:10px}
        .email-input{flex:1;background:var(--card);border:1px solid var(--border);border-radius:6px;padding:12px 14px;font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--text);outline:none;transition:border-color 0.2s}
        .email-input:focus{border-color:var(--border-green)}
        .email-input::placeholder{color:var(--text-dim)}

        footer{position:relative;z-index:1;border-top:1px solid var(--border);padding:22px 48px;max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
        .footer-left{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-dim)}
        .footer-left strong{color:var(--green)}
        .footer-right{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-dim)}

        @keyframes fadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        @media(max-width:900px){
          .hero{grid-template-columns:1fr;padding:100px 24px 60px;text-align:center}
          .hero-sub{max-width:100%}
          .cta-row{justify-content:center}
          .orbital-col{order:-1}
          .stats-grid{grid-template-columns:1fr 1fr}
          .feature-grid{grid-template-columns:1fr}
          .preview-body{grid-template-columns:1fr}
          .stats-section,.features-section,.preview-section,.waitlist-section{padding:0 20px}
          .waitlist-card{padding:32px 20px}
          .input-row{flex-direction:column}
          nav{padding:16px 20px}
          .nav-tagline{display:none}
          footer{padding:20px 20px}
        }
      `}</style>

      <WelcomeModal />
      <a href="/governance" style={{position:"fixed",bottom:"24px",right:"24px",zIndex:9000,fontFamily:"JetBrains Mono,monospace",fontSize:"10px",color:"var(--text-dim)",border:"1px solid var(--border)",borderRadius:"20px",padding:"6px 14px",background:"var(--surface)",textDecoration:"none",letterSpacing:"0.08em",transition:"all 0.2s"}} onMouseOver={e=>(e.currentTarget.style.color="var(--green)",e.currentTarget.style.borderColor="var(--border-green)")} onMouseOut={e=>(e.currentTarget.style.color="var(--text-dim)",e.currentTarget.style.borderColor="var(--border)")}>governance</a>
      <div className="glow-orb glow-1" />
      <div className="glow-orb glow-2" />

      <nav>
        <div className="logo">
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
        </div>
        <div className="nav-right">
          <span className="nav-tagline">signal → structure → edge</span>
          <NavActions />
        </div>
      </nav>

      <section className="hero">
        <div className="hero-text">
          <div className="hero-eyebrow">D&amp;A Analytics · Sports Betting · blindspot.bet</div>
          <h1>You&apos;re not losing.<br />You&apos;re <em>not seeing.</em></h1>
          <p className="hero-sub">
            <strong>blindspot.bet</strong> tracks every bet, surfaces every pattern, and shows you exactly where your edge is — and where it isn&apos;t. The house doesn&apos;t have better odds. It has better data.
          </p>
          <div className="cta-row">
            <button className="btn-primary" onClick={()=>document.getElementById('waitlist')?.scrollIntoView({behavior:'smooth'})}>
              Get Started Free
            </button>
            <a href="/how-it-works" className="btn-secondary">See How It Works →</a>
          </div>
        </div>
        <div className="orbital-col">
          <OrbitalHero visible={visible} />
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
          ].flatMap((item,i)=>[
            <div key={`a${i}`} className="ticker-item"><span className="ticker-label">{item.label}</span><span className={`ticker-val ${item.cls}`}>{item.val}</span></div>,
            <div key={`d${i}`} className="ticker-dot"/>,
            <div key={`b${i}`} className="ticker-item"><span className="ticker-label">{item.label}</span><span className={`ticker-val ${item.cls}`}>{item.val}</span></div>,
            <div key={`e${i}`} className="ticker-dot"/>,
          ])}
        </div>
      </div>

      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-num" style={{color:'var(--green)'}}>84%</div><div className="stat-label">of bettors have never tracked a single bet</div><div className="stat-delta" style={{color:'var(--text-dim)'}}>— that&apos;s your edge</div></div>
          <div className="stat-card"><div className="stat-num" style={{color:'var(--green-light)'}}>+6.2%</div><div className="stat-label">avg ROI improvement after 90 days of tracking</div><div className="stat-delta up">↑ vs untracked bettors</div></div>
          <div className="stat-card"><div className="stat-num" style={{color:'var(--neutral)'}}>12</div><div className="stat-label">behavioral patterns that predict long-run losses</div><div className="stat-delta" style={{color:'var(--text-dim)'}}>all trackable from bet logs</div></div>
          <div className="stat-card"><div className="stat-num" style={{color:'var(--red)'}}>$0</div><div className="stat-label">cost to identify your blind spots</div><div className="stat-delta" style={{color:'var(--green)'}}>free tier at launch</div></div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-label">What We Track</div>
        <div className="section-title">Your data.<br /><em>Fully visible.</em></div>
        <div className="feature-grid">
          {[
            {icon:'📊',bg:'#0a2818',title:'Bet Log',desc:'Every bet. Every platform. Moneyline, spread, O/U, props, parlays, live. Log in 3 taps. Review in seconds.'},
            {icon:'🎯',bg:'#0a2818',title:'ROI by Everything',desc:'Sport, bet type, platform, day of week, time of day. Your edge lives in the splits.'},
            {icon:'⚡',bg:'#1a1030',title:'Tilt Detection',desc:'Bet size spikes after losses. Late-night variance. Chase patterns. We flag the behavior before it costs you.'},
            {icon:'💰',bg:'#2A0A0A',title:'Cash-Out Tracker',desc:'Did you leave money on the table or dodge a bullet? Track every early exit and see the pattern over time.'},
            {icon:'📡',bg:'#0a1830',title:'Live Lines',desc:'Real odds from DraftKings, FanDuel, BetMGM and more. Shop lines. Log the best one.'},
            {icon:'🏆',bg:'#0a2818',title:'Parlay Analysis',desc:"Each leg tracked independently. Win rate per leg type. Expected value vs actual. The math doesn't lie."},
          ].map((f,i)=>(
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
            <div className="preview-dot" style={{background:'#EF4444'}}/>
            <div className="preview-dot" style={{background:'#F59E0B'}}/>
            <div className="preview-dot" style={{background:'#22C55E'}}/>
            <div className="preview-url">blindspot.bet/dashboard</div>
          </div>
          <div className="preview-body">
            <div className="mini-card"><div className="mini-label">Season ROI</div><div className="mini-val" style={{color:'var(--green)'}}>+4.8%</div><div className="mini-sub up">↑ +1.2% vs last month</div><div className="mini-bar"><div className="mini-bar-fill" style={{width:'68%',background:'var(--green)'}}/></div></div>
            <div className="mini-card"><div className="mini-label">Win Rate</div><div className="mini-val" style={{color:'var(--green-light)'}}>54.3%</div><div className="mini-sub" style={{color:'var(--text-dim)'}}>Break-even: 52.4%</div><div className="mini-bar"><div className="mini-bar-fill" style={{width:'54%',background:'var(--green-light)'}}/></div></div>
            <div className="mini-card"><div className="mini-label">Blind Spot</div><div className="mini-val" style={{color:'var(--red)',fontSize:'1.1rem'}}>Late Night</div><div className="mini-sub down">-8.2% ROI after 11pm</div><div className="mini-bar"><div className="mini-bar-fill" style={{width:'82%',background:'var(--red)'}}/></div></div>
            <div className="preview-bets">
              <div className="mini-label" style={{marginBottom:'10px'}}>Recent Bets</div>
              {[
                {sport:'NBA · Spread',team:'Lakers -4.5',book:'DraftKings · -110',result:'+$95.45',cls:'up'},
                {sport:'MLB · Moneyline',team:'Yankees ML',book:'FanDuel · -145',result:'-$100.00',cls:'down'},
                {sport:'NCAAB · O/U',team:'Kansas o152.5',book:'BetMGM · -108',result:'+$92.59',cls:'up'},
              ].map((b,i)=>(
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

      <section className="waitlist-section" id="waitlist">
        <div className="waitlist-card">
          <div className="waitlist-inner">
            <h2>Get in. <em>It&apos;s free.</em></h2>
            <p>blindspot.bet is in active development. Free Beta members get free tier for life, priority features, and first look at the behavioral analytics layer.</p>
            <WaitlistForm />
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-left"><strong>blindspot</strong>.bet · D&amp;A Analytics</div>
        <div className="footer-right">
          A <a href="https://www.dropdownlogistics.com" target="_blank" rel="noopener noreferrer" style={{color:'var(--green-light)',textDecoration:'none'}}>Dropdown Logistics</a> product · built by two people who share actual DNA · <a href="/scope" style={{color:'var(--text-dim)',textDecoration:'none'}}>Scope</a>
        </div>
      </footer>
    </>
  );
}
