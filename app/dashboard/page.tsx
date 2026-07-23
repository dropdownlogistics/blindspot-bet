import { redirect } from "next/navigation"

// Dashboard offline pending the public-demo rebuild (mock dataset, no auth)
// per DECISION-AUTH-20260723. Redirects to the landing until then.
export default function DashboardPage() {
  redirect("/")
}
