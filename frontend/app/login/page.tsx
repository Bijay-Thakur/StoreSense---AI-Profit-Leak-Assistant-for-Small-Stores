"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        setError("Invalid credentials. Use admin / admin.");
        setBusy(false);
        return;
      }
      router.replace("/");
      router.refresh();
    } catch {
      setError("Login failed. Please try again.");
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gradient-to-b from-[#F8FAFC] to-[#ECFDF3] px-4">
      <div className="w-full max-w-md rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm md:p-8">
        <div className="mb-5 text-center">
          <h1 className="text-2xl font-semibold text-[#111827]">StoreSense Login</h1>
          <p className="mt-1 text-sm text-[#6B7280]">Sign in to view your sales, invoices, and alerts.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-[#6B7280]">Username</label>
            <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] px-3 py-2">
              <User className="h-4 w-4 text-[#9CA3AF]" />
              <input
                className="w-full bg-transparent text-sm outline-none"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-[#6B7280]">Password</label>
            <div className="flex items-center gap-2 rounded-2xl border border-[#E5E7EB] px-3 py-2">
              <Lock className="h-4 w-4 text-[#9CA3AF]" />
              <input
                type="password"
                className="w-full bg-transparent text-sm outline-none"
                placeholder="admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error ? <p className="rounded-xl bg-[#FEF2F2] px-3 py-2 text-xs text-[#B91C1C]">{error}</p> : null}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-2xl bg-[#0F8A3B] py-3 text-sm font-semibold text-white disabled:opacity-70"
          >
            {busy ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-[#6B7280]">Default credentials: username <b>admin</b> and password <b>admin</b>.</p>
      </div>
    </div>
  );
}
