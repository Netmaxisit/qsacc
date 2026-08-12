#!/usr/bin/env node
/**
 * Create or update the admin user in remote D1.
 * Reads ADMIN_EMAIL and ADMIN_PASSWORD from .env (never commit .env).
 */
import { readFileSync, existsSync, writeFileSync, unlinkSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";
import bcrypt from "bcryptjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const envPath = resolve(root, ".env");

function loadEnv() {
  if (!existsSync(envPath)) {
    console.error("Missing .env — add ADMIN_EMAIL and ADMIN_PASSWORD.");
    process.exit(1);
  }
  const vars = {};
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    vars[key] = val;
  }
  return vars;
}

const env = loadEnv();
const email = (env.ADMIN_EMAIL || "").trim().toLowerCase();
const password = env.ADMIN_PASSWORD || "";
const name = (env.ADMIN_NAME || "Admin").trim();

if (!email || !password) {
  console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env");
  process.exit(1);
}

if (password.length < 10) {
  console.error("ADMIN_PASSWORD must be at least 10 characters.");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
const sql = `INSERT INTO users (email, password_hash, name, role)
VALUES ('${email.replace(/'/g, "''")}', '${hash.replace(/'/g, "''")}', '${name.replace(/'/g, "''")}', 'admin')
ON CONFLICT(email) DO UPDATE SET
  password_hash = excluded.password_hash,
  name = excluded.name,
  updated_at = datetime('now');`;

const tmp = resolve(root, ".admin-seed.sql");
writeFileSync(tmp, sql);

try {
  execFileSync(
    "npx",
    ["wrangler", "d1", "execute", "qsacc", "--remote", `--file=${tmp}`],
    { cwd: root, stdio: "inherit", env: process.env }
  );
  console.log(`Admin user ready: ${email}`);
} finally {
  unlinkSync(tmp);
}
