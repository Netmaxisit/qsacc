import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK = "https://n8n.netmaxiscloud.dpdns.org/webhook/contact-form";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const n8nRes = await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!n8nRes.ok) {
      return NextResponse.json({ error: "upstream_error" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "fetch_failed" }, { status: 502 });
  }
}
