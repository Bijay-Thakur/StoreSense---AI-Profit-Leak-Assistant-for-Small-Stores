import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as { username?: string; password?: string };
  const ok = body.username === "admin" && body.password === "admin";

  if (!ok) {
    return NextResponse.json({ ok: false, message: "Invalid credentials" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("storesense_auth", "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
