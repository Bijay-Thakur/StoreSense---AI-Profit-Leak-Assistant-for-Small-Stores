import Link from "next/link";
import { notFound } from "next/navigation";
import { HeaderActions } from "../../components/header-actions";
import { Badge, Card, ScreenHeader } from "../../components/ui";
import { formatCurrency } from "@/src/data/helpers";
import { freshDairyDetail, vendors } from "@/src/data/vendors";

export function generateStaticParams() {
  return vendors.map((v) => ({ vendorId: v.slug }));
}

export default async function VendorDetailPage({ params }: { params: Promise<{ vendorId: string }> }) {
  const { vendorId } = await params;
  const summary = vendors.find((v) => v.slug === vendorId);
  if (!summary) notFound();

  if (vendorId === "fresh-dairy") {
    const v = freshDairyDetail;
    return (
      <div className="space-y-4">
        <ScreenHeader title={v.name} subtitle="Vendor scorecard detail" rightSlot={<HeaderActions />} />
        <VendorDetailBody v={v} />
        <Link href="/vendors" className="block text-center text-sm text-[#0F8A3B] hover:underline">
          ← All vendors
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ScreenHeader title={summary.name} subtitle="Vendor scorecard (demo summary)" rightSlot={<HeaderActions />} />
      <Card>
        <Badge text={`${summary.marginRisk} margin risk`} tone={summary.marginRisk === "High" ? "red" : "orange"} />
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[#6B7280]">
          <p>Products supplied: <strong>{summary.productsSupplied}</strong></p>
          <p>Open invoices: <strong>{summary.openInvoices}</strong></p>
          <p>Payment window: <strong>{summary.avgPaymentWindow}</strong></p>
        </div>
        <p className="mt-3 text-sm text-[#374151]">
          Full scorecard detail is available in demo for Fresh Dairy Co. Other vendors use the same intelligence model in a pilot.
        </p>
        <Link
          href="/vendors/fresh-dairy"
          className="mt-4 flex w-full items-center justify-center rounded-2xl bg-[#0F8A3B] py-2.5 text-sm font-semibold text-white"
        >
          View Fresh Dairy example
        </Link>
      </Card>
      <Link href="/vendors" className="block text-center text-sm text-[#0F8A3B] hover:underline">
        ← All vendors
      </Link>
    </div>
  );
}

function VendorDetailBody({ v }: { v: typeof freshDairyDetail }) {
  return (
    <>
      <Card className="bg-gradient-to-r from-[#ECFDF3] to-white">
        <p className="text-xs text-[#6B7280]">Vendor health score</p>
        <p className="mt-1 text-3xl font-bold text-[#0F8A3B]">{v.healthScore}/100</p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <p>Products: <strong>{v.productsSupplied}</strong></p>
          <p>Open invoices: <strong>{formatCurrency(v.openInvoicesAmount)}</strong></p>
          <p>Cost increases: <strong className="text-[#D97706]">{v.costIncreasesThisMonth}</strong></p>
          <p>Margin impact: <strong className="text-[#DC2626]">{v.avgMarginImpact}</strong></p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge text={`Highest risk: ${v.highestRiskProduct}`} tone="orange" />
          <Badge text={v.paymentStatus} tone="red" />
        </div>
      </Card>
      <Card>
        <h2 className="text-sm font-semibold">Cost movement</h2>
        <ul className="mt-2 space-y-2 text-xs text-[#374151]">
          {v.costMovements.map((line) => (
            <li key={line} className="rounded-2xl bg-[#F9FAFB] p-2">{line}</li>
          ))}
        </ul>
      </Card>
      <Card>
        <h2 className="text-sm font-semibold">Invoice summary</h2>
        <ul className="mt-2 space-y-1 text-xs text-[#374151]">
          {v.invoices.map((inv) => (
            <li key={inv}>{inv}</li>
          ))}
        </ul>
      </Card>
      <Card>
        <h2 className="text-sm font-semibold">Recommended vendor actions</h2>
        <ul className="mt-2 space-y-1 text-xs text-[#374151]">
          {v.recommendedActions.map((a) => (
            <li key={a} className="flex gap-2">
              <span className="text-[#0F8A3B]">✓</span>
              {a}
            </li>
          ))}
        </ul>
      </Card>
      <Card>
        <h2 className="text-sm font-semibold">Vendor notes</h2>
        <p className="mt-2 text-xs leading-relaxed text-[#374151]">{v.notes}</p>
      </Card>
    </>
  );
}
