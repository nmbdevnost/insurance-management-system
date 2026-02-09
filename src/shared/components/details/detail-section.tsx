// DetailsSection.tsx

import { cn } from "@/shared/lib/utils";

interface DetailsSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const DetailsSection = ({
  title,
  children,
  className,
}: DetailsSectionProps) => {
  return (
    <div className={className}>
      <h3 className="mb-4 text-sm font-semibold tracking-wide uppercase">
        {title}
      </h3>

      <div className={cn("grid gap-6 sm:grid-cols-2", className)}>
        {children}
      </div>
    </div>
  );
};

export { DetailsSection };
