import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { lazy, Suspense, type FC } from "react";

const PieChart = lazy(() => import("@/shared/components/chart/pie-chart"));
const AnimatedBar = lazy(
  () => import("@/shared/components/chart/animated-bar")
);

const INSURANCE_DATA = [
  {
    key: "building",
    label: "Building",
    value: 200,
  },
  {
    key: "vehicle",
    label: "Vehicle",
    value: 300,
  },
  {
    key: "fixed-assets",
    label: "Fixed Assets C.",
    value: 300,
  },
  {
    key: "stock",
    label: "Stock",
    value: 150,
  },
  {
    key: "solar-home",
    label: "Solar Home",
    value: 50,
  },
];

const InsuranceDistribution: FC = () => {
  const total = INSURANCE_DATA.reduce((s, d) => s + d.value, 0);
  const max = Math.max(...INSURANCE_DATA.map((d) => d.value));

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle className="text-base font-bold tracking-tight">
            Insurance Portfolio
          </CardTitle>
          <CardDescription>Distribution by type</CardDescription>
        </div>

        <Badge variant="info-light">{total.toLocaleString()} Total</Badge>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-4">
        <Suspense fallback={<Skeleton className="h-45 w-45" />}>
          <PieChart
            data={INSURANCE_DATA}
            label="Policies"
            className="w-45"
            innerRadius={60}
            outerRadius={80}
          />
        </Suspense>

        <div className="min-w-32 flex-1 space-y-4">
          <Suspense fallback={<Skeleton className="h-full w-full" />}>
            {INSURANCE_DATA.map((item, index) => {
              return (
                <div key={item.key}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-muted-foreground text-xs font-medium">
                      {item.label}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-foreground text-[13px] font-bold">
                        {item.value.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <AnimatedBar value={(item.value / max) * 100} index={index} />
                </div>
              );
            })}
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsuranceDistribution;
