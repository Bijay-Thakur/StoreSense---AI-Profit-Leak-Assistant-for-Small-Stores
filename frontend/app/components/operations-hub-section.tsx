import Link from "next/link";
import {
  BarChart3,
  Building2,
  ClipboardList,
  FileUp,
  GitCompare,
  LayoutGrid,
  Rocket,
} from "lucide-react";
import { Badge, Card } from "./ui";

const hubCards = [
  {
    title: "Import POS Report",
    description: "Bring in sales data from MCR, Square, Clover, Shopify, or CSV exports.",
    href: "/import-pos",
    badge: "Setup",
    tone: "gray" as const,
    icon: FileUp,
  },
  {
    title: "Cost Match Center",
    description: "Match vendor invoice items to POS products.",
    href: "/cost-match",
    badge: "4 need review",
    tone: "orange" as const,
    icon: GitCompare,
  },
  {
    title: "Action Center",
    description: "See what to reorder, reprice, pay, or review.",
    href: "/actions",
    badge: "8 open",
    tone: "green" as const,
    icon: LayoutGrid,
  },
  {
    title: "Vendor Scorecard",
    description: "Review vendor cost changes and invoice risk.",
    href: "/vendors",
    badge: "Margin risk",
    tone: "red" as const,
    icon: Building2,
  },
  {
    title: "Weekly Owner Brief",
    description: "See your weekly store summary and next actions.",
    href: "/weekly-brief",
    badge: "Weekly",
    tone: "blue" as const,
    icon: ClipboardList,
  },
  {
    title: "Request Pilot Access",
    description: "Interested in testing StoreSense with a real store?",
    href: "/pilot",
    badge: "Pilot",
    tone: "green" as const,
    icon: Rocket,
  },
];

export function OperationsHubSection() {
  return (
    <div className="space-y-3">
      <Card className="border-[#E5E7EB] bg-gradient-to-br from-[#FAFAFA] to-white">
        <h2 className="text-base font-semibold text-[#111827]">Operations Hub</h2>
        <p className="mt-1 text-xs text-[#6B7280]">
          Connect data, review decisions, and prepare your weekly store plan.
        </p>
      </Card>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {hubCards.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="block h-full">
              <Card className="flex h-full flex-col transition hover:border-[#0F8A3B]/35 hover:bg-[#FAFFFC]">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#ECFDF3] text-[#0F8A3B]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge text={item.badge} tone={item.tone} />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-[#111827]">{item.title}</h3>
                <p className="mt-1 flex-1 text-xs leading-relaxed text-[#6B7280]">{item.description}</p>
                <p className="mt-3 text-xs font-semibold text-[#0F8A3B]">Open →</p>
              </Card>
            </Link>
          );
        })}
      </div>
      <Link
        href="/market"
        className="flex items-center justify-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white py-2.5 text-xs font-medium text-[#374151] hover:border-[#0F8A3B]/30"
      >
        <BarChart3 className="h-4 w-4 text-[#0F8A3B]" />
        Compare top products with market prices (Pro)
      </Link>
    </div>
  );
}
