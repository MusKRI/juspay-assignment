import * as m from "motion/react-client";

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
        <m.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-[15px] font-semibold"
        >
          eCommerce
        </m.h3>
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
