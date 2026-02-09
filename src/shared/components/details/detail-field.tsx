// DetailField.tsx
import { cn } from "@/shared/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import StatusBadge from "../status-badge";

const detailFieldVariants = cva("mt-1 text-sm", {
  variants: {
    variant: {
      default: "",
      mono: "font-mono",
      medium: "font-medium",
      badge: "", // slightly more spacing for badges
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface DetailFieldProps extends VariantProps<typeof detailFieldVariants> {
  label: string;
  value: React.ReactNode;
  className?: string;
}

const DetailField = ({
  label,
  value,
  variant,
  className,
}: DetailFieldProps) => {
  const renderValue = () => {
    if (variant === "badge" && typeof value === "string") {
      return <StatusBadge status={value} />;
    }
    return value;
  };

  return (
    <div>
      <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        {label}
      </label>
      <div className={cn(detailFieldVariants({ variant }), className)}>
        {renderValue()}
      </div>
    </div>
  );
};

export { DetailField, detailFieldVariants };
