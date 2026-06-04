import { Card } from "./ui";

export function PosFitCard({ className = "" }: { className?: string }) {
  return (
    <Card className={className}>
      <h2 className="text-base font-semibold text-[#111827]">Built to work with your existing POS</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
        StoreSense does not replace systems like MCR POS. It uses POS reports and vendor invoices to help owners decide what
        to reorder, what to reprice, what bills are due, and where profit is leaking.
      </p>
    </Card>
  );
}
