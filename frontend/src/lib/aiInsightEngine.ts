import {
  FALLBACK_ANSWER,
  storeMetrics,
  type AssistantModeId,
} from "@/src/data/aiInsights";

export type AIInsightResult = {
  answer: string;
  sources: string[];
  relatedActions?: { label: string; href: string }[];
};

function includesAny(text: string, terms: string[]) {
  return terms.some((t) => text.includes(t));
}

function salesResponse(q: string): AIInsightResult | null {
  if (includesAny(q, ["week", "weekly", "this week"])) {
    return {
      answer: `Your weekly sales were $${storeMetrics.weeklySales.toLocaleString()}, up ${storeMetrics.weeklySalesChangePct}%. Today's sales are $${storeMetrics.todaysSales.toLocaleString()} from ${storeMetrics.transactionsToday} transactions and ${storeMetrics.unitsSoldToday} units sold. ${storeMetrics.topItems.join(", ")} are your top-selling items. ${storeMetrics.slowestDay} was the weakest sales day — review staffing or promotions for that day.`,
      sources: ["POS sales report", "daily_sales_summary.csv"],
      relatedActions: [{ label: "View Weekly Brief", href: "/weekly-brief" }],
    };
  }
  if (includesAny(q, ["top", "best", "selling", "seller"])) {
    return {
      answer: `Your top-selling items are ${storeMetrics.topItems.join(", ")}. Red Bull and Coca-Cola 12oz are high-velocity sellers. Milk Gallon remains a volume driver but needs a pricing review after the latest vendor cost increase.`,
      sources: ["POS sales report", "reorder_recommendations.csv"],
      relatedActions: [{ label: "View Action Center", href: "/actions" }],
    };
  }
  if (includesAny(q, ["slow", "weakest", "worst day", "which day"])) {
    return {
      answer: `${storeMetrics.slowestDay} was your slowest sales day this week. Consider a targeted promotion or staffing adjustment on slower weekdays while keeping high-demand SKUs stocked before the weekend.`,
      sources: ["daily_sales_summary.csv", "POS sales report"],
    };
  }
  if (includesAny(q, ["unit", "today", "transaction", "how many"])) {
    return {
      answer: `Today you recorded ${storeMetrics.transactionsToday} transactions and ${storeMetrics.unitsSoldToday} units sold, with sales of $${storeMetrics.todaysSales.toLocaleString()} (up ${storeMetrics.todaysChangePct}% vs yesterday).`,
      sources: ["POS sales report", "daily_sales_summary.csv"],
    };
  }
  if (includesAny(q, ["sales", "revenue", "performance"])) {
    return {
      answer: `Weekly sales are $${storeMetrics.weeklySales.toLocaleString()} (+${storeMetrics.weeklySalesChangePct}%). Today: $${storeMetrics.todaysSales.toLocaleString()}, ${storeMetrics.unitsSoldToday} units, ${storeMetrics.transactionsToday} transactions. Top items: ${storeMetrics.topItems.join(", ")}.`,
      sources: ["POS sales report", "daily_sales_summary.csv"],
      relatedActions: [{ label: "View Weekly Brief", href: "/weekly-brief" }],
    };
  }
  return null;
}

function invoiceResponse(q: string): AIInsightResult | null {
  if (includesAny(q, ["pay first", "priority", "should i pay", "handle first"])) {
    return {
      answer:
        "Pay Golden Supply Co. invoice #78612 for $286.40 first — it is due in 48 hours. Next, schedule Fresh Dairy Co. invoice #78401 for $238.75. Metro Snacks invoice #78215 is overdue and needs immediate review.",
      sources: ["vendor_invoices.csv", "Invoice Records"],
      relatedActions: [
        { label: "View Invoices", href: "/invoices" },
        { label: "View Action Center", href: "/actions" },
      ],
    };
  }
  if (includesAny(q, ["overdue", "past due", "late"])) {
    return {
      answer:
        "Yes — Metro Snacks invoice #78215 for $180.54 is overdue. Golden Supply Co. #78612 ($286.40) is due in 48 hours. Fresh Dairy #78401 ($238.75) is due soon.",
      sources: ["vendor_invoices.csv"],
      relatedActions: [{ label: "View Invoices", href: "/invoices" }],
    };
  }
  if (includesAny(q, ["unpaid", "outstanding", "open invoice"])) {
    return {
      answer:
        "You have multiple unpaid invoices across Golden Supply Co., Hudson Beverage, Metro Snacks, and Daily Grocery Wholesale. Total outstanding is about $1,184 in the demo dataset. Prioritize due-soon and overdue items first.",
      sources: ["vendor_invoices.csv", "Invoice Records"],
      relatedActions: [{ label: "View Invoices", href: "/invoices" }],
    };
  }
  if (includesAny(q, ["due", "soon", "48 hour", "invoice"])) {
    return {
      answer:
        "Yes. Golden Supply Co. invoice #78612 for $286.40 is due in 48 hours and should be handled first. Fresh Dairy Co. invoice #78401 for $238.75 is also due soon. Metro Snacks invoice #78215 is overdue and should be reviewed immediately.",
      sources: ["vendor_invoices.csv", "Invoice Records"],
      relatedActions: [{ label: "View Invoices", href: "/invoices" }],
    };
  }
  return null;
}

