import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { Card } from "./ui";

export function ToolCard({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  href: string;
  icon?: LucideIcon;
}) {
  return (
    <Link href={href} className="block">
      <Card className="transition hover:border-[#0F8A3B]/40 hover:bg-[#FAFFFC]">
        <div className="flex items-start gap-3">
          {Icon ? (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#ECFDF3] text-[#0F8A3B]">
              <Icon className="h-5 w-5" />
            </div>
          ) : null}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-[#111827]">{title}</p>
            <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">{description}</p>
          </div>
          <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-[#9CA3AF]" />
        </div>
      </Card>
    </Link>
  );
}
