import type { PropsWithChildren } from "react";
import { cn } from "../lib/utils";

const IconFrame = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={cn(
        "bg-primary/10 text-primary flex shrink-0 items-center justify-center rounded-xl p-2",
        className
      )}
    >
      {children}
    </div>
  );
};

export default IconFrame;
