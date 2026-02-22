import type { Column } from "@tanstack/react-table";

/**
 * Calculate the offset for a pinned column
 * @param column - The column to calculate the offset for
 * @param pinnedColumns - The pinned columns
 * @param columnWidths - The widths of the columns
 * @param direction - The direction of the offset
 * @returns The offset for the column
 */
export const calculatePinnedOffset = (
  column: Column<unknown>,
  pinnedColumns: Column<unknown>[],
  columnWidths: Record<string, number>,
  direction: "left" | "right",
  borderWidth: number = 0
): number => {
  const currentIndex = pinnedColumns.findIndex((col) => col.id === column.id);
  let offset = 0;

  if (direction === "left") {
    // Sum widths of columns before current column
    for (let i = 0; i < currentIndex; i++) {
      offset += columnWidths[pinnedColumns[i].id] || pinnedColumns[i].getSize();
    }
  } else {
    // Sum widths of columns after current column
    for (let i = currentIndex + 1; i < pinnedColumns.length; i++) {
      offset += columnWidths[pinnedColumns[i].id] || pinnedColumns[i].getSize();
    }
  }

  return offset + borderWidth;
};

/**
 * Returns a sparse list of page indices and ellipsis markers to render.
 * Always includes first, last, current, and current ± 1 pages.
 * @param currentPage - The current page index (0-indexed).
 * @param totalPages - The total number of pages.
 * @returns A sparse list of page indices and ellipsis markers to render.
 */
export function getPageRange(
  currentPage: number,
  totalPages: number
): (number | "...")[] {
  const delta = 1;
  const range: number[] = [];

  const left = Math.max(0, currentPage - delta);
  const right = Math.min(totalPages - 1, currentPage + delta);

  for (let i = left; i <= right; i++) range.push(i);
  if (!range.includes(0)) range.unshift(0);
  if (!range.includes(totalPages - 1)) range.push(totalPages - 1);

  const result: (number | "...")[] = [];
  let prev: number | null = null;

  for (const page of range) {
    if (prev !== null && page - prev > 1) result.push("...");
    result.push(page);
    prev = page;
  }

  return result;
}
