export default function ParlaysPage() {
  return (
    <div style={{minHeight:"100vh",backgroundColor:"#0D2137",fontFamily:"'Space Grotesk',sans-serif",color:"#E2E8F0",display:"flex",flexDirection:"column" as const}}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .leg { animation: fadeUp 0.5s ease forwards; opacity: 0; }
        .leg:nth-child(1){animation-delay:0.1s} .leg:nth-child(2){animation-delay:0.2s}
        .leg:nth-child(3){animation-delay:0.3s} .leg:nth-child(4){animation-delay:0.4s}
        .leg:nth-child(5){animation-delay:0.5s} .leg:nth-child(6){animation-delay:0.6s}
      `}</style>

      <nav style={{padding:"20px 40px",borderBottom:"1px solid #1A3048",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <a href="/" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"14px",fontWeight:500,color:"#E2E8F0",textDecoration:"none",letterSpacing:"0.05em"}}>
          <strong style={{color:"#22C55E"}}>blindspot</strong>.bet
        </a>
        <a href="/dashboard" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",color:"#22C55E",border:"1px solid #22C55E30",padding:"6px 16px",borderRadius:"20px",letterSpacing:"0.08em",textDecoration:"none",textTransform:"uppercase" as const}}>Dashboard</a>
      </nav>

      <div style={{flex:1,display:"flex",flexDirection:"column" as const,alignItems:"center",justifyContent:"center",padding:"80px 40px",textAlign:"center" as const}}>

        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",color:"#22C55E",letterSpacing:"0.15em",textTransform:"uppercase" as const,marginBottom:"20px"}}>
          Coming Soon
        </div>

        <h1 style={{fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:800,letterSpacing:"-0.03em",lineHeight:1.1,marginBottom:"20px",maxWidth:"700px"}}>
          Parlay Tracker.<br/>
          <span style={{fontFamily:"'Source Serif 4',serif",fontStyle:"italic",fontWeight:400,color:"#86EFAC"}}>Every leg. Visible.</span>
        </h1>

        <p style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"13px",color:"#6B8AA0",maxWidth:"480px",lineHeight:1.8,marginBottom:"48px"}}>
          Log every leg independently. Track which ones hit, which ones kill you, and what your optimal leg count actually is. The math does not lie.
        </p>

        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"12px",maxWidth:"600px",width:"100%",marginBottom:"56px"}}>
          {[
            {label:"Leg Tracking",desc:"Every leg logged independently"},
            {label:"Hit Rate by Type",desc:"Spread vs ML vs O/U by sport"},
            {label:"Optimal Leg Count",desc:"Where your edge actually lives"},
            {label:"EV Analysis",desc:"Expected vs actual by leg"},
            {label:"Killer Leg ID",desc:"Which legs end your slips"},
            {label:"Parlay History",desc:"Full log, searchable"},
          ].map((f,i) => (
            <div key={i} className="leg" style={{backgroundColor:"#0a1a2e",border:"1px solid #1A3048",borderRadius:"8px",padding:"16px"}}>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",color:"#22C55E",letterSpacing:"0.08em",textTransform:"uppercase" as const,marginBottom:"6px"}}>{f.label}</div>
              <div style={{fontSize:"11px",color:"#6B8AA0",lineHeight:1.5}}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{backgroundColor:"#0a1a2e",border:"1px solid #22C55E30",borderRadius:"12px",padding:"32px 40px",maxWidth:"480px",width:"100%",marginBottom:"32px",position:"relative" as const,overflow:"hidden"}}>
          <div style={{position:"absolute" as const,top:0,left:0,right:0,height:"1px",background:"linear-gradient(90deg,transparent,#22C55E,transparent)"}}/>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",color:"#22C55E",letterSpacing:"0.1em",textTransform:"uppercase" as const,marginBottom:"10px"}}>Kyle's Problem</div>
          <div style={{fontSize:"1.1rem",fontWeight:600,letterSpacing:"-0.02em",marginBottom:"8px"}}>
            "My weakness is 20-25 leg parlays."
          </div>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"11px",color:"#6B8AA0"}}>
            That is not a weakness. That is a dataset waiting to happen.
          </div>
        </div>

        <a href="/dashboard" style={{display:"inline-block",background:"#22C55E",color:"#0D2137",fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:"13px",padding:"12px 32px",borderRadius:"8px",textDecoration:"none",letterSpacing:"0.02em"}}>
          Start Logging Bets Now
        </a>

        <div style={{marginTop:"16px",fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",color:"#2A4A60"}}>
          Parlay tracking ships when single-bet tracking is tight. Stay logged in.
        </div>

      </div>

      <footer style={{padding:"24px 40px",borderTop:"1px solid #1A3048",textAlign:"center" as const,fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",color:"#2A4A60"}}>
        blindspot.bet · D&A Analytics · A Dropdown Logistics product
      </footer>
    </div>
  )
}