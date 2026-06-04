export type ActionType = "Reorder" | "Reprice" | "Invoice" | "Cost Match" | "Do Not Reorder" | "Vendor";

export type StoreAction = {
  id: string;
  title: string;
  type: ActionType;
  reason: string;
  impact: string;
  priority: "High" | "Medium" | "Low";
  cta: string;
  amount?: string;
  href?: string;
};

export const actionSummary = {
  openActions: 8,
  highPriority: 3,
  profitImpact: "+$408/week",
  invoicesDue: "$286.40",
};

export const storeActions: StoreAction[] = [
  {
    id: "a1",
    title: "Reorder Red Bull",
    type: "Reorder",
    reason: "Fast seller, 2 cases left",
    impact: "+$312",
    priority: "High",
    cta: "Mark Planned",
  },
  {
    id: "a2",
    title: "Raise Milk price to $4.99",
    type: "Reprice",
    reason: "Vendor cost increased 8.2%",
    impact: "+$96/week",
    priority: "High",
    cta: "Simulate Price",
    href: "/products/milk-gallon",
  },
  {
    id: "a3",
    title: "Pay Golden Supply Co. invoice",
    type: "Invoice",
    reason: "Due in 48 hours",
    impact: "Avoid missed payment",
    amount: "$286.40",
    priority: "High",
    cta: "View Invoice",
    href: "/invoices",
  },
  {
    id: "a4",
    title: "Match vendor invoice items",
    type: "Cost Match",
    reason: "4 invoice items need review",
    impact: "Improve margin accuracy",
    priority: "Medium",
    cta: "Open Cost Match Center",
    href: "/cost-match",
  },
  {
    id: "a5",
    title: "Do not reorder Kettle Chips",
    type: "Do Not Reorder",
    reason: "45 days on hand, low turnover",
    impact: "Avoid excess stock",
    priority: "Medium",
    cta: "Mark Reviewed",
  },
  {
    id: "a6",
    title: "Review Fresh Dairy Co. cost increase",
    type: "Vendor",
    reason: "Dairy costs increased this month",
    impact: "Protect margins",
    priority: "Medium",
    cta: "View Vendor",
    href: "/vendors/fresh-dairy",
  },
  {
    id: "a7",
    title: "Reorder Coca-Cola 12oz",
    type: "Reorder",
    reason: "Strong weekly velocity, shelf running low",
    impact: "+$48/week",
    priority: "Medium",
    cta: "Mark Planned",
  },
  {
    id: "a8",
    title: "Pay Fresh Dairy Co. invoice",
    type: "Invoice",
    reason: "Due soon",
    impact: "Avoid missed payment",
    amount: "$238.75",
    priority: "Medium",
    cta: "View Invoice",
    href: "/invoices",
  },
];

export const actionFilters = ["All", "Reorder", "Reprice", "Invoices", "Vendors", "Do Not Reorder"] as const;

export function filterActions(actions: StoreAction[], filter: (typeof actionFilters)[number]) {
  if (filter === "All") return actions;
  if (filter === "Invoices") return actions.filter((a) => a.type === "Invoice");
  if (filter === "Vendors") return actions.filter((a) => a.type === "Vendor");
  if (filter === "Do Not Reorder") return actions.filter((a) => a.type === "Do Not Reorder");
  return actions.filter((a) => a.type === filter);
}
