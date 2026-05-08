import { loadInvoices } from "@/src/data/loaders";
import InvoicesClient from "./invoices-client";

export default async function InvoicesPage() {
  const invoices = await loadInvoices();
  return <InvoicesClient invoices={invoices} />;
}
