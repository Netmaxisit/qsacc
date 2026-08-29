export interface LeadNtfyInput {
  leadId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  source: string;
}

export async function sendLeadNtfy(input: LeadNtfyInput): Promise<boolean> {
  const baseUrl = process.env.NTFY_BASE_URL?.replace(/\/$/, "");
  const topic = process.env.NTFY_TOPIC;
  const token = process.env.NTFY_TOKEN;

  if (!baseUrl || !topic || !token) {
    return false;
  }

  const name = `${input.firstName} ${input.lastName}`.trim();
  const preview =
    input.message.length > 160 ? `${input.message.slice(0, 157)}…` : input.message;

  const body = [
    `Email: ${input.email}`,
    input.phone ? `Phone: ${input.phone}` : null,
    `Source: ${input.source}`,
    "",
    preview,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(`${baseUrl}/${encodeURIComponent(topic)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Title: `New lead #${input.leadId}: ${name}`,
      Tags: "bell,mailbox",
      Priority: "4",
    },
    body,
  });

  if (!res.ok) {
    console.error("ntfy publish failed:", res.status, await res.text());
  }

  return res.ok;
}
