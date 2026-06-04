"use client";

import Link from "next/link";
import { BarChart3, Building2, ClipboardList, Languages, Rocket, Sparkles } from "lucide-react";
import { Card } from "./ui";
import { usePlan } from "./plan-provider";

const advancedTools = [
  { label: "AI Insights", href: "/ai-insights", icon: Sparkles },
  { label: "Market Benchmark", href: "/market", icon: BarChart3 },
  { label: "Vendor Scorecard", href: "/vendors", icon: Building2 },
  { label: "Weekly Owner Brief", href: "/weekly-brief", icon: ClipboardList },
  { label: "Owner Assistant", href: "/assistant", icon: Languages },
  { label: "Request Pilot Access", href: "/pilot", icon: Rocket },
];

const operationsTools = [
  { label: "Import POS Report", href: "/import-pos" },
  { label: "Cost Match Center", href: "/cost-match" },
  { label: "Action Center", href: "/actions" },
];

export function ProfileToolsSection() {
  const { plan } = usePlan();

  return (
    <Card>
      <h2 className="text-base font-semibold text-[#111827]">Advanced Tools</h2>
      <p className="mt-1 text-xs text-[#6B7280]">Market intelligence, vendors, briefs, and pilot access.</p>

      <div className="mt-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">Operations</p>
        <div className="mt-2 space-y-1">
          {operationsTools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="flex items-center justify-between rounded-2xl border border-[#E5E7EB] px-3 py-2.5 text-sm font-medium text-[#111827] hover:bg-[#F9FAFB]"
            >
              {t.label}
              <span className="text-[#0F8A3B]">→</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">
          {plan === "pro" ? "Advanced" : "Advanced (preview)"}
        </p>
        <div className="mt-2 space-y-1">
          {advancedTools.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.href}
                href={t.href}
                className="flex items-center justify-between gap-2 rounded-2xl border border-[#E5E7EB] px-3 py-2.5 text-sm font-medium text-[#111827] hover:bg-[#ECFDF3]/50"
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-[#0F8A3B]" />
                  {t.label}
                </span>
                <span className="text-[#0F8A3B]">→</span>
              </Link>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
