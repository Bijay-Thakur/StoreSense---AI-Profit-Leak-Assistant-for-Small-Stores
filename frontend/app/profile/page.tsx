"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { AnalystConsultationCard } from "../components/analyst-consultation-card";
import { Card, ScreenHeader } from "../components/ui";
import { DemoToast } from "../components/demo-toast";
import { HeaderActions } from "../components/header-actions";
import { PlanBadge } from "../components/plan-badge";
import { PlanCard } from "../components/plan-card";
import { usePlan } from "../components/plan-provider";
import { SettingsRow } from "../components/settings-row";
import { StoreProfileCard } from "../components/store-profile-card";
import { storeProfile } from "@/src/data/storeProfile";

export default function ProfilePage() {
  const { plan, setPlan } = usePlan();
  const [toast, setToast] = useState<string | null>(null);
  const dismissToast = useCallback(() => setToast(null), []);
  const [notifications, setNotifications] = useState(true);
  const [invoiceReminders, setInvoiceReminders] = useState(true);
  const [posSync, setPosSync] = useState(true);

  function selectPro() {
    if (plan === "free") {
      setToast("Pro Plan preview enabled for demo.");
    }
    setPlan("pro");
  }

  function selectFree() {
    setPlan("free");
  }

  return (
    <div className="space-y-4">
      {toast ? <DemoToast message={toast} onDismiss={dismissToast} /> : null}

      <ScreenHeader
        title="Profile & settings"
        subtitle="Store details, plan, and preferences."
        rightSlot={<HeaderActions />}
      />

      <StoreProfileCard profile={storeProfile} />

      <Card>
        <h2 className="text-base font-semibold text-[#111827]">Current plan</h2>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <PlanBadge plan={plan} />
          {plan === "free" ? (
            <span className="rounded-full bg-[#F3F4F6] px-2 py-0.5 text-[10px] font-medium text-[#6B7280]">Operations focus</span>
          ) : (
            <span className="rounded-full bg-[#ECFDF3] px-2 py-0.5 text-[10px] font-medium text-[#0F8A3B]">Market intelligence</span>
          )}
        </div>
        <p className="mt-3 text-sm text-[#6B7280]">
          {plan === "free"
            ? "Free Plan helps you run the store day to day: POS sales, inventory, reorders, invoices, and profit-leak alerts."
            : "Pro Plan adds nearby price context, competitor benchmarks, and optional analyst consultation — all demo data here."}
        </p>
        {plan === "free" ? (
          <button
            type="button"
            className="mt-4 w-full rounded-2xl bg-[#0F8A3B] py-3 text-sm font-semibold text-white"
            onClick={selectPro}
          >
            Switch to Pro
          </button>
        ) : (
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link
              href="/market"
              className="flex flex-1 items-center justify-center rounded-2xl bg-[#0F8A3B] py-3 text-center text-sm font-semibold text-white"
            >
              Open Market Benchmark
            </Link>
            <button
              type="button"
              className="flex-1 rounded-2xl border border-[#E5E7EB] py-3 text-sm font-semibold text-[#374151]"
              onClick={selectFree}
            >
              Switch to Free
            </button>
          </div>
        )}
      </Card>

      <div>
        <h2 className="mb-2 text-sm font-semibold text-[#111827]">Select plan</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <PlanCard tier="free" selected={plan === "free"} current={plan === "free"} onSelect={selectFree} />
          <PlanCard tier="pro" selected={plan === "pro"} current={plan === "pro"} recommended onSelect={selectPro} />
        </div>
        <p className="mt-2 text-xs text-[#9CA3AF]">No checkout — &quot;Pro&quot; is a demo preview only.</p>
      </div>

      <Card>
        <h2 className="text-base font-semibold text-[#111827]">Settings</h2>
        <p className="mt-1 text-xs text-[#6B7280]">Local demo toggles — not synced to a server.</p>
        <div className="mt-2">
          <SettingsRow label="Notifications" value={notifications ? "On" : "Off"} active={notifications} onToggle={() => setNotifications((v) => !v)} />
          <SettingsRow
            label="48-hour invoice reminders"
            value={invoiceReminders ? "On" : "Off"}
            active={invoiceReminders}
            onToggle={() => setInvoiceReminders((v) => !v)}
          />
          <SettingsRow label="POS auto-sync" value={posSync ? "On" : "Off"} active={posSync} onToggle={() => setPosSync((v) => !v)} />
          <SettingsRow label="Currency" value="USD" />
          <SettingsRow label="Store location" value="Queens, NY" />
        </div>
      </Card>

      <AnalystConsultationCard />
    </div>
  );
}
