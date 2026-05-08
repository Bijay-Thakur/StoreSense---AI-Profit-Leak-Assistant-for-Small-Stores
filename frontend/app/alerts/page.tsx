import AlertsClient from "./alerts-client";
import { loadAlerts, loadProducts } from "@/src/data/loaders";

export default async function AlertsPage() {
  const [alerts, products] = await Promise.all([loadAlerts(), loadProducts()]);
  return <AlertsClient alerts={alerts} products={products} />;
}
