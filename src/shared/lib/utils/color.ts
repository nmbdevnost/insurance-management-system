export function generateGoldenRatioColor({
  index,
  lightness = "var(--chart-lightness)",
  chroma = "var(--chart-chroma)",
  startHue = 0,
  useGoldenRatio = true,
}: {
  index: number;
  lightness?: string | number;
  chroma?: string | number;
  startHue?: number;
  useGoldenRatio?: boolean;
}) {
  if (!useGoldenRatio) {
    return `var(--chart-${index + 1})`;
  }
  const hue = ((index * 0.618033988749895) % 1.0) * 360 + startHue;
  return `oklch(${lightness} ${chroma} ${hue % 360})`;
}
