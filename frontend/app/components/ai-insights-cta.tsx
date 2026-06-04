import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Card } from "./ui";
import type { AssistantModeId } from "@/src/data/aiInsights";

export function AiInsightsCta({
  title,
  text,
  buttonLabel,
  mode,
}: {
  title: string;
  text: string;
  buttonLabel: string;
  mode?: AssistantModeId;
}) {
  const href = mode ? `/ai-insights?mode=${mode}` : "/ai-insights";

  return (
    <Card className="border-[#0F8A3B]/15 bg-gradient-to-r from-[#ECFDF3]/60 to-white">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#ECFDF3] text-[#0F8A3B]">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#111827]">{title}</p>
          <p className="mt-1 text-xs text-[#6B7280]">{text}</p>
          <Link
            href={href}
            className="mt-3 inline-flex rounded-2xl bg-[#0F8A3B] px-4 py-2 text-xs font-semibold text-white"
          >
            {buttonLabel}
          </Link>
        </div>
      </div>
    </Card>
  );
}
