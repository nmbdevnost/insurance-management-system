import {
  RiArrowDownLine,
  RiArrowRightLine,
  RiArrowUpLine,
  type RemixiconComponentType,
} from "@remixicon/react";
import type { FC } from "react";

type TrendDirection = "up" | "down" | "same";

interface TrendSparklineProps {
  direction: TrendDirection;
  label?: string;
}

type TrendConfig = {
  color: string;
  arrow: RemixiconComponentType;
  bars: number[];
  label: string;
};

const config: Record<TrendDirection, TrendConfig> = {
  up: {
    color: "var(--success)",
    arrow: RiArrowUpLine,
    bars: [10, 14, 17, 20, 22],
    label: "3.2%",
  },
  down: {
    color: "var(--destructive)",
    arrow: RiArrowDownLine,
    bars: [20, 17, 14, 12, 10],
    label: "1.4%",
  },
  same: {
    color: "var(--muted-foreground)",
    arrow: RiArrowRightLine,
    bars: [14, 13, 15, 14, 14],
    label: "0.0%",
  },
};

const BAR_WIDTH = 6;
const BAR_GAP = 3;
const MAX_BAR = 22;
const SVG_H = MAX_BAR + 4;

export const TrendSparkline: FC<TrendSparklineProps> = ({
  direction,
  label,
}) => {
  const { color, arrow: Arrow, bars, label: defaultLabel } = config[direction];
  const displayLabel = label ?? defaultLabel;
  const svgW = bars.length * BAR_WIDTH + (bars.length - 1) * BAR_GAP;

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <svg
        width={svgW}
        height={SVG_H}
        viewBox={`0 0 ${svgW} ${SVG_H}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {bars.map((h, i) => (
          <rect
            key={i}
            x={i * (BAR_WIDTH + BAR_GAP)}
            y={SVG_H - h}
            width={BAR_WIDTH}
            height={h}
            rx={1}
            fill={color}
            opacity={0.3 + (i / (bars.length - 1)) * 0.7}
          />
        ))}
      </svg>
      <span
        className="flex items-center gap-1"
        style={{ fontSize: 12, color, fontVariantNumeric: "tabular-nums" }}
      >
        <Arrow
          style={{
            height: svgW - svgW * 0.6,
            aspectRatio: "1 / 1",
          }}
        />{" "}
        {displayLabel}
      </span>
    </span>
  );
};
