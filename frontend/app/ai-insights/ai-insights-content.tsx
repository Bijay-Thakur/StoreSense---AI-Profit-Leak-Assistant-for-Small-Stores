"use client";

import { useSearchParams } from "next/navigation";
import { parseModeParam } from "@/src/lib/aiInsightEngine";
import { AIInsightsClient } from "./ai-insights-client";

export function AIInsightsContent() {
  const searchParams = useSearchParams();
  const initialMode = parseModeParam(searchParams.get("mode"));
  return <AIInsightsClient key={initialMode} initialMode={initialMode} />;
}
