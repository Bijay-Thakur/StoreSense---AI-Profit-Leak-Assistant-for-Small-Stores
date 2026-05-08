"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Bell, FileText, House, Package, Square } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: House },
  { href: "/sales", label: "Sales", icon: BarChart3 },
  { href: "/products", label: "Reorder Plan", icon: Package, center: true },
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/alerts", label: "Alerts", icon: Bell, badge: "2" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginRoute = pathname === "/login";

  if (isLoginRoute) {
    return <div className="min-h-dvh bg-[#F9FAFB]">{children}</div>;
  }

  return (
    <div className="mx-auto min-h-dvh w-full bg-[#F9FAFB] md:max-w-6xl md:px-6">
      <nav className="fixed bottom-0 left-0 right-0 z-40 mx-auto flex w-full max-w-[460px] items-center justify-between border-t border-[#E5E7EB] bg-white/95 px-3 pb-4 pt-3 backdrop-blur sm:px-4 sm:pb-5 md:sticky md:top-4 md:mx-0 md:mt-4 md:max-w-none md:rounded-2xl md:border md:px-5 md:py-3 md:shadow-sm md:backdrop-blur-0">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === "/products" && pathname.startsWith("/products/"));
          const Icon = item.icon;
          if (item.center) {
            return (
              <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1">
                <div className="relative flex h-14 w-14 -translate-y-5 items-center justify-center rounded-full bg-[#0F8A3B] text-white shadow-lg shadow-green-200 md:h-10 md:w-10 md:translate-y-0 md:rounded-xl md:shadow-sm md:shadow-green-100">
                  <Square className="absolute h-7 w-7 opacity-35" aria-hidden />
                  <Icon className="relative z-10 h-5 w-5 md:h-4 md:w-4" />
                </div>
                <span className={`text-xs font-medium ${isActive ? "text-[#0F8A3B]" : "text-[#6B7280]"}`}>{item.label}</span>
              </Link>
            );
          }

          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1">
              <div className="relative">
                <Icon className={`h-5 w-5 ${isActive ? "text-[#0F8A3B]" : "text-[#9CA3AF]"}`} />
                {item.badge ? (
                  <span className="absolute -right-2 -top-2 rounded-full bg-[#DC2626] px-1.5 py-0.5 text-[10px] text-white">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className={`text-xs ${isActive ? "font-semibold text-[#0F8A3B]" : "text-[#6B7280]"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
      <main className="px-3 pb-28 pt-4 sm:px-4 sm:pt-6 md:px-1 md:pb-10 md:pt-6">{children}</main>
    </div>
  );
}
