import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer `,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "blindspot.bet <onboarding@resend.dev>",
      to: ["dropdownlogistics@gmail.com"],
      subject: "New Waitlist Signup — blindspot.bet",
      html: `<p><strong>New signup:</strong> </p><p>signal → structure → edge</p>`,
      reply_to: email,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
