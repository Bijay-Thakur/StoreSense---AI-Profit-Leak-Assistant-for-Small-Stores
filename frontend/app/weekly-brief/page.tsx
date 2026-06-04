"use client";

import { useCallback, useState } from "react";
import { DemoToast } from "../components/demo-toast";
import { HeaderActions } from "../components/header-actions";
import { Card, ScreenHeader } from "../components/ui";
import { formatCurrency } from "@/src/data/helpers";
import { weeklyBrief } from "@/src/data/weeklyBrief";

export default function WeeklyBriefPage() {
  const [toast, setToast] = useState<string | null>(null);
  const dismissToast = useCallback(() => setToast(null), []);
  const b = weeklyBrief;

  return (
    <div className="space-y-4">
      {toast ? <DemoToast message={toast} onDismiss={dismissToast} /> : null}

      <ScreenHeader
        title="Weekly Owner Brief"
        subtitle="Your store's key decisions for the week."
        rightSlot={<HeaderActions />}
      />

      <Card>
        <h2 className="text-sm font-semibold text-[#111827]">Executive summary</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#374151]">{b.executiveSummary}</p>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <p className="text-xs text-[#6B7280]">Weekly sales</p>
          <p className="mt-1 text-lg font-semibold">{formatCurrency(b.kpis.weeklySales)}</p>
        </Card>
        <Card>
          <p className="text-xs text-[#6B7280]">Estimated profit</p>
          <p className="mt-1 text-lg font-semibold text-[#0F8A3B]">{formatCurrency(b.kpis.estimatedProfit)}</p>
        </Card>
        <Card>
          <p className="text-xs text-[#6B7280]">Units sold</p>
          <p className="mt-1 text-lg font-semibold">{b.kpis.unitsSold}</p>
        </Card>
        <Card>
          <p className="text-xs text-[#6B7280]">Open actions</p>
          <p className="mt-1 text-lg font-semibold">{b.kpis.openActions}</p>
        </Card>
      </div>

      <BriefList title="Top wins" items={b.topWins} tone="green" />
      <BriefList title="Profit risks" items={b.profitRisks} tone="orange" />

      <Card>
        <h2 className="text-sm font-semibold">Reorder plan</h2>
        <ul className="mt-2 space-y-2 text-sm text-[#374151]">
          {b.reorderPlan.map((r) => (
            <li key={r.product} className="flex justify-between rounded-2xl bg-[#ECFDF3] px-3 py-2">
              <span>{r.product}</span>
              <span className="font-semibold text-[#0F8A3B]">{r.qty}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="text-sm font-semibold">Invoice reminders</h2>
        <ul className="mt-2 space-y-2 text-xs text-[#374151]">
          {b.invoiceReminders.map((inv) => (
            <li key={inv.vendor} className="rounded-2xl bg-[#FFF7ED] p-3">
              <strong>{inv.vendor}</strong> — {inv.detail} — {formatCurrency(inv.amount)}
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="text-sm font-semibold">Suggested owner actions</h2>
        <ul className="mt-2 space-y-2">
          {b.suggestedActions.map((a) => (
            <li key={a} className="flex items-center gap-2 text-sm text-[#374151]">
              <span className="flex h-5 w-5 items-center justify-center rounded border border-[#0F8A3B] text-[10px] text-[#0F8A3B]">✓</span>
              {a}
            </li>
          ))}
        </ul>
      </Card>

      <button
        type="button"
        className="w-full rounded-2xl bg-[#0F8A3B] py-3 text-sm font-semibold text-white"
        onClick={() => setToast("Export preview generated for demo.")}
      >
        Export Weekly Brief
      </button>
    </div>
  );
}

function BriefList({ title, items, tone }: { title: string; items: string[]; tone: "green" | "orange" }) {
  const bg = tone === "green" ? "bg-[#ECFDF3]" : "bg-[#FFF7ED]";
  return (
    <Card>
      <h2 className="text-sm font-semibold">{title}</h2>
      <ul className="mt-2 space-y-1 text-xs text-[#374151]">
        {items.map((item) => (
          <li key={item} className={`rounded-2xl ${bg} px-3 py-2`}>
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}
