import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Quicksolve Accountants",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen" style={{ background: "#F8FAFC" }}>{children}</div>;
}
