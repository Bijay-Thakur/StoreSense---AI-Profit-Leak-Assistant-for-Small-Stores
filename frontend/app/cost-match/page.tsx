"use client";

import { useCallback, useState } from "react";
import { DemoToast } from "../components/demo-toast";
import { HeaderActions } from "../components/header-actions";
import { Badge, Card, ScreenHeader } from "../components/ui";
import { costMatches, costMatchSummary, type CostMatch } from "@/src/data/costMatches";

export default function CostMatchPage() {
  const [rows, setRows] = useState(costMatches);
  const [reviewId, setReviewId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const dismissToast = useCallback(() => setToast(null), []);

  function acceptMatch(id: string) {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Auto Match" as const, actionLabel: "Accepted" } : r)),
    );
    setToast("Match accepted for demo.");
  }

  return (
    <div className="space-y-4">
      {toast ? <DemoToast message={toast} onDismiss={dismissToast} /> : null}

      <ScreenHeader
        title="Cost Match Center"
        subtitle="Match vendor invoice items to your POS products."
        rightSlot={<HeaderActions />}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card>
          <p className="text-xs text-[#6B7280]">Invoice items</p>
          <p className="mt-1 text-xl font-semibold">{costMatchSummary.invoiceItems}</p>
        </Card>
        <Card>
          <p className="text-xs text-[#6B7280]">Auto-matched</p>
          <p className="mt-1 text-xl font-semibold text-[#0F8A3B]">{costMatchSummary.autoMatched}</p>
        </Card>
        <Card>
          <p className="text-xs text-[#6B7280]">Needs review</p>
          <p className="mt-1 text-xl font-semibold text-[#D97706]">{costMatchSummary.needsReview}</p>
        </Card>
        <Card>
          <p className="text-xs text-[#6B7280]">Avg confidence</p>
          <p className="mt-1 text-xl font-semibold">{costMatchSummary.avgConfidence}%</p>
        </Card>
      </div>

      <div className="space-y-3">
        {rows.map((row) => (
          <MatchRow
            key={row.id}
            row={row}
            expanded={reviewId === row.id}
            onReview={() => setReviewId(reviewId === row.id ? null : row.id)}
            onAccept={() => acceptMatch(row.id)}
          />
        ))}
      </div>

      <Card className="bg-[#F8FAFC]">
        <h2 className="text-sm font-semibold text-[#111827]">Why matching matters</h2>
        <p className="mt-2 text-xs leading-relaxed text-[#374151]">
          POS reports show what sold. Vendor invoices show what it cost. StoreSense connects both so owners can detect
          margin drops, vendor cost increases, and products that should be repriced.
        </p>
      </Card>
    </div>
  );
}

function MatchRow({
  row,
  expanded,
  onReview,
  onAccept,
}: {
  row: CostMatch;
  expanded: boolean;
  onReview: () => void;
  onAccept: () => void;
}) {
  const isAccepted = row.actionLabel === "Accepted";
  const tone = row.status === "Review" ? "orange" : "green";

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#111827]">{row.invoiceItem}</p>
          <p className="mt-1 text-xs text-[#6B7280]">
            → <span className="font-medium text-[#0F8A3B]">{row.posProduct}</span>
          </p>
          <p className="mt-1 text-xs text-[#6B7280]">{row.vendor}</p>
        </div>
        <Badge text={row.status} tone={tone} />
      </div>
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-[#6B7280]">Confidence: <strong className="text-[#111827]">{row.confidence}%</strong></span>
        {isAccepted ? (
          <Badge text="Accepted" tone="green" />
        ) : row.status === "Review" ? (
          <button type="button" onClick={onReview} className="rounded-xl bg-[#FFF7ED] px-3 py-1.5 font-semibold text-[#D97706]">
            Review Match
          </button>
        ) : (
          <button type="button" onClick={onAccept} className="rounded-xl bg-[#ECFDF3] px-3 py-1.5 font-semibold text-[#0F8A3B]">
            Accept
          </button>
        )}
      </div>
      {expanded ? (
        <p className="mt-3 rounded-2xl bg-[#F9FAFB] p-3 text-xs text-[#374151]">
          Invoice line &quot;{row.invoiceItem}&quot; was matched to POS SKU &quot;{row.posProduct}&quot; using name and pack-size
          similarity. Confirm or remap in a full pilot.
        </p>
      ) : null}
    </Card>
  );
}
