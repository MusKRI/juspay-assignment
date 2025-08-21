"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useTheme } from "next-themes";

// Generate data for 8 months with weekly revenue data
const generateChartData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const currentMonth = 3; // Simulating April (0-based index)

  // Predefined data that matches the chart pattern from the image
  const monthlyData = [
    { currentWeek: 13000, previousWeek: 8000 }, // Jan
    { currentWeek: 8000, previousWeek: 17000 }, // Feb
    { currentWeek: 9000, previousWeek: 17000 }, // Mar
    { currentWeek: 17000, previousWeek: 10000 }, // Apr
    { currentWeek: 20000, previousWeek: 12000 }, // May
    { currentWeek: 22000, previousWeek: 25000 }, // Jun
    { currentWeek: 18000, previousWeek: 22000 }, // Jul
    { currentWeek: 25000, previousWeek: 20000 }, // Aug
  ];

  return months.map((month, index) => ({
    month,
    currentWeek: monthlyData[index].currentWeek,
    previousWeek: monthlyData[index].previousWeek,
    isCurrentOrPast: index <= currentMonth,
    isFuture: index > currentMonth,
  }));
};

const chartData = generateChartData();

// Custom Legend Component
interface CustomLegendProps {
  payload?: any[];
}

const CustomLegend = ({ payload }: CustomLegendProps) => {
  const legendItems = [
    {
      value: "Current Week",
      colorClass: "bg-[#1c1c1c] dark:bg-[#c6c7f8]",
      amount: "$58,211",
    },
    {
      value: "Previous Week",
      colorClass: "bg-[#a8c5da]",
      amount: "$68,768",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      <h3 className="text-sm font-semibold text-card-foreground md:pr-6 md:border-r">
        Revenue
      </h3>
      <div className="flex items-center gap-4">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2 group">
            <div
              className={`size-[6px] rounded-full [transition:scale_200ms_ease-out] group-hover:scale-150 ${item.colorClass}`}
            />
            <span className="text-xs text-muted-foreground">{item.value}</span>
            <span className="text-xs font-semibold text-card-foreground">
              {item.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Custom Tooltip Component
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    // Find current week value from either continuous or dashed line
    const currentWeekValue =
      payload.find((p) => p.dataKey === "currentWeekContinuous")?.value ||
      payload.find((p) => p.dataKey === "currentWeekDashed")?.value ||
      payload.find((p) => p.dataKey === "currentWeek")?.value ||
      0;

    const previousWeekValue =
      payload.find((p) => p.dataKey === "previousWeek")?.value || 0;

    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 min-w-[200px]">
        <div className="text-xs font-medium text-card-foreground mb-3">
          {label} 2024
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-[#1c1c1c] dark:bg-[#c6c7f8]"></div>
              <span className="text-xs text-muted-foreground">
                Current Week
              </span>
            </div>
            <span className="text-xs font-medium text-card-foreground">
              ${currentWeekValue.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-[#a8c5da]"></div>
              <span className="text-xs text-muted-foreground">
                Previous Week
              </span>
            </div>
            <span className="text-xs font-medium text-card-foreground">
              ${previousWeekValue.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// Format Y-axis values
const formatYAxisTick = (value: number) => {
  if (value === 0) return "0";
  if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value.toString();
};

export function RevenueLineChart() {
  const { theme } = useTheme();

  const colors = {
    currentWeek: theme === "dark" ? "#c6c7f8" : "#1c1c1c",
    previousWeek: "#a8c5da",
  };

  const currentMonth = 3;

  const enhancedData = chartData.map((item, index) => ({
    ...item,
    currentWeekContinuous: index <= currentMonth ? item.currentWeek : null,
    currentWeekDashed: index >= currentMonth ? item.currentWeek : null,
  }));

  return (
    <div className="w-full flex flex-col gap-4">
      <CustomLegend />
      <div className="w-full h-[332px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={enhancedData}
            // margin={{
            //   top: 20,
            //   right: 30,
            //   left: 20,
            //   bottom: 20,
            // }}
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
              domain={[0, 30000]}
              ticks={[0, 10000, 20000, 30000]}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "transparent" }}
            />

            {/* Previous Week Line - Always continuous */}
            <Line
              type="monotone"
              dataKey="previousWeek"
              stroke={colors.previousWeek}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: colors.previousWeek }}
            />

            {/* Current Week Line - Continuous part (actual data) */}
            <Line
              type="monotone"
              dataKey="currentWeekContinuous"
              stroke={colors.currentWeek}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: colors.currentWeek }}
              connectNulls={false}
            />

            {/* Current Week Line - Dashed part (projected data) */}
            <Line
              type="monotone"
              dataKey="currentWeekDashed"
              stroke={colors.currentWeek}
              strokeWidth={3}
              strokeDasharray="8 8"
              dot={false}
              activeDot={{ r: 6, fill: colors.currentWeek }}
              connectNulls={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
