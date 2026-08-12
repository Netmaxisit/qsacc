import type { D1Database } from "@cloudflare/workers-types";
import { getDb } from "@/lib/db";

export type LeadStatus = "new" | "contacted" | "qualified" | "won" | "lost";

export interface CreateLeadInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message?: string;
  source?: string;
  tags?: string[];
  pageUrl?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

export interface LeadRow {
  id: number;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  message: string | null;
  source: string;
  tags: string;
  status: LeadStatus;
  page_url: string | null;
  user_agent: string | null;
  metadata: string;
}

export async function insertLead(
  input: CreateLeadInput,
  db?: D1Database
): Promise<number> {
  const database = db ?? (await getDb());
  const tags = JSON.stringify(input.tags ?? ["website"]);
  const metadata = JSON.stringify(input.metadata ?? {});

  const result = await database
    .prepare(
      `INSERT INTO leads (
        first_name, last_name, email, phone, message,
        source, tags, page_url, user_agent, metadata
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      input.firstName.trim(),
      input.lastName.trim(),
      input.email.trim().toLowerCase(),
      input.phone?.trim() || null,
      input.message?.trim() || null,
      input.source?.trim() || "website",
      tags,
      input.pageUrl?.trim() || null,
      input.userAgent?.trim() || null,
      metadata
    )
    .run();

  return Number(result.meta.last_row_id);
}
