"use client";

import { useMemo, useState } from "react";
import { FileText } from "lucide-react";
import { Badge, Card, ScreenHeader } from "../components/ui";
import { HeaderActions } from "../components/header-actions";
import { formatCurrency, getInvoiceSummary, getStatusColor } from "@/src/data/helpers";
import type { Invoice } from "@/src/data/types";

const tabs = ["All", "Unpaid", "Paid"] as const;

export default function InvoicesClient({ invoices }: { invoices: Invoice[] }) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const summary = getInvoiceSummary(invoices);
  const rows = useMemo(() => {
    if (tab === "All") return invoices;
    return invoices.filter((i) => i.status.toLowerCase() === tab.toLowerCase());
  }, [tab, invoices]);

  return (
    <div className="space-y-4">
      <ScreenHeader title="Invoices" subtitle="Track paid, unpaid, and overdue vendor bills." rightSlot={<HeaderActions />} />

      <div className="grid grid-cols-2 gap-3">
        <Card><p className="text-xs text-[#6B7280]">Paid</p><p className="text-xl font-semibold">{summary.paid}</p></Card>
        <Card><p className="text-xs text-[#6B7280]">Due Soon</p><p className="text-xl font-semibold">{summary.dueSoon}</p></Card>
        <Card><p className="text-xs text-[#6B7280]">Overdue</p><p className="text-xl font-semibold">{summary.overdue}</p></Card>
        <Card><p className="text-xs text-[#6B7280]">Outstanding</p><p className="text-xl font-semibold">{formatCurrency(1184)}</p></Card>
      </div>

      <Card className="bg-[#FEFCE8]">
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#92400E]">48-hour payment reminders enabled</p>
          <button className="rounded-xl border border-[#E5E7EB] bg-white px-3 py-1 text-xs">Manage</button>
        </div>
      </Card>

      <div className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full border px-3 py-1 text-xs ${tab === t ? "border-[#0F8A3B] bg-[#ECFDF3] text-[#0F8A3B]" : "border-[#E5E7EB] text-[#6B7280]"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {rows.map((inv) => {
        const tone = getStatusColor(inv.status) as "green" | "red" | "orange" | "blue" | "gray";
        return (
          <Card key={inv.invoice_id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{inv.vendor_name}</p>
                <p className="text-xs text-[#6B7280]">Invoice #{inv.invoice_number}</p>
                <p className="mt-1 text-xs text-[#6B7280]">Invoice Date: {inv.invoice_date}</p>
                <p className="text-xs text-[#6B7280]">Due Date: {inv.due_date}</p>
                {inv.status === "Overdue" ? <p className="mt-1 text-xs text-[#DC2626]">12 days overdue</p> : null}
              </div>
              <div className="text-right">
                <Badge text={inv.status} tone={tone} />
                <p className="mt-2 text-sm font-semibold">{formatCurrency(inv.amount)}</p>
                <button className="mt-2 rounded-lg border border-[#E5E7EB] px-2 py-1 text-xs">
                  <FileText className="mr-1 inline h-3 w-3" />
                  PDF
                </button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
