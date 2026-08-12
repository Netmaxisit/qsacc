import { redirect } from "next/navigation";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import AdminLeadsDashboard from "@/components/admin/AdminLeadsDashboard";
import { getSessionUser } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/admin/login");
  }

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
        <AdminLeadsDashboard />
      </main>
    </div>
  );
}
