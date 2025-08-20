"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useTheme } from "next-themes";

const chartData = [
  {
    month: "Jan",
    projections: 15.2,
    actuals: 4.8,
  },
  {
    month: "Feb",
    projections: 18.5,
    actuals: 6.5,
  },
  {
    month: "Mar",
    projections: 15.0,
    actuals: 6.0,
  },
  {
    month: "Apr",
    projections: 20.2,
    actuals: 7.8,
  },
  {
    month: "May",
    projections: 12.0,
    actuals: 6.0,
  },
  {
    month: "Jun",
    projections: 18.5,
    actuals: 7.5,
  },
];

const formatYAxisTick = (value: number) => {
  if (value === 0) return "0";
  return `${value}M`;
};

const formatXAxisTick = (value: string) => {
  return value;
};

// Custom Tooltip Component
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const projectionsValue =
      payload.find((p) => p.dataKey === "projections")?.value || 0;
    const actualsValue =
      payload.find((p) => p.dataKey === "actuals")?.value || 0;
    const totalValue = projectionsValue + actualsValue;

    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 min-w-[180px]">
        <div className="text-sm font-medium text-card-foreground mb-3">
          {label}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#a8c5da]"></div>
              <span className="text-sm text-muted-foreground">Projections</span>
            </div>
            <span className="text-sm font-medium text-card-foreground">
              {projectionsValue.toFixed(1)}M
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#d0dfeb] dark:bg-[#687681]"></div>
              <span className="text-sm text-muted-foreground">Actuals</span>
            </div>
            <span className="text-sm font-medium text-card-foreground">
              {actualsValue.toFixed(1)}M
            </span>
          </div>
          <div className="border-t border-border pt-2 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-card-foreground">
                Total
              </span>
              <span className="text-sm font-semibold text-card-foreground">
                {totalValue.toFixed(1)}M
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export function ProjectionsActualsBarChart() {
  const { theme } = useTheme();

  const colors = {
    projections: theme === "dark" ? "#a8c5da" : "#a8c5da",
    actuals: theme === "dark" ? "#687681" : "#d0dfeb",
  };

  return (
    <div className="w-full min-h-[300px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          // margin={{
          //   top: 10,
          //   right: 20,
          //   left: 10,
          //   bottom: 5,
          // }}
          barCategoryGap="30%"
        >
          <CartesianGrid
            strokeDasharray="none"
            stroke="var(--border)"
            strokeOpacity={1}
            horizontal={true}
            vertical={false}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "var(--muted-foreground)",
              fontSize: 13,
              fontWeight: 400,
            }}
            tickFormatter={formatXAxisTick}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "var(--muted-foreground)",
              fontSize: 13,
              fontWeight: 400,
            }}
            tickFormatter={formatYAxisTick}
            domain={[0, 30]}
            ticks={[0, 10, 20, 30]}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
          <Bar
            dataKey="projections"
            stackId="a"
            fill={colors.projections}
            radius={[0, 0, 0, 0]}
            stroke="transparent"
          />
          <Bar
            dataKey="actuals"
            stackId="a"
            fill={colors.actuals}
            radius={[8, 8, 0, 0]}
            stroke="transparent"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
