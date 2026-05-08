export type PlanTier = "free" | "pro";

export const PLAN_STORAGE_KEY = "storesense_plan";

const planListeners = new Set<() => void>();

export function subscribePlan(listener: () => void) {
  planListeners.add(listener);
  return () => {
    planListeners.delete(listener);
  };
}

function notifyPlanListeners() {
  planListeners.forEach((l) => {
    l();
  });
}

export function readStoredPlan(): PlanTier {
  if (typeof window === "undefined") return "free";
  try {
    const v = localStorage.getItem(PLAN_STORAGE_KEY);
    return v === "pro" ? "pro" : "free";
  } catch {
    return "free";
  }
}

export function writeStoredPlan(plan: PlanTier): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PLAN_STORAGE_KEY, plan);
  } catch {
    /* ignore quota / private mode */
  }
  notifyPlanListeners();
}

export function getServerPlanSnapshot(): PlanTier {
  return "free";
}
