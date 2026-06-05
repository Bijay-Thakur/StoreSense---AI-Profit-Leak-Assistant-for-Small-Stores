"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { BarChart3, Bell, FileText, House, ListChecks, Sparkles, Square } from "lucide-react";
import { AppBootOverlay } from "./app-boot-overlay";

const navItems = [
  { href: "/", label: "Home", icon: House },
  { href: "/sales", label: "Sales", icon: BarChart3 },
  { href: "/actions", label: "Actions", icon: ListChecks, center: true },
  { href: "/ai-insights", label: "AI", icon: Sparkles },
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/alerts", label: "Alerts", icon: Bell, badge: "2" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const prefetchAll = () => {
      navItems.forEach((item) => router.prefetch(item.href));
    };
    prefetchAll();
    const idle = window.requestIdleCallback?.(prefetchAll) ?? window.setTimeout(prefetchAll, 200);
    return () => {
      if (typeof idle === "number") window.clearTimeout(idle);
      else window.cancelIdleCallback?.(idle);
    };
  }, [router]);

  return (
    <div className="mx-auto min-h-dvh w-full max-w-full overflow-x-hidden bg-[#F9FAFB] md:max-w-6xl md:px-6">
      <AppBootOverlay />
      <nav className="fixed bottom-0 left-0 right-0 z-40 mx-auto flex w-full max-w-full items-center justify-evenly border-t border-[#E5E7EB] bg-white/95 px-0.5 pb-3 pt-2 backdrop-blur sm:px-2 sm:pb-4 md:sticky md:top-4 md:mx-0 md:mt-4 md:max-w-none md:justify-between md:rounded-2xl md:border md:px-5 md:py-3 md:shadow-sm md:backdrop-blur-0 md:pb-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href === "/actions" && (pathname === "/actions" || pathname.startsWith("/cost-match"))) ||
            (item.href === "/ai-insights" && pathname.startsWith("/ai-insights")) ||
            (item.href === "/invoices" && pathname.startsWith("/invoices"));
          const Icon = item.icon;
          if (item.center) {
            return (
              <Link key={item.href} href={item.href} prefetch className="flex min-w-0 flex-1 flex-col items-center gap-0.5">
                <div className="relative flex h-11 w-11 -translate-y-3 items-center justify-center rounded-full bg-[#0F8A3B] text-white shadow-lg shadow-green-200 sm:h-12 sm:w-12 sm:-translate-y-4 md:h-10 md:w-10 md:translate-y-0 md:rounded-xl md:shadow-sm md:shadow-green-100">
                  <Square className="absolute h-6 w-6 opacity-35 sm:h-7 sm:w-7" aria-hidden />
                  <Icon className="relative z-10 h-4 w-4 sm:h-5 sm:w-5 md:h-4 md:w-4" />
                </div>
                <span className={`max-w-[3.5rem] truncate text-[9px] font-medium sm:max-w-none sm:text-xs ${isActive ? "text-[#0F8A3B]" : "text-[#6B7280]"}`}>{item.label}</span>
              </Link>
            );
          }

          return (
            <Link key={item.href} href={item.href} prefetch className="flex min-w-0 flex-1 flex-col items-center gap-0.5 px-0.5">
              <div className="relative">
                <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${isActive ? "text-[#0F8A3B]" : "text-[#9CA3AF]"}`} />
                {item.badge ? (
                  <span className="absolute -right-2 -top-2 rounded-full bg-[#DC2626] px-1.5 py-0.5 text-[10px] text-white">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className={`max-w-[3.25rem] truncate text-[9px] sm:max-w-none sm:text-[10px] md:text-xs ${isActive ? "font-semibold text-[#0F8A3B]" : "text-[#6B7280]"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
      <main className="max-w-full overflow-x-hidden px-3 pb-24 pt-4 sm:px-4 sm:pb-28 sm:pt-6 md:px-1 md:pb-10 md:pt-6">{children}</main>
    </div>
  );
}
