import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type BadgeTone = "green" | "red" | "orange" | "blue" | "gray";

const badgeTones: Record<BadgeTone, string> = {
  green: "bg-[#ECFDF3] text-[#0F8A3B]",
  red: "bg-[#FEF2F2] text-[#DC2626]",
  orange: "bg-[#FFF7ED] text-[#F59E0B]",
  blue: "bg-blue-50 text-blue-700",
  gray: "bg-gray-100 text-gray-700",
};

export function ScreenHeader({
  title,
  subtitle,
  rightSlot,
}: {
  title: string;
  subtitle: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <header className="flex items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[#111827]">{title}</h1>
        <p className="mt-1 text-sm text-[#6B7280]">{subtitle}</p>
      </div>
      {rightSlot}
    </header>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={`rounded-3xl border border-[#E5E7EB] bg-white p-4 shadow-sm ${className}`}>{children}</section>;
}

export function Badge({ text, tone = "gray" }: { text: string; tone?: BadgeTone }) {
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${badgeTones[tone]}`}>{text}</span>;
}

export function ProductAvatar({ image, name }: { image: string; name: string }) {
  return (
    <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white" aria-label={`${name} image`}>
      <Image src={image} alt={name} fill className="object-cover" sizes="48px" />
    </div>
  );
}

export function ProductRow({
  name,
  subtitle,
  image,
  trailing,
  href,
}: {
  name: string;
  subtitle: string;
  image: string;
  trailing?: React.ReactNode;
  href?: string;
}) {
  const content = (
    <div className="flex items-center justify-between rounded-2xl border border-[#E5E7EB] p-3 transition hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <ProductAvatar image={image} name={name} />
        <div>
          <p className="text-sm font-medium text-[#111827]">{name}</p>
          <p className="text-xs text-[#6B7280]">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {trailing}
        {href ? <ChevronRight className="h-4 w-4 text-[#9CA3AF]" /> : null}
      </div>
    </div>
  );

  if (!href) return content;
  return <Link href={href}>{content}</Link>;
}
