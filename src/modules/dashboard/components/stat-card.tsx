import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import {
  RiArrowRightDownLine,
  RiArrowRightUpLine,
  type RemixiconComponentType,
} from "@remixicon/react";

export interface StatItem {
  label: string;
  value: string;
  icon: RemixiconComponentType;
  trend: string;
  up: boolean;
  /** Tailwind classes for the left border accent */
  borderColor: string;
  /** Tailwind classes for the icon badge background */
  iconBg: string;
  /** Tailwind classes for the icon color */
  iconColor: string;
  /** Tailwind classes for the badge */
  badgeBg: string;
  badgeText: string;
}

const StatCard: React.FC<StatItem> = ({
  label,
  value,
  icon: Icon,
  trend,
  up,
  borderColor,
  iconBg,
  iconColor,
}) => (
  <Card
    className={cn(
      "relative overflow-hidden border-l-4 transition-shadow duration-200 hover:shadow-md",
      borderColor
    )}
  >
    <CardContent className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground mb-2 text-[10px] font-semibold tracking-widest uppercase">
            {label}
          </p>
          <p className="text-foreground text-3xl leading-none font-extrabold tracking-tight">
            {value}
          </p>
        </div>
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            iconBg
          )}
        >
          <Icon size={16} className={iconColor} />
        </div>
      </div>

      <div className="flex items-center gap-1">
        {up ? (
          <RiArrowRightUpLine size={14} className="text-success" />
        ) : (
          <RiArrowRightDownLine size={14} className="text-destructive" />
        )}
        <span
          className={`text-sm font-bold ${up ? "text-success" : "text-destructive"}`}
        >
          {trend}
        </span>

        <span className="text-muted-foreground ml-0.5 text-sm">
          vs last month
        </span>
      </div>
    </CardContent>
  </Card>
);

export default StatCard;
