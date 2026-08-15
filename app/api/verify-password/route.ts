import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { password } = (body as { password?: unknown }) ?? {};
  const correctPassword = process.env.SITE_PASSWORD;

  if (!correctPassword) {
    // The site owner hasn't set SITE_PASSWORD yet.
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 500 }
    );
  }

  const ok = typeof password === "string" && password === correctPassword;
  return NextResponse.json({ ok });
}
