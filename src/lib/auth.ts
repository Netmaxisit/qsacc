import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import type { D1Database } from "@cloudflare/workers-types";
import { getDb } from "@/lib/db";

export const SESSION_COOKIE = "qsacc_session";
const SESSION_DAYS = 7;

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

function sessionExpiry(): string {
  const d = new Date();
  d.setDate(d.getDate() + SESSION_DAYS);
  return d.toISOString();
}

function newToken(): string {
  return crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "");
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  passwordHash: string
): Promise<boolean> {
  return bcrypt.compare(password, passwordHash);
}

export async function findUserByEmail(
  email: string,
  db?: D1Database
): Promise<(AdminUser & { password_hash: string }) | null> {
  const database = db ?? (await getDb());
  const row = await database
    .prepare(
      `SELECT id, email, name, role, password_hash FROM users WHERE email = ? COLLATE NOCASE`
    )
    .bind(email.trim().toLowerCase())
    .first<AdminUser & { password_hash: string }>();
  return row ?? null;
}

export async function createSession(
  userId: number,
  db?: D1Database
): Promise<string> {
  const database = db ?? (await getDb());
  const token = newToken();
  await database
    .prepare(
      `INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)`
    )
    .bind(userId, token, sessionExpiry())
    .run();
  return token;
}

export async function getSessionUser(
  db?: D1Database
): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const database = db ?? (await getDb());
  const row = await database
    .prepare(
      `SELECT u.id, u.email, u.name, u.role
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND datetime(s.expires_at) > datetime('now')`
    )
    .bind(token)
    .first<AdminUser>();

  return row ?? null;
}

export async function deleteSession(token: string, db?: D1Database): Promise<void> {
  const database = db ?? (await getDb());
  await database.prepare(`DELETE FROM sessions WHERE token = ?`).bind(token).run();
}

export function sessionCookieOptions(token: string) {
  return {
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  };
}

export function clearSessionCookieOptions() {
  return {
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}
