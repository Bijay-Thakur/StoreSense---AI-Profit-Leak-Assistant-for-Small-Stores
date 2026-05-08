"use client";

import { useState } from "react";
import { Card } from "./ui";
import { usePlan } from "./plan-provider";

export function AnalystConsultationCard() {
  const { isPro } = usePlan();
  const [msg, setMsg] = useState<string | null>(null);

  if (!isPro) return null;

  return (
    <Card className="relative border-[#0F8A3B]/25 bg-gradient-to-br from-[#ECFDF3] to-white">
      <h2 className="text-base font-semibold text-[#111827]">Talk to a Business Analyst</h2>
      <p className="mt-1 text-sm text-[#6B7280]">Get expert help reviewing pricing, inventory, invoices, and growth opportunities.</p>
      <ul className="mt-3 space-y-1.5 text-xs text-[#374151]">
        {[
          "Monthly store performance review",
          "Pricing and margin recommendations",
          "Reorder strategy review",
          "Vendor invoice and cost analysis",
          "Growth plan for the next 30 days",
        ].map((line) => (
          <li key={line} className="flex gap-2">
            <span className="text-[#0F8A3B]">•</span>
            {line}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="mt-4 w-full rounded-2xl bg-[#0F8A3B] py-3 text-sm font-semibold text-white transition hover:opacity-95 active:scale-[0.99]"
        onClick={() => {
          setMsg("Consultation scheduling is coming soon in the Pro version.");
          window.setTimeout(() => setMsg(null), 4000);
        }}
      >
        Schedule Consultation
      </button>
      {msg ? (
        <p className="mt-3 rounded-xl bg-white/90 px-3 py-2 text-center text-xs text-[#111827] ring-1 ring-[#E5E7EB]" role="status">
          {msg}
        </p>
      ) : null}
    </Card>
  );
}
