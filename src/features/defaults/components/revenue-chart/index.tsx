import { RevenueLineChart } from "./revenue-line-chart";

export function RevenueChart() {
  return (
    <div className="p-6 relative flex flex-col gap-2 bg-primary-light rounded-[16px]">
      <RevenueLineChart />
    </div>
  );
}
