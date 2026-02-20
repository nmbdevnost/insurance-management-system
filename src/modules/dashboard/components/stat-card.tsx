import { Card, CardContent } from "@/shared/components/ui/card";
import { Typography } from "@/shared/components/ui/typography";
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
          <Typography variant="overline" className="text-xs">
            {label}
          </Typography>

          <Typography variant="h2" as="p">
            {value}
          </Typography>
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

        <Typography muted variant="body-sm" className="ml-0.5">
          vs last month
        </Typography>
      </div>
    </CardContent>
  </Card>
);

export default StatCard;
