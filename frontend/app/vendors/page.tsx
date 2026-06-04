import Link from "next/link";
import { HeaderActions } from "../components/header-actions";
import { Badge, Card, ScreenHeader } from "../components/ui";
import { vendors, type MarginRisk } from "@/src/data/vendors";

function riskTone(r: MarginRisk): "green" | "orange" | "red" {
  if (r === "High") return "red";
  if (r === "Medium") return "orange";
  return "green";
}

export default function VendorsPage() {
  return (
    <div className="space-y-4">
      <ScreenHeader
        title="Vendor Scorecard"
        subtitle="Understand vendor costs, invoices, and margin impact."
        rightSlot={<HeaderActions />}
      />

      <div className="space-y-3">
        {vendors.map((v) => (
          <Card key={v.id}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="text-base font-semibold text-[#111827]">{v.name}</h3>
              <Badge text={`${v.marginRisk} margin risk`} tone={riskTone(v.marginRisk)} />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[#6B7280]">
              <p>Products supplied: <span className="font-semibold text-[#111827]">{v.productsSupplied}</span></p>
              <p>Open invoices: <span className="font-semibold text-[#111827]">{v.openInvoices}</span></p>
              {v.costIncreases != null ? (
                <p>Cost increases: <span className="font-semibold text-[#D97706]">{v.costIncreases} products</span></p>
              ) : null}
              {v.lowTurnoverProducts != null ? (
                <p>Low turnover: <span className="font-semibold text-[#111827]">{v.lowTurnoverProducts} products</span></p>
              ) : null}
              <p className="col-span-2">Avg payment window: <span className="font-semibold text-[#111827]">{v.avgPaymentWindow}</span></p>
            </div>
            <Link
              href={`/vendors/${v.slug}`}
              className="mt-4 flex w-full items-center justify-center rounded-2xl border border-[#0F8A3B] bg-[#ECFDF3] py-2.5 text-sm font-semibold text-[#0F8A3B]"
            >
              View Scorecard
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
