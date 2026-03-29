import { KPIValue } from "@/shared/components/dashboardblocks/kpi";
import IconFrame from "@/shared/components/icon-frame";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Typography } from "@/shared/components/ui/typography";
import { cn } from "@/shared/lib/utils";
import {
  RiCornerRightUpLine,
  type RemixiconComponentType,
} from "@remixicon/react";

export type TrendDirection = "up" | "down" | "same";

export interface TrendInfo {
  value: string;
  direction: TrendDirection;
}

export interface StatItem {
  label: string;
  value: string;
  icon: RemixiconComponentType;
  trend: TrendInfo;
}

const trendConfig: Record<
  TrendDirection,
  {
    badgeVariant: "success-light" | "destructive-light" | "secondary";
    rotation: string;
  }
> = {
  up: { badgeVariant: "success-light", rotation: "rotate-45" },
  down: { badgeVariant: "destructive-light", rotation: "-rotate-125" },
  same: { badgeVariant: "secondary", rotation: "rotate-0" },
};

const StatCard: React.FC<StatItem> = ({ label, value, icon: Icon, trend }) => {
  const { badgeVariant, rotation } = trendConfig[trend.direction];

  return (
    <Card className="border-border/40 shadow-none">
      <CardContent>
        {/* Label + icon — same visual weight, neither dominates */}
        <div className="flex items-center justify-between">
          <Typography variant="overline" className="text-xs font-medium" muted>
            {label}
          </Typography>

          <IconFrame>
            <Icon className={cn("text-primary size-5")} />
          </IconFrame>

          {/*<div className="ring-ring/20 rounded-full ring-2 ring-offset-8">
            <Icon className={cn("text-primary size-4")} />
          </div>*/}
        </div>

        {/* Value — the whole point */}
        <Typography
          variant="h2"
          className="text-3xl leading-none tracking-tight"
        >
          <KPIValue value={Number(value)} animated />
        </Typography>

        {/* Trend — quiet, contextual */}
        <div className="mt-2 flex items-center gap-1.5">
          <Badge
            variant={badgeVariant}
            className="gap-1 px-1.5 py-0 text-xs font-medium"
          >
            <RiCornerRightUpLine className={cn("size-3", rotation)} />
            {trend.value}
          </Badge>
          <Typography
            variant="label"
            className="text-muted-foreground/60 text-xs"
          >
            vs last period
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
