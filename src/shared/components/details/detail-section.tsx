// DetailsSection.tsx

import { cn } from "@/shared/lib/utils";
import { Typography } from "../ui/typography";

interface DetailsSectionProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const DetailsSection = ({
  title,
  children,
  className,
}: DetailsSectionProps) => {
  return (
    <div>
      <Typography variant="overline" muted>
        {title}
      </Typography>

      <div className={cn("mt-2 grid gap-6 sm:grid-cols-2", className)}>
        {children}
      </div>
    </div>
  );
};

export { DetailsSection };
