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
