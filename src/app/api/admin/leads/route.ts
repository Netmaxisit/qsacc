import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { listLeads } from "@/lib/leads";

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const leads = await listLeads();
  return NextResponse.json({ leads, user });
}
