export type MarginRisk = "High" | "Medium" | "Low";

export type VendorSummary = {
  id: string;
  name: string;
  productsSupplied: number;
  openInvoices: number;
  costIncreases?: number;
  lowTurnoverProducts?: number;
  marginRisk: MarginRisk;
  avgPaymentWindow: string;
  slug: string;
};

export const vendors: VendorSummary[] = [
  {
    id: "v1",
    name: "Fresh Dairy Co.",
    productsSupplied: 5,
    openInvoices: 2,
    costIncreases: 4,
    marginRisk: "High",
    avgPaymentWindow: "7 days",
    slug: "fresh-dairy",
  },
  {
    id: "v2",
    name: "Golden Supply Co.",
    productsSupplied: 6,
    openInvoices: 2,
    costIncreases: 2,
    marginRisk: "Medium",
    avgPaymentWindow: "7 days",
    slug: "golden-supply",
  },
  {
    id: "v3",
    name: "Hudson Beverage",
    productsSupplied: 8,
    openInvoices: 2,
    costIncreases: 1,
    marginRisk: "Low",
    avgPaymentWindow: "7 days",
    slug: "hudson-beverage",
  },
  {
    id: "v4",
    name: "Metro Snacks",
    productsSupplied: 6,
    openInvoices: 2,
    lowTurnoverProducts: 3,
    marginRisk: "Medium",
    avgPaymentWindow: "7 days",
    slug: "metro-snacks",
  },
];

export const freshDairyDetail = {
  name: "Fresh Dairy Co.",
  healthScore: 72,
  productsSupplied: 5,
  openInvoicesAmount: 431.19,
  costIncreasesThisMonth: 4,
  highestRiskProduct: "Milk Gallon",
  paymentStatus: "Due Soon",
  avgMarginImpact: "-4.6 pp",
  costMovements: [
    "Milk Gallon cost increased from $2.79 to $3.02",
    "Greek Yogurt cost increased 5.1%",
    "Butter increased 3.4%",
  ],
  invoices: ["Invoice #78401 due soon", "Invoice #78431 due soon"],
  recommendedActions: [
    "Review milk pricing",
    "Ask vendor about dairy cost increases",
    "Avoid overordering low-margin dairy items",
  ],
  notes:
    "Fresh Dairy Co. is reliable but recent cost increases are reducing margins on high-volume dairy items.",
};
