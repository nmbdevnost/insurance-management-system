import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { cn } from "@/shared/lib/utils";
import { useDataTable } from "@/shared/providers/data-table-provider";
import { RiInbox2Line } from "@remixicon/react";
import { flexRender, type Column } from "@tanstack/react-table";
import type { CSSProperties } from "react";

const DataTable = ({ className }: { className?: string }) => {
  const { table } = useDataTable();

  const getCommonPinningStyles = (column: Column<unknown>): CSSProperties => {
    const isPinned = column.getIsPinned();
    const isLastLeftPinnedColumn =
      isPinned === "left" && column.getIsLastColumn("left");
    const isFirstRightPinnedColumn =
      isPinned === "right" && column.getIsFirstColumn("right");

    const leftStart = column.getStart("left");
    const rightAfter = column.getAfter("right");

    // Calculate width based on next column position
    let width: number | undefined;
    if (isPinned === "left") {
      const allColumns = table.getAllLeafColumns();
      const leftPinnedColumns = allColumns.filter(
        (col: Column<unknown>) => col.getIsPinned() === "left"
      );
      const currentColumnIndex = leftPinnedColumns.findIndex(
        (col: Column<unknown>) => col.id === column.id
      );
      const nextColumn = leftPinnedColumns[currentColumnIndex + 1];

      if (nextColumn) {
        const nextColumnLeft = nextColumn.getStart("left");
        width = nextColumnLeft - leftStart;
      }
    } else if (isPinned === "right") {
      const allColumns = table.getAllLeafColumns();
      const rightPinnedColumns = allColumns.filter(
        (col: Column<unknown>) => col.getIsPinned() === "right"
      );
      console.log(
        "🚀 ~ rightPinnedColumns:",
        rightPinnedColumns.map((c) => c.id)
      );
      const currentColumnIndex = rightPinnedColumns.findIndex(
        (col: Column<unknown>) => col.id === column.id
      );
      console.log(
        "🚀 ~ currentColumnIndex:",
        currentColumnIndex,
        "column.id:",
        column.id
      );
      const nextColumn = rightPinnedColumns[currentColumnIndex + 1];
      console.log("🚀 ~ nextColumn:", nextColumn?.id);

      if (nextColumn) {
        const nextColumnRight = nextColumn.getAfter("right");
        width = rightAfter - nextColumnRight;
      }
    }

    console.log("🚀 ~ getCommonPinningStyles ~ width:", width);

    return {
      boxShadow: isLastLeftPinnedColumn
        ? "-4px 0 4px -5px gray inset"
        : isFirstRightPinnedColumn
          ? "4px 0 4px -5px gray inset"
          : undefined,
      left: isPinned === "left" ? `${leftStart}px` : undefined,
      right: isPinned === "right" ? `${rightAfter}px` : undefined,
      position: isPinned ? "sticky" : "relative",
      width: width ? `${width}px` : undefined,
      zIndex: isPinned ? 1 : 0,
    };
  };

  return (
    <div className={cn("overflow-hidden rounded-xl border", className)}>
      <Table>
        <TableHeader className="bg-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="text-muted-foreground bg-muted font-semibold"
                    style={{ ...getCommonPinningStyles(header.column) }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="group"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{ ...getCommonPinningStyles(cell.column) }}
                    className="bg-background"
                  >
                    {/* <div className="bg-background group-hover:bg-muted/50 pointer-events-none absolute inset-0 -z-10"></div> */}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-24 text-center"
              >
                <div className="flex flex-col items-center gap-2">
                  <RiInbox2Line className="text-muted-foreground" />
                  <span className="text-muted-foreground">No results.</span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
