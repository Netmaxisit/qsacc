import { NextRequest, NextResponse } from "next/server";

const VAPI_PRIVATE_KEY = process.env.VAPI_PRIVATE_KEY!;
const ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!;
const N8N_WEBHOOK = "https://n8n.netmaxiscloud.dpdns.org/webhook/quicksolve-lead";

function extractLead(text: string): Record<string, string> | null {
  const match = text.match(/\[LEAD:([^\]]+)\]/s);
  if (!match) return null;
  const raw = match[1];
  // Extract key:value pairs via regex — handles malformed JSON from the model
  const lead: Record<string, string> = {};
  const pairs = raw.matchAll(/"?(\w+)"?\s*[":]+\s*"([^"]+)"/g);
  for (const [, key, value] of pairs) {
    lead[key] = value;
  }
  return Object.keys(lead).length > 0 ? lead : null;
}

async function fireLead(lead: Record<string, string>, conversationSnippet: string) {
  try {
    await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        source: "Website Chat",
        message: conversationSnippet,
        timestamp: new Date().toLocaleString("en-GB", { timeZone: "Europe/London" }),
      }),
    });
  } catch {
    // non-blocking — don't fail the chat response if webhook errors
  }
}

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const res = await fetch("https://api.vapi.ai/chat", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${VAPI_PRIVATE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      assistantId: ASSISTANT_ID,
      input: messages,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Chat request failed" }, { status: 500 });
  }

  const data = await res.json();
  const rawReply: string = data.output?.[0]?.content ?? "Sorry, I couldn't get a response. Please try again.";

  // Extract and strip the lead marker from the reply shown to user
  const lead = extractLead(rawReply);
  const cleanReply = rawReply.replace(/\[LEAD:[^\]]*\]/s, "").trim();

  if (lead) {
    // Build a short conversation snippet for context
    const lastUserMsg = [...messages].reverse().find((m: { role: string }) => m.role === "user")?.content ?? "";
    await fireLead(lead, lastUserMsg);
  }

  return NextResponse.json({ reply: cleanReply, leadCaptured: !!lead });
}
