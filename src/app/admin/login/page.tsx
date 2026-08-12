import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div
        className="w-full max-w-md rounded-3xl p-8 md:p-10"
        style={{ background: "#fff", boxShadow: "0 4px 32px rgba(14,93,107,0.08)" }}
      >
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#0E5D6B" }}>
            QuickSolve CRM
          </p>
          <h1 className="text-2xl font-bold" style={{ color: "#1A2B2E" }}>
            Admin sign in
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#64748B" }}>
            View and manage website leads.
          </p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}
