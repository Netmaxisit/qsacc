"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors"
      style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}
    >
      <LogOut size={16} />
      Sign out
    </button>
  );
}
