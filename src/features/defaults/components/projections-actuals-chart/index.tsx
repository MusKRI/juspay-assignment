import * as m from "motion/react-client";

import { ProjectionsActualsBarChart } from "./pa-bar-chart";

export function ProjectionsActualsChart() {
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.2 }}
      className="p-6 relative flex flex-col gap-4 bg-primary-light rounded-[16px] flex-1"
    >
      <h3 className="text-sm font-semibold text-card-foreground">
        Projections vs Actuals
      </h3>

      {/* Bar chart will go here */}
      <ProjectionsActualsBarChart />
    </m.div>
  );
}
