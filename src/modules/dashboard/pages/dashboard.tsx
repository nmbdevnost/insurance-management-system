import PieChart from "@/shared/components/chart/pie-chart";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/shared/components/ui/item";
import { Separator } from "@/shared/components/ui/separator";
import { cn } from "@/shared/lib/utils";
import { generateGoldenRatioColor } from "@/shared/lib/utils/color";
import {
  RiAlertLine,
  RiArrowRightSLine,
  RiBankLine,
  RiFileCloseLine,
  RiFileListLine,
  RiGroupLine,
  RiShieldCheckLine,
  RiTimeLine,
} from "@remixicon/react";
import StatCard, { type StatItem } from "../components/stat-card";
import { Typography } from "@/shared/components/ui/typography";

interface PolicyBar {
  label: string;
  value: number;
  total: number;
  barColor: string;
}

const STATS: StatItem[] = [
  {
    label: "Total Policies",
    value: "1,000",
    icon: RiFileListLine,
    trend: "+12%",
    up: true,
    borderColor: "border-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    badgeBg: "bg-primary/10",
    badgeText: "text-primary",
  },
  {
    label: "Expiring Soon",
    value: "200",
    icon: RiTimeLine,
    trend: "+5%",
    up: true,
    borderColor: "border-warning",
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
    badgeBg: "bg-warning/10",
    badgeText: "text-warning",
  },
  {
    label: "Payment Failures",
    value: "4",
    icon: RiAlertLine,
    trend: "-2",
    up: false,
    borderColor: "border-destructive",
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
    badgeBg: "bg-destructive/10",
    badgeText: "text-destructive",
  },
  {
    label: "Active Policies",
    value: "950",
    icon: RiShieldCheckLine,
    trend: "+8%",
    up: true,
    borderColor: "border-success",
    iconBg: "bg-emerald-50",
    iconColor: "text-success",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
  },
  {
    label: "Expired Policies",
    value: "50",
    icon: RiFileCloseLine,
    trend: "-3%",
    up: false,
    borderColor: "border-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    badgeBg: "bg-primary/10",
    badgeText: "text-primary",
  },
  {
    label: "Bank Induced",
    value: "600",
    icon: RiBankLine,
    trend: "+15%",
    up: true,
    borderColor: "border-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    badgeBg: "bg-primary/10",
    badgeText: "text-primary",
  },
];

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

const POLICY_BARS: PolicyBar[] = [
  {
    label: "Active Policies",
    value: 950,
    total: 1000,
    barColor: "bg-success",
  },
  { label: "Client Induced", value: 400, total: 1000, barColor: "bg-blue-400" },
  { label: "Bank Induced", value: 600, total: 1000, barColor: "bg-violet-400" },
  { label: "Expiring Soon", value: 200, total: 1000, barColor: "bg-amber-400" },
  { label: "Expired", value: 50, total: 1000, barColor: "bg-slate-400" },
];

