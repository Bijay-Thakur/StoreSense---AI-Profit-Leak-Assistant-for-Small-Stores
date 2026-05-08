"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Badge, Card, ScreenHeader } from "../components/ui";
import { HeaderActions } from "../components/header-actions";
import { getAlertsSummary, getUrgencyColor } from "@/src/data/helpers";
import type { Alert, Product } from "@/src/data/types";

const filters = ["All", "High Priority", "Low Stock", "Invoices", "Profit Leaks"] as const;

function imageByProductId(id: string) {
  if (id === "P001") return "/products/red-bull.svg";
  if (id === "P005") return "/products/milk.svg";
  if (id === "P006") return "/products/kettle-chips.svg";
  if (id === "P007") return "/products/sparkling-water.svg";
  if (id === "P004") return "/products/frappuccino.svg";
  return "/products/milk.svg";
}

export default function AlertsClient({ alerts, products }: { alerts: Alert[]; products: Product[] }) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const summary = getAlertsSummary(alerts);

  const rows = useMemo(() => {
    if (activeFilter === "All") return alerts;
    if (activeFilter === "High Priority") return alerts.filter((a) => a.severity === "High");
    if (activeFilter === "Low Stock") return alerts.filter((a) => a.alert_type === "Low Stock");
    if (activeFilter === "Invoices") return alerts.filter((a) => a.related_entity_type === "Invoice");
    return alerts.filter((a) => a.alert_type.toLowerCase().includes("profit") || a.alert_type.toLowerCase().includes("margin"));
  }, [activeFilter, alerts]);

  return (
    <div className="space-y-4">
      <ScreenHeader title="Alerts" subtitle="Issues that need your attention." rightSlot={<HeaderActions />} />
      <Card>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="rounded-2xl bg-[#FEF2F2] p-2 text-center text-[#DC2626]">{summary.urgent} Urgent</div>
          <div className="rounded-2xl bg-[#FFF7ED] p-2 text-center text-[#D97706]">{summary.medium} Medium</div>
          <div className="rounded-2xl bg-[#ECFDF3] p-2 text-center text-[#0F8A3B]">{summary.resolved} Resolved</div>
        </div>
      </Card>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActiveFilter(f)}
            className={`rounded-full border px-3 py-1 text-xs ${activeFilter === f ? "border-[#0F8A3B] bg-[#ECFDF3] text-[#0F8A3B]" : "border-[#E5E7EB] bg-white text-[#6B7280]"}`}
          >
            {f}
          </button>
        ))}
      </div>

      {rows.map((alert) => {
        const product = products.find((p) => p.product_id === alert.related_entity_id);
        const title = product?.product_name ?? alert.title;
        const tone = getUrgencyColor(alert.urgency_color) as "green" | "red" | "orange" | "blue" | "gray";
        return (
          <Card key={alert.alert_id}>
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white">
                <Image src={imageByProductId(alert.related_entity_id)} alt={title} width={48} height={48} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{title}</p>
                  <Badge text={alert.alert_type} tone={tone} />
                </div>
                <p className="mt-1 text-sm text-[#374151]">{alert.message}</p>
                <p className="mt-2 text-sm font-medium text-[#0F8A3B]">Action: {alert.suggested_action}</p>
                <button className="mt-2 rounded-xl border border-[#E5E7EB] px-3 py-1 text-xs">{alert.status === "Resolved" ? "View details" : "Take action"}</button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
