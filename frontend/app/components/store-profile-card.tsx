import { Card } from "./ui";
import type { StoreProfile } from "@/src/data/storeProfile";

export function StoreProfileCard({ profile }: { profile: StoreProfile }) {
  const rows: { label: string; value: string }[] = [
    { label: "Store name", value: profile.store_name },
    { label: "Owner", value: profile.owner_name },
    { label: "Store type", value: profile.store_type },
    { label: "Address", value: profile.address },
    { label: "Email", value: profile.email },
    { label: "Phone", value: profile.phone },
    { label: "POS status", value: profile.pos_status },
    { label: "Invoice tracking", value: profile.invoice_tracking_status },
  ];

  return (
    <Card>
      <h2 className="text-base font-semibold text-[#111827]">Store profile</h2>
      <p className="mt-1 text-xs text-[#6B7280]">Demo store information</p>
      <dl className="mt-4 space-y-3">
        {rows.map((r) => (
          <div key={r.label} className="flex flex-col gap-0.5 border-b border-[#F3F4F6] pb-3 last:border-0 last:pb-0">
            <dt className="text-[11px] font-medium uppercase tracking-wide text-[#9CA3AF]">{r.label}</dt>
            <dd className="text-sm text-[#111827]">{r.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
