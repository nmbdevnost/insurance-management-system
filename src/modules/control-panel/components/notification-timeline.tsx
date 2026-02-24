import { Badge } from "@/shared/components/ui/badge";
import { Typography } from "@/shared/components/ui/typography";
import { cn } from "@/shared/lib/utils";
import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
import { useMemo } from "react";

type NotificationTimelineProps = {
  initialDays: number;
  weeklyInterval: number;
  dailyStart: number;
  dailyEnd: number;
};

type TimelineDotProps = {
  style: React.CSSProperties;
  dotClassName: string;
  label: string;
};

const TimelineDot: React.FC<TimelineDotProps> = ({
  dotClassName,
  label,
  style,
}) => {
  return (
    <div
      className="group absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
      style={style}
    >
      <div
        className={cn(
          "ring-background size-2.5 cursor-pointer rounded-full shadow ring-2",
          dotClassName
        )}
      />

      <Badge className="bg-card-foreground text-card pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-md opacity-0 transition-opacity group-hover:opacity-100">
        {label}
        {/* Initial: {initialDays}d */}
      </Badge>
    </div>
  );
};

/**
 * Visual horizontal timeline that renders reminder event positions
 * proportionally relative to the initial reminder window.
 */
const NotificationTimeline: React.FC<NotificationTimelineProps> = ({
  initialDays,
  weeklyInterval,
  dailyStart,
  dailyEnd,
}) => {
  const total = Math.max(initialDays + 5, 40);
  const pct = (d: number) => `${((total - d) / total) * 100}%`;

  const weeklyMarkers = useMemo(() => {
    const pts: number[] = [];
    for (
      let d = initialDays - weeklyInterval;
      d > dailyStart;
      d -= weeklyInterval
    ) {
      pts.push(d);
    }
    return pts;
  }, [initialDays, weeklyInterval, dailyStart]);

  return (
    <div className="space-y-4 rounded-xl border p-5">
      <div className="flex items-center justify-between">
        <Typography variant="overline" muted>
          Reminder Schedule Preview
        </Typography>
        <Typography
          variant="label-sm"
          className="flex items-center gap-1"
          muted
        >
          <RiArrowLeftLine className="size-3" /> days before expiry
        </Typography>
      </div>

      {/* Track */}
      <div className="relative h-9 select-none">
        <div className="bg-border absolute top-1/2 right-0 left-0 h-0.5 -translate-y-1/2 rounded-full" />

        {/* Daily zone */}
        {dailyStart > dailyEnd && (
          <div
            className="pointer-events-none absolute top-1 bottom-1 rounded-md border border-rose-300 bg-rose-200 dark:border-rose-500 dark:bg-rose-400"
            style={{
              left: pct(dailyStart),
              right: `${100 - parseFloat(pct(dailyEnd))}%`,
            }}
          />
        )}

        {/* Initial dot */}
        <TimelineDot
          dotClassName="size-3.5 ring-4 bg-teal-600"
          label={`Initial: ${initialDays}d`}
          style={{ left: pct(initialDays) }}
        />

        {/* Weekly dots */}
        {weeklyMarkers.map((d) => (
          <TimelineDot
            key={d}
            dotClassName="bg-violet-400"
            label={`Weekly: ${d}d`}
            style={{ left: pct(d) }}
          />
        ))}

        {/* Expiry cap */}
        <div className="absolute top-0 right-0 bottom-0 flex items-center">
          <div className="bg-muted-foreground h-6 w-0.5 rounded-full" />
        </div>
        <span className="text-muted-foreground absolute right-0 -bottom-5 text-xs">
          Expiry
        </span>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 pt-3 text-xs text-slate-500">
        <Typography variant="caption" className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-teal-600" />
          Initial ({initialDays}d)
        </Typography>
        <Typography variant="caption" className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-violet-400" />
          Weekly (every {weeklyInterval}d)
        </Typography>
        <Typography variant="caption" className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-4 rounded-sm border border-rose-300 bg-rose-200 dark:border-rose-500 dark:bg-rose-400" />
          Daily ({dailyStart}d<RiArrowRightLine className="-mx-1 size-3" />
          {dailyEnd}d)
        </Typography>
      </div>
    </div>
  );
};

export default NotificationTimeline;
