import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Typography } from "@/shared/components/ui/typography";
import { lazy, Suspense } from "react";
import { TrendSparkline } from "./trend";
import { KPIValue } from "@/shared/components/dashboardblocks/kpi";

const PieChart = lazy(() => import("@/shared/components/chart/pie-chart"));

const INSURANCE_DATA = [
  {
    key: "active",
    label: "Active",
    value: 680,
    color: "var(--success)",
  },
  {
    key: "expired",
    label: "Expired",
    value: 320,
    color: "var(--destructive)",
  },
];

export default function PolicyOverview() {
  return (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle>Policy Overview</CardTitle>
        <CardDescription className="sr-only">
          Overview of your insurance policy portfolio.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex h-full flex-col flex-wrap gap-4 sm:flex-row">
        <Suspense fallback={<Skeleton className="h-52 flex-1" />}>
          <PieChart
            data={INSURANCE_DATA}
            label="Total Policies"
            innerRadius={60}
            outerRadius={80}
            className="mx-none h-52 flex-1"
          />
        </Suspense>

        <Separator orientation="vertical" />

        <div className="flex flex-1 flex-col justify-center gap-3 px-4">
          <div className="flex items-center gap-1.5">
            <div className="bg-success size-2.5 shrink-0 rounded-full"></div>
            <Typography className="text-success-foreground" variant="caption">
              Active
            </Typography>
          </div>

          <Typography variant="h1" as="p">
            <KPIValue value={950} animated />
          </Typography>

          <Badge variant="success-light">95%</Badge>

          <div className="flex flex-col">
            <Typography variant="caption" muted>
              policies in force
            </Typography>

            <TrendSparkline direction="up" />
          </div>
        </div>

        <Separator
          orientation="vertical"
          className="bg-card border border-dashed"
        />

        <div className="flex flex-1 flex-col justify-center gap-3 px-4">
          <div className="flex items-center gap-1.5">
            <div className="bg-destructive size-2.5 shrink-0 rounded-full"></div>
            <Typography
              className="text-destructive-foreground"
              variant="caption"
            >
              Expired
            </Typography>
          </div>

          <Typography variant="h1" as="p">
            <KPIValue value={50} animated />
          </Typography>

          <Badge variant="destructive-light">5%</Badge>

          <div className="flex flex-col">
            <Typography variant="caption" muted>
              lapsed or expired
            </Typography>

            <TrendSparkline direction="down" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
