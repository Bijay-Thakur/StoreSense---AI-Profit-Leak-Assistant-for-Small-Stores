import { Suspense } from "react";
import { AIInsightsContent } from "./ai-insights-content";

export default function AIInsightsPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          <p className="text-sm text-[#6B7280]">Loading AI Insights…</p>
        </div>
      }
    >
      <AIInsightsContent />
    </Suspense>
  );
}
