import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { countLeads, listLeadsPaginated } from "@/lib/leads";

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { searchParams } = req.nextUrl;
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.min(
    MAX_LIMIT,
    Math.max(1, Number(searchParams.get("limit")) || DEFAULT_LIMIT)
  );

  const [leads, total] = await Promise.all([
    listLeadsPaginated(page, limit),
    countLeads(),
  ]);

  return NextResponse.json({
    leads,
    user,
    page,
    limit,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  });
}
