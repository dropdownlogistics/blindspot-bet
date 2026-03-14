import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div style={{minHeight:'100vh',background:'#0D2137',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <SignIn />
    </div>
  )
}