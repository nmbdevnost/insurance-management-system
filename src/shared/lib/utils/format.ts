/**
 * Placeholder format utilities for the insurance management app.
 * Extend with date, currency, or other formatters as needed.
 */

import { format } from "date-fns";

export function formatCurrency(
  value: number,
  options?: Intl.NumberFormatOptions & {
    locale?: string;
  }
): string {
  return new Intl.NumberFormat(options?.locale ?? "ne-NP", {
    style: "currency",
    currencyDisplay: "narrowSymbol",
    ...options,
    currency: options?.currency ?? "NPR",
  }).format(value);
}

export function formatDate(date?: Date | string, formatString = "PPP"): string {
  const formattedDate = date ? format(new Date(date), formatString) : "-";

  return formattedDate;
}

export function formatString(str: string, capitalize = true) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters (caseId -> case Id)
    .replace(/([a-zA-Z])(\d)/g, "$1 $2") // Add space before numbers (case123 -> case 123)
    .replace(/\b\w/g, (letter) =>
      capitalize ? letter.toUpperCase() : letter.toLowerCase()
    );
}
