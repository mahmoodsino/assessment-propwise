"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

interface SparklineChartProps {
  data: number[];
  color?: string;
}

export function SparklineChart({
  data,
  color = "#6366f1",
}: SparklineChartProps) {
  const chartData = data.map((value, i) => ({ i, value }));

  return (
    <ResponsiveContainer width="100%" height={20}>
      <AreaChart
        data={chartData}
        margin={{ top: 2, right: 0, left: 0, bottom: 2 }}
      >
        <defs>
          <linearGradient
            id={`spark-${color.replace("#", "")}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#spark-${color.replace("#", "")})`}
          dot={false}
          isAnimationActive
        />
        <Tooltip
          contentStyle={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
