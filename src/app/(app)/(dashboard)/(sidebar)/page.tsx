import {
  ProjectionsActualsChart,
  RevenueByLocation,
  RevenueChart,
  StatSummaryCards,
  TopSellingProducts,
  TotalSalesChart,
} from "@/features/defaults/components";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative p-1">
        <h3 className="text-[15px] font-semibold">eCommerce</h3>
      </div>

      <div className="flex flex-col gap-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          <StatSummaryCards />
          <ProjectionsActualsChart />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[3fr_1.5fr] gap-7">
          <RevenueChart />
          <RevenueByLocation />
          <TopSellingProducts />
          <TotalSalesChart />
        </div>
      </div>
    </div>
  );
}
