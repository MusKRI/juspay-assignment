import * as m from "motion/react-client";

import { RevenueLineChart } from "./revenue-line-chart";

export function RevenueChart() {
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.4 }}
      className="p-6 relative flex flex-col gap-2 bg-primary-light rounded-[16px]"
    >
      <RevenueLineChart />
    </m.div>
  );
}
