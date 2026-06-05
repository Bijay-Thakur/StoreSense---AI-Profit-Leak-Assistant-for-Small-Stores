import type { PlanTier } from "@/src/lib/plan";
import { getPlanLabel } from "@/src/lib/plan";

export function PlanBadge({ plan, className = "" }: { plan: PlanTier; className?: string }) {
  const isPro = plan === "pro";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        isPro ? "bg-[#ECFDF3] text-[#0F8A3B]" : "bg-[#F3F4F6] text-[#374151]"
      } ${className}`}
    >
      {getPlanLabel(plan)}
    </span>
  );
}
