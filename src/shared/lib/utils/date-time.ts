/**
 * Checks whether a date falls within optional [min, max] bounds (full datetime comparison).
 */
export function isDateWithinBounds(
  date: Date,
  min?: Date,
  max?: Date
): boolean {
  if (min && date < min) return false;
  if (max && date > max) return false;
  return true;
}

/**
 * Checks whether a time (HH:mm) falls within optional [min, max] bounds,
 * ignoring the date portion entirely.
 */
export function isTimeWithinBounds(
  time: Date,
  min?: Date,
  max?: Date
): boolean {
  if (!min && !max) return true;
  const toMins = (d: Date) => d.getHours() * 60 + d.getMinutes();
  const val = toMins(time);
  if (min && val < toMins(min)) return false;
  if (max && val > toMins(max)) return false;
  return true;
}
