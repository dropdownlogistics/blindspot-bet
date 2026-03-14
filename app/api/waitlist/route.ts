import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "onboarding@resend.dev",
      to: ["dkitchens31@gmail.com"],
      subject: "New Waitlist Signup - blindspot.bet",
      html: `<p><strong>New signup:</strong> ${email}</p><p>signal to structure to edge</p>`,
    }),
  });

  const data = await res.json();
  console.log("Resend response:", JSON.stringify(data));

  if (!res.ok) {
    return NextResponse.json({ error: "Failed", detail: data }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
