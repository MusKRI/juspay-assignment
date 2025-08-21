"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useTheme } from "next-themes";
import * as m from "motion/react-client";

import { formatCurrency } from "@/lib/currency-utils";

interface SalesData {
  name: string;
  value: number;
  color: string;
  darkColor: string;
}

const salesData: SalesData[] = [
  {
    name: "Direct",
    value: 300.56,
    color: "#333333",
    darkColor: "#c6c7f8",
  },
  {
    name: "Affiliate",
    value: 135.18,
    color: "#c1efc4",
    darkColor: "#baedbd",
  },
  {
    name: "Sponsored",
    value: 154.02,
    color: "#a0adfc",
    darkColor: "#95a4fc",
  },
  {
    name: "E-mail",
    value: 48.96,
    color: "#b9e6ff",
    darkColor: "#b1e3ff",
  },
];

const totalValue = salesData.reduce((sum, item) => sum + item.value, 0);
const largestSegment = salesData.reduce((prev, current) =>
  prev.value > current.value ? prev : current
);
const largestPercentage = ((largestSegment.value / totalValue) * 100).toFixed(
  1
);

export function TotalSalesChart() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 1 }}
      className="p-6 relative flex flex-col gap-4 bg-primary-light rounded-[16px]"
    >
      <h3 className="text-sm font-semibold text-card-foreground">
        Total Sales
      </h3>

      <div className="flex flex-col items-center justify-between">
        <div className="relative w-[200px] h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={salesData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                startAngle={90}
                endAngle={450}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
                cornerRadius={8}
              >
                {salesData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={isDarkMode ? entry.darkColor : entry.color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-card-foreground">
              {largestPercentage}%
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 ml-8 max-w-[300px] w-full">
          {salesData.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: isDarkMode ? item.darkColor : item.color,
                }}
              />
              <div className="flex items-center justify-between w-full min-w-[120px]">
                <span className="text-card-foreground text-xs">
                  {item.name}
                </span>
                <span className="text-card-foreground text-xs">
                  {formatCurrency(item.value)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </m.div>
  );
}
