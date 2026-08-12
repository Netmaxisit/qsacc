import { redirect } from "next/navigation";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import { getSessionUser } from "@/lib/auth";
import { listLeads, type LeadRow } from "@/lib/leads";

function parseTags(tags: string): string[] {
  try {
    const parsed = JSON.parse(tags);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusStyle(status: string) {
  switch (status) {
    case "contacted":
      return { bg: "#EFF6FF", color: "#1D4ED8" };
    case "qualified":
      return { bg: "#FEF3C7", color: "#B45309" };
    case "won":
      return { bg: "#DCFCE7", color: "#15803D" };
    case "lost":
      return { bg: "#F3F4F6", color: "#6B7280" };
    default:
      return { bg: "rgba(14,93,107,0.1)", color: "#0E5D6B" };
  }
}

function LeadTableRow({ lead }: { lead: LeadRow }) {
  const tags = parseTags(lead.tags);
  const badge = statusStyle(lead.status);

  return (
    <tr className="border-b border-gray-100 align-top hover:bg-gray-50/80">
      <td className="px-4 py-4 text-sm whitespace-nowrap" style={{ color: "#64748B" }}>
        {formatDate(lead.created_at)}
      </td>
      <td className="px-4 py-4 text-sm font-medium" style={{ color: "#1A2B2E" }}>
        {lead.first_name} {lead.last_name}
      </td>
      <td className="px-4 py-4 text-sm">
        <a href={`mailto:${lead.email}`} className="hover:underline" style={{ color: "#0E5D6B" }}>
          {lead.email}
        </a>
        {lead.phone && (
          <div className="mt-1">
            <a href={`tel:${lead.phone}`} className="text-xs" style={{ color: "#64748B" }}>
              {lead.phone}
            </a>
          </div>
        )}
      </td>
      <td className="px-4 py-4 text-sm" style={{ color: "#475569" }}>
        {lead.source}
      </td>
      <td className="px-4 py-4">
        <span
          className="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize"
          style={{ background: badge.bg, color: badge.color }}
        >
          {lead.status}
        </span>
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-wrap gap-1.5 max-w-[180px]">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md px-2 py-0.5 text-xs font-medium"
              style={{ background: "#F1F5F9", color: "#475569" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </td>
      <td className="px-4 py-4 text-sm max-w-xs" style={{ color: "#475569" }}>
        <p className="line-clamp-3">{lead.message}</p>
      </td>
    </tr>
  );
}

export default async function AdminDashboardPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/admin/login");
  }

  const leads = await listLeads();

  return (
    <div className="min-h-screen">
      <header
        className="px-4 sm:px-6 lg:px-8 py-5"
        style={{ background: "linear-gradient(135deg, #0A3F4A 0%, #0E5D6B 100%)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#D3B267" }}>
              QuickSolve CRM
            </p>
            <h1 className="text-xl md:text-2xl font-bold text-white">Leads dashboard</h1>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>
              Signed in as {user.name} ({user.email})
            </p>
          </div>
          <AdminLogoutButton />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl px-5 py-4"
          style={{ background: "#fff", boxShadow: "0 2px 12px rgba(14,93,107,0.06)" }}
        >
          <div>
            <p className="text-2xl font-bold" style={{ color: "#1A2B2E" }}>
              {leads.length}
            </p>
            <p className="text-sm" style={{ color: "#64748B" }}>
              Total leads
            </p>
          </div>
          <p className="text-sm" style={{ color: "#64748B" }}>
            Newest first · from website contact form
          </p>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "#fff", boxShadow: "0 2px 12px rgba(14,93,107,0.06)" }}
        >
          {leads.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-lg font-semibold mb-2" style={{ color: "#1A2B2E" }}>
                No leads yet
              </p>
              <p className="text-sm" style={{ color: "#64748B" }}>
                Submissions from the contact form will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px] text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-xs uppercase tracking-wide" style={{ color: "#64748B" }}>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Contact</th>
                    <th className="px-4 py-3 font-semibold">Source</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Tags</th>
                    <th className="px-4 py-3 font-semibold">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <LeadTableRow key={lead.id} lead={lead} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
