import { CustomerSummaryCard } from "./customer-summary-card";
import { GrowthSummaryCard } from "./growth-summary-card";
import { OrderSummaryCard } from "./order-summary-card";
import { RevenueSummaryCard } from "./revenue-sumary-card";

export function StatSummaryCards() {
  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
      <CustomerSummaryCard />
      <OrderSummaryCard />
      <RevenueSummaryCard />
      <GrowthSummaryCard />
    </div>
  );
}
