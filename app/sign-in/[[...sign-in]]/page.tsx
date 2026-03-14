import { SignIn } from '@clerk/nextjs'

const appearance = {
  variables: {
    colorPrimary: '#22C55E',
    colorBackground: '#0f2237',
    colorInputBackground: '#0D2137',
    colorInputText: '#E2E8F0',
    colorText: '#E2E8F0',
    colorTextSecondary: '#6B8AA0',
    colorNeutral: '#1A3048',
    borderRadius: '6px',
    fontFamily: 'Space Grotesk, sans-serif',
  },
  elements: {
    card: { background: '#0f2237', border: '1px solid #1A3048', boxShadow: '0 0 40px rgba(34,197,94,0.05)' },
    headerTitle: { color: '#E2E8F0', fontWeight: '700' },
    headerSubtitle: { color: '#6B8AA0' },
    formButtonPrimary: { background: '#22C55E', color: '#0D2137', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase' },
    footerActionLink: { color: '#22C55E' },
    identityPreviewText: { color: '#E2E8F0' },
    formFieldLabel: { color: '#6B8AA0' },
    dividerLine: { background: '#1A3048' },
    dividerText: { color: '#2A4A60' },
    socialButtonsBlockButton: { background: '#0D2137', border: '1px solid #1A3048', color: '#E2E8F0' },
    socialButtonsBlockButtonText: { color: '#E2E8F0' },
    footer: { background: '#0a1a2e', borderTop: '1px solid #1A3048' },
  }
}

export default function SignInPage() {
  return (
    <div style={{minHeight:'100vh',background:'#0D2137',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'24px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'8px'}}>
        <div style={{width:'32px',height:'32px',background:'#0f2237',borderRadius:'7px',border:'1px solid #22C55E30',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <svg width="18" height="18" viewBox="0 0 26 26" fill="none">
            <path d="M9 3C9 3 17 7 17 10.5C17 14 9 16 9 19.5C9 23 17 24 17 24" stroke="#22C55E" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M17 3C17 3 9 7 9 10.5C9 14 17 16 17 19.5C17 23 9 24 9 24" stroke="#86EFAC" strokeWidth="2.2" strokeLinecap="round"/>
            <line x1="10" y1="7.5" x2="16" y2="7.5" stroke="#E2E8F0" strokeWidth="1.4" strokeLinecap="round"/>
            <line x1="10" y1="13" x2="16" y2="13" stroke="#E2E8F0" strokeWidth="1.4" strokeLinecap="round"/>
            <line x1="10" y1="18.5" x2="16" y2="18.5" stroke="#E2E8F0" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </div>
        <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'14px',fontWeight:'500',letterSpacing:'0.05em',color:'#E2E8F0'}}><strong style={{color:'#22C55E'}}>blindspot</strong>.bet</span>
      </div>
      <SignIn appearance={appearance} />
    </div>
  )
}