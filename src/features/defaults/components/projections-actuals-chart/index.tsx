import { ProjectionsActualsBarChart } from "./pa-bar-chart";

export function ProjectionsActualsChart() {
  return (
    <div className="p-6 relative flex flex-col gap-2 bg-primary-light rounded-[16px]">
      <h3 className="text-lg font-semibold text-card-foreground md:pr-6 md:border-r">
        Projections vs Actuals
      </h3>

      {/* Bar chart will go here */}
      <ProjectionsActualsBarChart />
    </div>
  );
}
