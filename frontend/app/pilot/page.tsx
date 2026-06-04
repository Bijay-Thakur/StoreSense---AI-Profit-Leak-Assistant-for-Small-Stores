"use client";

import { useCallback, useState } from "react";
import { DemoToast } from "../components/demo-toast";
import { HeaderActions } from "../components/header-actions";
import { Card, ScreenHeader } from "../components/ui";

const storeTypes = ["Grocery", "Deli", "Cafe", "Convenience", "Specialty food"] as const;
const posOptions = ["MCR POS", "Square", "Clover", "Shopify POS", "Other"] as const;

const forStores = ["Grocery stores", "Delis", "Cafes", "Convenience stores", "Specialty food stores"];

const pilotBenefits = [
  "POS report import support",
  "Invoice tracking setup",
  "Weekly owner brief",
  "Profit-leak review",
  "Reorder recommendations",
  "Optional analyst feedback",
];

export default function PilotPage() {
  const [toast, setToast] = useState<string | null>(null);
  const dismissToast = useCallback(() => setToast(null), []);
  const [form, setForm] = useState<{
    storeName: string;
    ownerName: string;
    email: string;
    phone: string;
    storeType: string;
    pos: string;
    challenge: string;
  }>({
    storeName: "",
    ownerName: "",
    email: "",
    phone: "",
    storeType: storeTypes[0],
    pos: posOptions[0],
    challenge: "",
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setToast("Pilot request captured for demo. In production, this would be sent to the StoreSense team.");
  }

  return (
    <div className="space-y-4">
      {toast ? <DemoToast message={toast} onDismiss={dismissToast} /> : null}

      <ScreenHeader
        title="Request Pilot Access"
        subtitle="Help us test StoreSense with real local businesses."
        rightSlot={<HeaderActions />}
      />

      <Card>
        <h2 className="text-sm font-semibold">Who this is for</h2>
        <ul className="mt-2 space-y-1 text-xs text-[#374151]">
          {forStores.map((s) => (
            <li key={s} className="flex gap-2">
              <span className="text-[#0F8A3B]">•</span>
              {s}
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="text-sm font-semibold">What pilot stores get</h2>
        <ul className="mt-2 space-y-1 text-xs text-[#374151]">
          {pilotBenefits.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="text-[#0F8A3B]">✓</span>
              {b}
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <form onSubmit={submit} className="space-y-3">
          <Field label="Store name" value={form.storeName} onChange={(v) => setForm((f) => ({ ...f, storeName: v }))} />
          <Field label="Owner name" value={form.ownerName} onChange={(v) => setForm((f) => ({ ...f, ownerName: v }))} />
          <Field label="Email" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
          <Field label="Phone" type="tel" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} />
          <label className="block text-xs font-medium text-[#374151]">
            Store type
            <select
              className="mt-1 w-full rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm"
              value={form.storeType}
              onChange={(e) => setForm((f) => ({ ...f, storeType: e.target.value }))}
            >
              {storeTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-medium text-[#374151]">
            Current POS system
            <select
              className="mt-1 w-full rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm"
              value={form.pos}
              onChange={(e) => setForm((f) => ({ ...f, pos: e.target.value }))}
            >
              {posOptions.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-medium text-[#374151]">
            Biggest challenge
            <textarea
              className="mt-1 w-full rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm"
              rows={3}
              value={form.challenge}
              onChange={(e) => setForm((f) => ({ ...f, challenge: e.target.value }))}
            />
          </label>
          <button type="submit" className="w-full rounded-2xl bg-[#0F8A3B] py-3 text-sm font-semibold text-white">
            Join Pilot Waitlist
          </button>
        </form>
      </Card>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block text-xs font-medium text-[#374151]">
      {label}
      <input
        type={type}
        required
        className="mt-1 w-full rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
