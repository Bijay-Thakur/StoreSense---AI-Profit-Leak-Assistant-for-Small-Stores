import { vendors } from "./vendors";

export function vendorSlugFromName(vendorName: string): string | null {
  return vendors.find((v) => v.name === vendorName)?.slug ?? null;
}

export function vendorHrefFromName(vendorName: string): string {
  const slug = vendorSlugFromName(vendorName);
  return slug ? `/vendors/${slug}` : "/vendors";
}
