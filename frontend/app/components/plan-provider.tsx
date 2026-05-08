"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import type { PlanTier } from "@/src/lib/plan";
import { getServerPlanSnapshot, readStoredPlan, subscribePlan, writeStoredPlan } from "@/src/lib/plan";

type PlanContextValue = {
  plan: PlanTier;
  setPlan: (p: PlanTier) => void;
  isPro: boolean;
};

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const plan = useSyncExternalStore(subscribePlan, readStoredPlan, getServerPlanSnapshot);

  const setPlan = useCallback((p: PlanTier) => {
    writeStoredPlan(p);
  }, []);

  const value = useMemo(
    () => ({
      plan,
      setPlan,
      isPro: plan === "pro",
    }),
    [plan, setPlan],
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