function inventoryResponse(q: string): AIInsightResult | null {
  if (includesAny(q, ["rb-24ct", "red bull", "redbull"])) {
    return {
      answer:
        "Yes. Red Bull 24ct should be reordered. It has high demand, only 2 cases left, and the recommended reorder quantity is 6 cases. StoreSense estimates a +$312 profit opportunity if stock is replenished before demand peaks.",
      sources: ["inventory_snapshot.csv", "reorder_recommendations.csv", "Inventory Snapshot"],
      relatedActions: [{ label: "View Action Center", href: "/actions" }],
    };
  }
  if (includesAny(q, ["coke-12oz", "coca-cola", "coca cola", "coke"])) {
    return {
      answer:
        "Yes — reorder Coca-Cola 12oz. Demand is high with about 1 case on hand. Recommended reorder is 5 cases with an estimated +$256 weekly profit impact if you restock before the weekend rush.",
      sources: ["inventory_snapshot.csv", "reorder_recommendations.csv"],
      relatedActions: [{ label: "View Action Center", href: "/actions" }],
    };
  }
  if (includesAny(q, ["kettle", "chips"])) {
    return {
      answer:
        "No — do not reorder Kettle Chips this week. It has 45 days on hand, low turnover, and a weak 12% margin. Clear existing stock before placing another order.",
      sources: ["inventory_snapshot.csv", "reorder_recommendations.csv"],
      relatedActions: [{ label: "View Action Center", href: "/actions" }],
    };
  }
  if (includesAny(q, ["milk", "p005"])) {
    return {
      answer:
        "Reorder only about 12 units of Milk Gallon this week. Stock is adequate for near-term demand, but vendor costs rose — pair a limited reorder with a price increase to $4.99 to protect margin.",
      sources: ["inventory_snapshot.csv", "vendor_cost_history.csv", "Reorder Recommendations"],
      relatedActions: [
        { label: "View Product Insight", href: "/products/milk-gallon" },
        { label: "View Action Center", href: "/actions" },
      ],
    };
  }
  if (includesAny(q, ["low stock", "running low", "out of stock"])) {
    return {
      answer:
        "7 items are flagged low stock, including Red Bull 24ct (2 cases left) and Coca-Cola 12oz (1 case). Priority reorders: Red Bull (6 cases), Coca-Cola (5 cases), and Eggs (20 cartons).",
      sources: ["inventory_snapshot.csv", "reorder_recommendations.csv"],
      relatedActions: [{ label: "View Action Center", href: "/actions" }],
    };
  }
  if (includesAny(q, ["reorder", "buy", "should i", "sku", "stock"])) {
    return {
      answer:
        "This week's reorder priorities: Red Bull 24ct (6 cases), Coca-Cola 12oz (5 cases), Eggs (20 cartons), Starbucks Frappuccino (4 cases). Skip Kettle Chips until inventory clears.",
      sources: ["reorder_recommendations.csv", "inventory_snapshot.csv"],
      relatedActions: [
        { label: "View Action Center", href: "/actions" },
        { label: "Full reorder plan", href: "/products" },
      ],
    };
  }
  return null;
}

