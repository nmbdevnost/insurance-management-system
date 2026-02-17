export function generateGoldenRatioColor({
  index,
  lightness = "var(--chart-lightness)",
  chroma = "var(--chart-chroma)",
  startHue = 0,
}: {
  index: number;
  lightness?: string | number;
  chroma?: string | number;
  startHue?: number;
}) {
  const hue = ((index * 0.618033988749895) % 1.0) * 360 + startHue;
  return `oklch(${lightness} ${chroma} ${hue % 360})`;
}