const InsuranceTypeCard = () => {
  const total = INSURANCE_DATA.reduce((s, d) => s + d.value, 0);
  const max = Math.max(...INSURANCE_DATA.map((d) => d.value));

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle className="text-base font-bold tracking-tight">
            Insurance Portfolio
          </CardTitle>
          <CardDescription className="text-xs">
            Distribution by type
          </CardDescription>
        </div>

        <Badge variant="info-light">{total.toLocaleString()} Total</Badge>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-4">
        <PieChart
          data={INSURANCE_DATA}
          label="Policies"
          className="w-45"
          innerRadius={60}
          outerRadius={80}
        />

        <div className="min-w-40 flex-1 space-y-4">
          {INSURANCE_DATA.map((item, index) => {
            return (
              <div key={item.label}>
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

                <div className="bg-muted h-1.5 overflow-hidden rounded-full">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-700"
                    )}
                    style={{
                      width: `${(item.value / max) * 100}%`,
                      backgroundColor: generateGoldenRatioColor({ index }),
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

const PolicyOverviewCard = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-base font-bold tracking-tight">
        Policy Breakdown
      </CardTitle>
      <CardDescription className="text-xs">
        Status across all policies
      </CardDescription>
    </CardHeader>

    <CardContent className="flex flex-col gap-4">
      {POLICY_BARS.map((item, index) => (
        <div key={item.label}>
          <div className="flex items-baseline justify-between">
            <span className="text-muted-foreground text-xs font-medium">
              {item.label}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-foreground text-[13px] font-bold">
                {item.value.toLocaleString()}
              </span>
              <span className="text-muted-foreground/50 text-[11px]">
                / {item.total.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="bg-muted h-1.5 overflow-hidden rounded-full">
            <div
              className={cn("h-full rounded-full transition-all duration-700")}
              style={{
                width: `${(item.value / item.total) * 100}%`,
                backgroundColor: generateGoldenRatioColor({
                  index,
                  startHue: 120,
                }),
              }}
            />
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);

export const DashboardPage = () => (
  <>
    <div>
      <Typography variant="h3" as="h1">
        Dashboard
      </Typography>
      <Typography muted>
        Overview of your insurance policy portfolio.
      </Typography>
    </div>

    {/* KPI grid */}
    <div className="grid grid-cols-3 gap-4">
      {STATS.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>

    {/* Charts */}
    <div className="grid grid-cols-2 gap-4">
      <InsuranceTypeCard />
      <PolicyOverviewCard />
    </div>

    {/* Action panels */}
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
              <RiGroupLine className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base font-bold tracking-tight">
                Client-Induced Insurance
              </CardTitle>
              <CardDescription className="text-xs">
                Process policies submitted by clients.
              </CardDescription>
            </div>
            <Badge variant="primary-light" className="whitespace-nowrap">
              400 Policies
            </Badge>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="flex flex-col items-center gap-4">
          <Item size="xs">
            <ItemContent>
              <ItemTitle>Record Policy</ItemTitle>
              <ItemDescription>
                Enter policy information from client submissions.
              </ItemDescription>
            </ItemContent>

            <ItemActions>
              <Button size="sm">
                Start
                <RiArrowRightSLine />
              </Button>
            </ItemActions>
          </Item>

          <Separator />

          <Item size="xs">
            <ItemContent>
              <ItemTitle>View Submitted Policies</ItemTitle>
              <ItemDescription>
                Review and manage client-provided insurance.
              </ItemDescription>
            </ItemContent>

            <ItemActions>
              <Button size="sm" variant="secondary">
                View Policies
                <RiArrowRightSLine />
              </Button>
            </ItemActions>
          </Item>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
              <RiBankLine className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base font-bold tracking-tight">
                Bank-Induced Insurance
              </CardTitle>
              <CardDescription className="text-xs">
                Manage policies provided by the bank.
              </CardDescription>
            </div>
            <Badge variant="primary-light" className="whitespace-nowrap">
              600 Policies
            </Badge>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="flex flex-col items-center gap-4">
          <Item size="xs">
            <ItemContent>
              <ItemTitle>Record Policy</ItemTitle>
              <ItemDescription>
                Enter asset details and process premium payment.
              </ItemDescription>
            </ItemContent>

            <ItemActions>
              <Button size="sm">
                Initiate New
                <RiArrowRightSLine />
              </Button>
            </ItemActions>
          </Item>

          <Separator />

          <Item size="xs">
            <ItemContent>
              <ItemTitle>Manage Bank Policies</ItemTitle>
              <ItemDescription>
                View and track bank-provided insurance.
              </ItemDescription>
            </ItemContent>

            <ItemActions>
              <Button size="sm" variant="secondary">
                View Policies
                <RiArrowRightSLine />
              </Button>
            </ItemActions>
          </Item>
        </CardContent>
      </Card>
    </div>
  </>
);
