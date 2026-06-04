export type AssistantModeId = "sales" | "invoice" | "inventory" | "pricing" | "weekly";

export type AssistantMode = {
  id: AssistantModeId;
  label: string;
  shortLabel: string;
};

export const assistantModes: AssistantMode[] = [
  { id: "sales", label: "Sales Analyst", shortLabel: "Sales" },
  { id: "invoice", label: "Invoice Assistant", shortLabel: "Invoices" },
  { id: "inventory", label: "Inventory / SKU Advisor", shortLabel: "Inventory" },
  { id: "pricing", label: "Pricing & Margin Analyst", shortLabel: "Pricing" },
  { id: "weekly", label: "Weekly Brief", shortLabel: "Weekly" },
];

export const suggestedQuestions: Record<AssistantModeId, string[]> = {
  sales: [
    "How were my sales this week?",
    "What were my top-selling items?",
    "Which day was the slowest?",
    "How many units did I sell today?",
  ],
  invoice: [
    "Do I have invoices due soon?",
    "Which invoices are unpaid?",
    "Any overdue invoices?",
    "What should I pay first?",
  ],
  inventory: [
    "Should I buy RB-24CT next week?",
    "Should I reorder Kettle Chips?",
    "What items are low stock?",
    "What should I reorder this week?",
  ],
  pricing: [
    "Which products are losing margin?",
    "Did any vendor increase prices?",
    "Should I raise Milk price?",
    "What price should Milk Gallon be?",
  ],
  weekly: [
    "Give me my weekly store brief.",
    "What should I focus on this week?",
    "Summarize my store performance.",
    "What are my top actions?",
  ],
};

export const INITIAL_GREETING =
  "Hi, I'm your StoreSense AI assistant. Ask me about sales, invoices, inventory, or profit leaks.";

export const FALLBACK_ANSWER =
  "I can help with sales, invoices, inventory, reorder decisions, and pricing. Try asking: \"What should I reorder this week?\" or \"Which invoices are due soon?\"";

export const storeMetrics = {
  weeklySales: 24671,
  weeklySalesChangePct: 14.2,
  todaysSales: 3842.65,
  todaysChangePct: 12.6,
  unitsSoldToday: 534,
  transactionsToday: 186,
  topItems: ["Red Bull", "Coca-Cola 12oz", "Eggs", "Milk Gallon"],
  slowestDay: "Thursday",
};
