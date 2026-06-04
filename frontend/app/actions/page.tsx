"use client";

import Link from "next/link";
import { useState } from "react";
import { HeaderActions } from "../components/header-actions";
import { Badge, Card, ScreenHeader } from "../components/ui";
import {
  actionFilters,
  actionSummary,
  filterActions,
  storeActions,
  type ActionType,
  type StoreAction,
} from "@/src/data/actionCenter";

const typeTone: Record<ActionType, "green" | "orange" | "red" | "blue" | "gray"> = {
  Reorder: "green",
  Reprice: "orange",
  Invoice: "blue",
  "Cost Match": "blue",
  "Do Not Reorder": "red",
  Vendor: "gray",
};

const statusAfterCta: Record<string, string> = {
  "Mark Planned": "Planned",
  "Simulate Price": "Accepted",
  "View Invoice": "Reviewed",
  "Mark Reviewed": "Reviewed",
  "View Vendor": "Reviewed",
  "Open Cost Match Center": "Reviewed",
};

export default function ActionCenterPage() {
  const [filter, setFilter] = useState<(typeof actionFilters)[number]>("All");
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const visible = filterActions(storeActions, filter);

  function handleCta(action: StoreAction) {
    const next = statusAfterCta[action.cta] ?? "Done";
    setStatuses((s) => ({ ...s, [action.id]: next }));
  }

  return (
    <div className="space-y-4">
      <ScreenHeader
        title="Action Center"
        subtitle="Your highest-impact store decisions in one place."
        rightSlot={<HeaderActions />}
      />

      <p className="text-xs text-[#6B7280]">Built for small stores that cannot afford a full-time analyst.</p>

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <p className="text-xs text-[#6B7280]">Open actions</p>
          <p className="mt-1 text-xl font-semibold">{actionSummary.openActions}</p>
        </Card>
        <Card>
          <p className="text-xs text-[#6B7280]">High priority</p>
          <p className="mt-1 text-xl font-semibold text-[#DC2626]">{actionSummary.highPriority}</p>
        </Card>
        <Card>
          <p className="text-xs text-[#6B7280]">Est. profit impact</p>
          <p className="mt-1 text-xl font-semibold text-[#0F8A3B]">{actionSummary.profitImpact}</p>
        </Card>
        <Card>
          <p className="text-xs text-[#6B7280]">Invoices due</p>
          <p className="mt-1 text-xl font-semibold">{actionSummary.invoicesDue}</p>
        </Card>
      </div>

      <div className="flex flex-wrap gap-2">
        {actionFilters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium ${
              filter === f ? "bg-[#0F8A3B] text-white" : "border border-[#E5E7EB] bg-white text-[#374151]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {visible.map((action) => (
          <ActionCard key={action.id} action={action} status={statuses[action.id]} onCta={() => handleCta(action)} />
        ))}
      </div>

      <Card className="bg-[#F8FAFC]">
        <h2 className="text-sm font-semibold text-[#111827]">More decisions</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link href="/products" className="rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-xs font-medium text-[#374151] hover:border-[#0F8A3B]/40">
            Full reorder plan
          </Link>
          <Link href="/weekly-brief" className="rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-xs font-medium text-[#374151] hover:border-[#0F8A3B]/40">
            Weekly owner brief
          </Link>
          <Link href="/import-pos" className="rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-xs font-medium text-[#374151] hover:border-[#0F8A3B]/40">
            Import POS report
          </Link>
        </div>
      </Card>
    </div>
  );
}

function ActionCard({
  action,
  status,
  onCta,
}: {
  action: StoreAction;
  status?: string;
  onCta: () => void;
}) {
  const ctaClass =
    "mt-3 flex w-full items-center justify-center rounded-2xl bg-[#0F8A3B] py-2.5 text-sm font-semibold text-white";

  return (
    <Card>
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-sm font-semibold text-[#111827]">{action.title}</h3>
        <Badge text={action.type} tone={typeTone[action.type]} />
        <Badge text={action.priority} tone={action.priority === "High" ? "red" : "orange"} />
        {status ? <Badge text={status} tone="green" /> : null}
      </div>
      <p className="mt-2 text-xs text-[#6B7280]">{action.reason}</p>
      <p className="mt-1 text-sm font-medium text-[#0F8A3B]">
        Impact: {action.impact}
        {action.amount ? ` • ${action.amount}` : ""}
      </p>
      {action.href ? (
        <Link href={action.href} onClick={onCta} className={ctaClass}>
          {action.cta}
        </Link>
      ) : (
        <button type="button" onClick={onCta} className={ctaClass}>
          {action.cta}
        </button>
      )}
    </Card>
  );
}
