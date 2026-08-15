import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { name, message } = (body as { name?: unknown; message?: unknown }) ?? {};

  if (typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toEmail) {
    // Not configured yet. Fail quietly — the page never shows her an error,
    // it only ever says "Thank you." See README for setup.
    return NextResponse.json({ ok: false, error: "not_configured" });
  }

  const safeName = typeof name === "string" && name.trim() ? name.trim() : "Someone";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "hapines_f <onboarding@resend.dev>",
        to: [toEmail],
        subject: `hapines_f — a message from ${safeName}`,
        text: message,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ ok: false, error: "send_failed" });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "send_failed" });
  }
}
