"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Trash2, X } from "lucide-react";
import type { LeadRow } from "@/lib/leads";

const PAGE_SIZE = 10;

interface LeadsApiResponse {
  leads: LeadRow[];
  total: number;
  totalPages: number;
  page: number;
}

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

function LeadDetailPanel({
  lead,
  onClose,
}: {
  lead: LeadRow;
  onClose: () => void;
}) {
  const tags = parseTags(lead.tags);
  const badge = statusStyle(lead.status);

  return (
    <>
      <motion.button
        type="button"
        aria-label="Close panel"
        className="fixed inset-0 z-40 bg-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.aside
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col bg-white shadow-2xl"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
      >
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ background: "linear-gradient(135deg, #0A3F4A 0%, #0E5D6B 100%)" }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#D3B267" }}>
              Lead #{lead.id}
            </p>
            <h2 className="text-lg font-bold text-white">
              {lead.first_name} {lead.last_name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-white/80 hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize"
              style={{ background: badge.bg, color: badge.color }}
            >
              {lead.status}
            </span>
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

          <dl className="space-y-4 text-sm">
            <div>
              <dt className="font-semibold mb-1" style={{ color: "#64748B" }}>Received</dt>
              <dd style={{ color: "#1A2B2E" }}>{formatDate(lead.created_at)}</dd>
            </div>
            <div>
              <dt className="font-semibold mb-1" style={{ color: "#64748B" }}>Email</dt>
              <dd>
                <a href={`mailto:${lead.email}`} className="hover:underline" style={{ color: "#0E5D6B" }}>
                  {lead.email}
                </a>
              </dd>
            </div>
            {lead.phone && (
              <div>
                <dt className="font-semibold mb-1" style={{ color: "#64748B" }}>Phone</dt>
                <dd>
                  <a href={`tel:${lead.phone}`} style={{ color: "#0E5D6B" }}>
                    {lead.phone}
                  </a>
                </dd>
              </div>
            )}
            <div>
              <dt className="font-semibold mb-1" style={{ color: "#64748B" }}>Source</dt>
              <dd style={{ color: "#1A2B2E" }}>{lead.source}</dd>
            </div>
            {lead.page_url && (
              <div>
                <dt className="font-semibold mb-1" style={{ color: "#64748B" }}>Page</dt>
                <dd className="break-all">
                  <a href={lead.page_url} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "#0E5D6B" }}>
                    {lead.page_url}
                  </a>
                </dd>
              </div>
            )}
            <div>
              <dt className="font-semibold mb-1" style={{ color: "#64748B" }}>Message</dt>
              <dd
                className="rounded-xl px-4 py-3 whitespace-pre-wrap leading-relaxed"
                style={{ background: "#F8FAFC", color: "#374151" }}
              >
                {lead.message || "—"}
              </dd>
            </div>
          </dl>
        </div>
      </motion.aside>
    </>
  );
}

export default function AdminLeadsDashboard() {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [selected, setSelected] = useState<LeadRow | null>(null);

  const fetchLeads = useCallback(async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/leads?page=${pageNum}&limit=${PAGE_SIZE}`);
      if (!res.ok) throw new Error("fetch failed");
      const data = (await res.json()) as LeadsApiResponse;
      setLeads(data.leads);
      setTotal(data.total);
      setTotalPages(data.totalPages);
      setPage(data.page);
    } catch {
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads(page);
  }, [page, fetchLeads]);

  async function handleDelete(e: React.MouseEvent, lead: LeadRow) {
    e.stopPropagation();
    if (!confirm(`Delete lead from ${lead.first_name} ${lead.last_name}?`)) return;

    setDeletingId(lead.id);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("delete failed");
      if (selected?.id === lead.id) setSelected(null);
      const nextPage = leads.length === 1 && page > 1 ? page - 1 : page;
      if (nextPage !== page) setPage(nextPage);
      else fetchLeads(page);
    } catch {
      alert("Could not delete lead. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <>
      <div
        className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl px-5 py-4"
        style={{ background: "#fff", boxShadow: "0 2px 12px rgba(14,93,107,0.06)" }}
      >
        <div>
          <p className="text-2xl font-bold" style={{ color: "#1A2B2E" }}>
            {total}
          </p>
          <p className="text-sm" style={{ color: "#64748B" }}>
            Total leads
          </p>
        </div>
        <p className="text-sm" style={{ color: "#64748B" }}>
          Newest first · click a row for full message
        </p>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "#fff", boxShadow: "0 2px 12px rgba(14,93,107,0.06)" }}
      >
        {loading ? (
          <div className="px-6 py-16 text-center text-sm" style={{ color: "#64748B" }}>
            Loading leads…
          </div>
        ) : leads.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-lg font-semibold mb-2" style={{ color: "#1A2B2E" }}>
              No leads yet
            </p>
            <p className="text-sm" style={{ color: "#64748B" }}>
              Submissions from the contact form will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-xs uppercase tracking-wide" style={{ color: "#64748B" }}>
                    <th className="w-12 px-3 py-3 font-semibold" />
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Contact</th>
                    <th className="px-4 py-3 font-semibold">Source</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Tags</th>
                    <th className="px-4 py-3 font-semibold">Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => {
                    const tags = parseTags(lead.tags);
                    const badge = statusStyle(lead.status);
                    const isDeleting = deletingId === lead.id;

                    return (
                      <tr
                        key={lead.id}
                        onClick={() => setSelected(lead)}
                        className="border-b border-gray-100 align-top cursor-pointer transition-colors hover:bg-gray-50/80"
                      >
                        <td className="px-3 py-4">
                          <button
                            type="button"
                            onClick={(e) => handleDelete(e, lead)}
                            disabled={isDeleting}
                            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                            aria-label={`Delete lead ${lead.first_name} ${lead.last_name}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap" style={{ color: "#64748B" }}>
                          {formatDate(lead.created_at)}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium" style={{ color: "#1A2B2E" }}>
                          {lead.first_name} {lead.last_name}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <span style={{ color: "#0E5D6B" }}>{lead.email}</span>
                          {lead.phone && (
                            <div className="mt-1 text-xs" style={{ color: "#64748B" }}>
                              {lead.phone}
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
                          <div className="flex flex-wrap gap-1.5 max-w-[140px]">
                            {tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md px-2 py-0.5 text-xs font-medium"
                                style={{ background: "#F1F5F9", color: "#475569" }}
                              >
                                {tag}
                              </span>
                            ))}
                            {tags.length > 2 && (
                              <span className="text-xs" style={{ color: "#94A3B8" }}>
                                +{tags.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm max-w-[200px] truncate" style={{ color: "#475569" }}>
                          {lead.message}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div
              className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-4 py-4"
            >
              <p className="text-sm" style={{ color: "#64748B" }}>
                Page {page} of {totalPages} · {total} lead{total === 1 ? "" : "s"}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium disabled:opacity-40"
                  style={{ color: "#374151" }}
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium disabled:opacity-40"
                  style={{ color: "#374151" }}
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <LeadDetailPanel lead={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
