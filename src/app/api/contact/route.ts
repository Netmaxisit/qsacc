import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";
import { insertLead } from "@/lib/leads";
import { sendLeadNtfy } from "@/lib/ntfy";

interface ContactBody {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  message?: string;
  source?: string;
  tags?: string[];
  pageUrl?: string;
}

function parseBody(body: ContactBody) {
  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!firstName || !lastName || !email || !message) {
    return { error: "missing_fields" as const };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "invalid_email" as const };
  }

  return {
    data: {
      firstName,
      lastName,
      email,
      phone,
      message,
      source: body.source?.trim() || "contact_page",
      tags: body.tags ?? ["website", "contact"],
      pageUrl: body.pageUrl?.trim(),
    },
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactBody;
    const parsed = parseBody(body);

    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const { data } = parsed;
    const userAgent = req.headers.get("user-agent") ?? undefined;
    const pageUrl =
      data.pageUrl ||
      req.headers.get("referer") ||
      undefined;

    const leadId = await insertLead({
      ...data,
      userAgent,
      pageUrl,
      metadata: {
        submittedAt: new Date().toISOString(),
      },
    });

    const { ctx } = await getCloudflareContext({ async: true });
    ctx.waitUntil(
      sendLeadNtfy({
        leadId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        message: data.message,
        source: data.source,
      }).catch(() => false)
    );

    return NextResponse.json({ success: true, leadId });
  } catch (err) {
    console.error("contact POST failed:", err);
    return NextResponse.json({ error: "save_failed" }, { status: 500 });
  }
}
