"use client";

import Link from "next/link";
import { Card } from "./ui";

export function UpgradeCard({
  title,
  description,
  buttonText,
  onPreviewPro,
  href,
}: {
  title: string;
  description: string;
  buttonText: string;
  onPreviewPro?: () => void;
  href?: string;
}) {
  return (
    <Card className="border-[#0F8A3B]/30 bg-gradient-to-br from-[#ECFDF3] to-white">
      <div className="mb-2 inline-flex rounded-full bg-[#FFF7ED] px-2 py-0.5 text-[10px] font-semibold text-[#D97706]">Premium Feature</div>
      <h2 className="text-base font-semibold text-[#111827]">{title}</h2>
      <p className="mt-2 text-sm text-[#6B7280]">{description}</p>
      <div className="mt-4 rounded-2xl border border-[#E5E7EB] bg-white p-3 text-xs text-[#6B7280]">
        <p className="font-semibold text-[#111827]">Pro Plan</p>
        <p className="mt-1">$29 / month • Market benchmarks, competitor context, and analyst consultation (demo preview).</p>
      </div>
      {href ? (
        <Link
          href={href}
          className="mt-4 flex w-full items-center justify-center rounded-2xl bg-[#0F8A3B] py-3 text-sm font-semibold text-white"
        >
          {buttonText}
        </Link>
      ) : (
        <button
          type="button"
          className="mt-4 w-full rounded-2xl bg-[#0F8A3B] py-3 text-sm font-semibold text-white"
          onClick={onPreviewPro}
        >
          {buttonText}
        </button>
      )}
    </Card>
  );
}