function pricingResponse(q: string): AIInsightResult | null {
  if (includesAny(q, ["milk", "gallon", "4.99", "4.49", "raise"])) {
    return {
      answer:
        "Milk Gallon is your clearest profit leak. Fresh Dairy Co. increased the vendor cost from $2.79 to $3.02 while your selling price stayed at $4.49. Your margin dropped by 4.6 percentage points. StoreSense recommends raising Milk Gallon to $4.99, which could recover about $96 in weekly profit.",
      sources: ["vendor_cost_history.csv", "Vendor Cost History", "products.csv"],
      relatedActions: [
        { label: "View Product Insight", href: "/products/milk-gallon" },
        { label: "View Action Center", href: "/actions" },
      ],
    };
  }
  if (includesAny(q, ["vendor", "cost increase", "supplier"])) {
    return {
      answer:
        "Fresh Dairy Co. raised costs on multiple dairy SKUs this month — Milk Gallon (+8.2%), Greek Yogurt (+5.1%), and Butter (+3.4%). Review milk pricing first because it is your highest-volume risk.",
      sources: ["vendor_cost_history.csv", "Vendor Cost History"],
      relatedActions: [{ label: "View Vendor Scorecard", href: "/vendors/fresh-dairy" }],
    };
  }
  if (includesAny(q, ["margin", "profit leak", "losing", "weak"])) {
    return {
      answer:
        "Products under margin pressure: Milk Gallon (vendor cost up, margin down 4.6 pp), Kettle Chips (12% margin, slow turnover), and Sparkling Water (12% margin). Milk is the highest-impact fix via a price move to $4.99.",
      sources: ["vendor_cost_history.csv", "products.csv", "alerts.csv"],
      relatedActions: [
        { label: "View Product Insight", href: "/products/milk-gallon" },
        { label: "View Action Center", href: "/actions" },
      ],
    };
  }
  if (includesAny(q, ["price", "pricing", "repric"])) {
    return {
      answer:
        "Top pricing actions: raise Milk Gallon to $4.99, consider a modest Red Bull increase (strong demand, healthy margin), and hold Coca-Cola at a competitive price. Do not discount Kettle Chips further — focus on clearing stock.",
      sources: ["vendor_cost_history.csv", "market benchmark (demo)", "products.csv"],
      relatedActions: [{ label: "Market Benchmark", href: "/market" }],
    };
  }
  return null;
}

function weeklyResponse(q: string): AIInsightResult | null {
  if (includesAny(q, ["brief", "summary", "summarize", "performance", "focus", "week"])) {
    return {
      answer:
        "This week, sales increased 12.6%, but dairy costs created margin pressure. Your top actions are: reorder Red Bull, reorder Coca-Cola, raise Milk Gallon to $4.99, pay Golden Supply Co. invoice #78612, and skip Kettle Chips this week. Red Bull and Coca-Cola are strong sales opportunities, while Milk Gallon and Kettle Chips require margin and inventory attention.",
      sources: ["weekly owner brief (demo)", "POS sales report", "vendor_invoices.csv"],
      relatedActions: [
        { label: "View Weekly Brief", href: "/weekly-brief" },
        { label: "View Action Center", href: "/actions" },
      ],
    };
  }
  if (includesAny(q, ["action", "priority", "to do", "should i do"])) {
    return {
      answer:
        "Your top actions: (1) Reorder Red Bull — 6 cases, (2) Pay Golden Supply invoice #78612, (3) Raise Milk to $4.99, (4) Match 4 invoice line items in Cost Match Center, (5) Do not reorder Kettle Chips.",
      sources: ["reorder_recommendations.csv", "vendor_invoices.csv", "Action Center"],
      relatedActions: [{ label: "View Action Center", href: "/actions" }],
    };
  }
  return null;
}

const modeHandlers: Record<AssistantModeId, (q: string) => AIInsightResult | null> = {
  sales: salesResponse,
  invoice: invoiceResponse,
  inventory: inventoryResponse,
  pricing: pricingResponse,
  weekly: weeklyResponse,
};

export function getAIInsightResponse(mode: AssistantModeId, question: string): AIInsightResult {
  const q = question.toLowerCase().trim();
  if (!q) {
    return { answer: FALLBACK_ANSWER, sources: ["StoreSense knowledge base (demo)"] };
  }

  const primary = modeHandlers[mode](q);
  if (primary) return primary;

  for (const handler of Object.values(modeHandlers)) {
    const match = handler(q);
    if (match) return match;
  }

  return { answer: FALLBACK_ANSWER, sources: ["StoreSense knowledge base (demo)"] };
}

export function parseModeParam(value: string | null): AssistantModeId {
  const ids: AssistantModeId[] = ["sales", "invoice", "inventory", "pricing", "weekly"];
  if (value && ids.includes(value as AssistantModeId)) return value as AssistantModeId;
  return "sales";
}
