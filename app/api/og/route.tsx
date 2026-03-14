import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div style={{width:'1200px',height:'630px',background:'#0D2137',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'64px 80px',fontFamily:'sans-serif'}}>
        <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
          <div style={{width:'48px',height:'48px',background:'#0a1a2e',borderRadius:'10px',border:'1px solid rgba(34,197,94,0.3)',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <svg width="28" height="28" viewBox="0 0 26 26" fill="none">
              <path d="M9 3C9 3 17 7 17 10.5C17 14 9 16 9 19.5C9 23 17 24 17 24" stroke="#22C55E" stroke-width="2.2" stroke-linecap="round"/>
              <path d="M17 3C17 3 9 7 9 10.5C9 14 17 16 17 19.5C17 23 9 24 9 24" stroke="#86EFAC" stroke-width="2.2" stroke-linecap="round"/>
              <line x1="10" y1="7.5" x2="16" y2="7.5" stroke="#E2E8F0" stroke-width="1.4" stroke-linecap="round"/>
              <line x1="10" y1="13" x2="16" y2="13" stroke="#E2E8F0" stroke-width="1.4" stroke-linecap="round"/>
              <line x1="10" y1="18.5" x2="16" y2="18.5" stroke="#E2E8F0" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </div>
          <div style={{display:'flex',fontSize:'22px',fontWeight:500,color:'#E2E8F0',letterSpacing:'0.05em'}}>
            <span style={{color:'#22C55E'}}>blindspot</span>
            <span>.bet</span>
          </div>
          <div style={{marginLeft:'auto',fontSize:'11px',color:'#2A4A60',letterSpacing:'0.15em',display:'flex'}}>
            D&A ANALYTICS · SIGNAL → STRUCTURE → EDGE
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
          <div style={{display:'flex',flexDirection:'column',fontSize:'72px',fontWeight:700,lineHeight:1.0,letterSpacing:'-0.03em',color:'#E2E8F0'}}>
            <span>You&apos;re not losing.</span>
            <span style={{color:'#22C55E',fontStyle:'italic',fontWeight:400}}>not seeing.</span>
          </div>
          <div style={{display:'flex',fontSize:'18px',color:'#6B8AA0',lineHeight:1.6,maxWidth:'700px'}}>
            Track every bet. Surface every pattern. Find your edge — and your leaks.
          </div>
        </div>

        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',gap:'12px'}}>
            {['Bet Tracking','Tilt Detection','ROI Analytics','Early Access'].map(p => (
              <div key={p} style={{display:'flex',fontSize:'11px',color:'#22C55E',border:'1px solid rgba(34,197,94,0.3)',padding:'6px 16px',borderRadius:'20px',letterSpacing:'0.08em'}}>
                {p}
              </div>
            ))}
          </div>
          <div style={{display:'flex',fontSize:'14px',color:'#2A4A60',letterSpacing:'0.08em'}}>
            blindspot.bet
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}