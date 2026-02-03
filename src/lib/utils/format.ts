/**
 * Placeholder format utilities for the insurance management app.
 * Extend with date, currency, or other formatters as needed.
 */

export function formatCurrency(value: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(typeof date === "string" ? new Date(date) : date)
}
