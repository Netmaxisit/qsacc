import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { clearSessionCookieOptions, deleteSession, SESSION_COOKIE } from "@/lib/auth";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    await deleteSession(token);
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(clearSessionCookieOptions());
  return res;
}
