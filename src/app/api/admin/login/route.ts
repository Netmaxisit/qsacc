import { NextRequest, NextResponse } from "next/server";
import {
  createSession,
  findUserByEmail,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { email?: string; password?: string };
    const email = body.email?.trim() ?? "";
    const password = body.password ?? "";

    if (!email || !password) {
      return NextResponse.json({ error: "missing_credentials" }, { status: 400 });
    }

    const user = await findUserByEmail(email);
    if (!user || !(await verifyPassword(password, user.password_hash))) {
      return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
    }

    const token = await createSession(user.id);
    const res = NextResponse.json({
      success: true,
      user: { email: user.email, name: user.name },
    });
    res.cookies.set(sessionCookieOptions(token));
    return res;
  } catch (err) {
    console.error("admin login failed:", err);
    return NextResponse.json({ error: "login_failed" }, { status: 500 });
  }
}
