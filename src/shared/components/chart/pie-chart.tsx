"use client";

import * as React from "react";
import { Label, Pie, PieChart as RePieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/components/ui/chart";
import { cn } from "@/shared/lib/utils";
import { generateGoldenRatioColor } from "@/shared/lib/utils/color";
import type { PolarViewBox } from "recharts/types/util/types";

type RawChartData = {
  label: string;
  icon?: React.ComponentType;
  key: string;
  value: number;
};

type ChartData = {
  fill: string;
  label: string;
  key: string;
  value: number;
  icon?: React.ComponentType;
};

type PieChartProps = {
  data: RawChartData[];
  label?: string | ((viewBox: PolarViewBox) => React.ReactNode);
  className?: string;
  innerRadius?: number;
  outerRadius?: number;
};

const PieChart: React.FC<PieChartProps> = ({
  data,
  label,
  className,
  innerRadius = 60,
  outerRadius,
}) => {
  const chartData: ChartData[] = React.useMemo(
    () =>
      data.map((item) => ({
        ...item,
        fill: `var(--color-${item.key})`,
      })),
    [data]
  );

  const chartConfig = React.useMemo(() => {
    return chartData.reduce((prev, data, index) => {
      return {
        ...prev,
        [data.key]: {
          label: data.label,
          icon: data.icon,
          color: generateGoldenRatioColor({ index }),
        },
      };
    }, {}) satisfies ChartConfig;
  }, [chartData]);

  const total = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.value, 0);
  }, [data]);

  return (
    <ChartContainer
      config={chartConfig}
      className={cn("mx-auto aspect-square", className)}
    >
      <RePieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />

        <Pie
          data={chartData}
          dataKey="value"
          nameKey="key"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          strokeWidth={5}
        >
          {label && (
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  if (typeof label === "string") {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total.toLocaleString()}
                        </tspan>

                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {label}
                        </tspan>
                      </text>
                    );
                  }

                  return label(viewBox);
                }
              }}
            />
          )}
        </Pie>
      </RePieChart>
    </ChartContainer>
  );
};

export default PieChart;
