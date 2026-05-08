"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function ProfileAvatarButton({ initials = "SM" }: { initials?: string }) {
  const pathname = usePathname();
  const active = pathname === "/profile";

  return (
    <Link
      href="/profile"
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition hover:opacity-90 active:scale-95 ${
        active
          ? "border-[#0F8A3B] bg-[#ECFDF3] text-[#0F8A3B]"
          : "border-[#E5E7EB] bg-[#ECFDF3] text-[#0F8A3B]"
      }`}
      aria-label="Profile and settings"
    >
      {initials}
    </Link>
  );
}
