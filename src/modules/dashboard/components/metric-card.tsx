import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import { RiCornerRightUpLine } from "@remixicon/react";
import React from "react";

export type MetricCardProps = {
  label: string;
  value: string | number;
  subValue: string;
  variant?: "default" | "accent" | "danger" | "warning";
  trend?: number;
  className?: string;
};

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subValue,
  variant,
  trend,
  className,
}) => {
  const variantClasses = {
    default: "bg-white",
    accent: "bg-accent border-accent text-accent-foreground",
    danger: "bg-destructive/10 border-destructive",
    warning: "bg-warning/10 border-warning",
  };

  const textColor = variant === "accent" ? "text-white" : "text-slate-900";

  return (
    <Card
      className={cn(
        "group relative cursor-pointer overflow-hidden border transition-all hover:-translate-y-0.5 hover:shadow-lg",
        variant && variantClasses[variant],
        className
      )}
    >
      <CardContent className="flex h-full flex-col justify-between p-6">
        <div className="space-y-1">
          <p className="text-xs font-light tracking-wider uppercase">{label}</p>

          {trend !== undefined && (
            <div className="flex items-center gap-1">
              <RiCornerRightUpLine
                className={cn(
                  trend >= 0
                    ? "text-success rotate-45"
                    : "text-destructive rotate-225"
                )}
              />
              <span className="text-lg font-medium">{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        <div>
          <p
            className={cn("mb-1 text-4xl font-bold tracking-tight", textColor)}
          >
            {value}
          </p>
          {subValue && <p className={`text-sm font-medium`}>{subValue}</p>}
        </div>

        <div className="absolute top-0 right-0 -mt-16 -mr-16 aspect-square! h-[80%] max-h-50 rounded-full bg-linear-to-br from-transparent to-black/10 transition-transform group-hover:scale-110" />
      </CardContent>
    </Card>
  );
};

export default MetricCard;
