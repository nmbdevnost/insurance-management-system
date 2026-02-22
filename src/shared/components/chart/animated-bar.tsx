import { cn } from "@/shared/lib/utils";
import { generateGoldenRatioColor } from "@/shared/lib/utils/color";
import { useEffect, useState } from "react";

const AnimatedBar = ({
  value,
  index,
  color,
  className,
}: {
  value: number;
  index?: number;
  color?: string;
  className?: string;
}) => {
  const [mounted, setMounted] = useState(false);

  const generatedColor =
    index !== undefined ? generateGoldenRatioColor({ index }) : undefined;
  const bgColor = color ? color : generatedColor;

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="bg-muted h-1.5 overflow-hidden rounded-full">
      <div
        className={cn(
          "h-full rounded-full transition-all delay-100 duration-700 ease-out",
          className
        )}
        style={{
          width: mounted ? `${value}%` : "0%",
          backgroundColor: bgColor,
        }}
      />
    </div>
  );
};

export default AnimatedBar;
