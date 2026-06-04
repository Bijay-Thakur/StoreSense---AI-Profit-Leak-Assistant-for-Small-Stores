"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { DemoToast } from "../components/demo-toast";
import { HeaderActions } from "../components/header-actions";
import { PosFitCard } from "../components/pos-fit-card";
import { Badge, Card, ScreenHeader } from "../components/ui";
import { columnMappings, importSummary, posSources, type PosSource } from "@/src/data/importMock";
import { formatCurrency } from "@/src/data/helpers";

export default function ImportPosPage() {
  const router = useRouter();
  const [source, setSource] = useState<PosSource>("MCR POS");
  const [imported, setImported] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const dismissToast = useCallback(() => setToast(null), []);

  return (
    <div className="space-y-4">
      {toast ? <DemoToast message={toast} onDismiss={dismissToast} /> : null}

      <ScreenHeader
        title="Import POS Report"
        subtitle="Connect your existing POS data without replacing your register."
        rightSlot={<HeaderActions />}
      />

      <p className="rounded-2xl border border-[#E5E7EB] bg-[#ECFDF3] px-3 py-2 text-xs text-[#166534]">
        StoreSense does not replace your POS. It uses your POS reports to generate business actions.
      </p>

      <Card>
        <h2 className="text-sm font-semibold text-[#111827]">POS source</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {posSources.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSource(s)}
              className={`rounded-2xl border px-3 py-2 text-xs font-medium transition ${
                source === s ? "border-[#0F8A3B] bg-[#ECFDF3] text-[#0F8A3B]" : "border-[#E5E7EB] bg-white text-[#374151] hover:border-[#D1D5DB]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-[#6B7280]">Selected: {source}</p>
      </Card>

      <Card>
        <h2 className="text-sm font-semibold text-[#111827]">Upload report</h2>
        <p className="mt-1 text-xs text-[#6B7280]">Export a CSV from your POS and upload it here (demo).</p>
        <button
          type="button"
          className="mt-3 w-full rounded-2xl border border-dashed border-[#0F8A3B] bg-[#ECFDF3] py-3 text-sm font-semibold text-[#0F8A3B]"
          onClick={() => {
            setImported(true);
            setToast("Mock POS report imported successfully.");
          }}
        >
          Upload POS CSV
        </button>
        {imported ? (
          <p className="mt-2 text-center text-xs font-medium text-[#0F8A3B]">Mock POS report imported successfully.</p>
        ) : null}
      </Card>

      {imported ? (
        <>
          <Card>
            <h2 className="text-sm font-semibold text-[#111827]">Column mapping preview</h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[280px] text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5E7EB] text-[#6B7280]">
                    <th className="pb-2 pr-4 font-medium">POS column</th>
                    <th className="pb-2 font-medium">StoreSense field</th>
                  </tr>
                </thead>
                <tbody>
                  {columnMappings.map((row) => (
                    <tr key={row.posColumn} className="border-b border-[#F3F4F6]">
                      <td className="py-2 pr-4 text-[#111827]">{row.posColumn}</td>
                      <td className="py-2 text-[#0F8A3B]">{row.storeSenseField}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-[#111827]">Import summary</h2>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-2xl bg-[#F9FAFB] p-3">
                <p className="text-[#6B7280]">Units sold</p>
                <p className="mt-1 text-lg font-semibold">{importSummary.unitsSold}</p>
              </div>
              <div className="rounded-2xl bg-[#F9FAFB] p-3">
                <p className="text-[#6B7280]">Transactions</p>
                <p className="mt-1 text-lg font-semibold">{importSummary.transactions}</p>
              </div>
              <div className="rounded-2xl bg-[#F9FAFB] p-3">
                <p className="text-[#6B7280]">Sales</p>
                <p className="mt-1 text-lg font-semibold">{formatCurrency(importSummary.totalSales)}</p>
              </div>
              <div className="rounded-2xl bg-[#FFF7ED] p-3">
                <p className="text-[#6B7280]">Low stock</p>
                <p className="mt-1 text-lg font-semibold text-[#D97706]">{importSummary.lowStockItems} items</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-[#374151]">
              <Badge text={`${importSummary.reorderActions} reorder actions generated`} tone="green" />
            </p>
          </Card>

          <button
            type="button"
            className="w-full rounded-2xl bg-[#0F8A3B] py-3 text-sm font-semibold text-white"
            onClick={() => router.push("/actions")}
          >
            Generate StoreSense Actions
          </button>
        </>
      ) : null}

      <PosFitCard />

      <p className="text-center text-xs text-[#9CA3AF]">
        <Link href="/" className="text-[#0F8A3B] hover:underline">
          Back to Home
        </Link>
      </p>
    </div>
  );
}
