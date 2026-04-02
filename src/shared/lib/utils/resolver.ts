/**
 * Resolves a React-style value-or-updater-function into a concrete value.
 */
export function resolveUpdater<T>(updater: T | ((prev: T) => T), prev: T): T {
  return typeof updater === "function"
    ? (updater as (prev: T) => T)(prev)
    : updater;
}
