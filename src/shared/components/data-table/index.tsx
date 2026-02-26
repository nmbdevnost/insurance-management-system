import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { cn } from "@/shared/lib/utils";
import { calculatePinnedOffset } from "@/shared/lib/utils/data-table";
import { useDataTable } from "@/shared/providers/data-table-provider";
import { RiInbox2Line, RiLoader4Line } from "@remixicon/react";
import { flexRender, type Column } from "@tanstack/react-table";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const DataTable = ({ className }: { className?: string }) => {
  const { table } = useDataTable();

  const headerRef = useRef<HTMLTableRowElement>(null);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [isMeasured, setIsMeasured] = useState(false);
  const isMountedRef = useRef(false);

  const measureTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const measureWidths = useCallback(() => {
    if (!headerRef.current || !isMountedRef.current) return;

    const headerGroups = table.getHeaderGroups();
    if (!headerGroups.length) return;

    const headers = headerRef.current.querySelectorAll("th");
    const widths: Record<string, number> = {};

    headers.forEach((header, index) => {
      const columnId = headerGroups[0]?.headers[index]?.column.id;
      if (columnId) {
        widths[columnId] = header.getBoundingClientRect().width;
      }
    });

    // Only update if widths actually changed
    setColumnWidths((prev) => {
      const hasChanged = Object.keys(widths).some(
        (key) => prev[key] !== widths[key]
      );
      return hasChanged ? widths : prev;
    });

    if (isMountedRef.current) {
      setIsMeasured(true);
    }
  }, [table]);

  const columnStyles = useMemo(() => {
    const styles: Record<string, CSSProperties> = {};

    table.getAllColumns().forEach((column) => {
      const isPinned = column.getIsPinned();

      const isLastLeftPinnedColumn =
        isPinned === "left" && column.getIsLastColumn("left");
      const isFirstRightPinnedColumn =
        isPinned === "right" && column.getIsFirstColumn("right");

      let leftOffset = 0;
      let rightOffset = 0;

      if (isPinned === "left") {
        leftOffset = calculatePinnedOffset(
          column,
          table.getLeftLeafColumns(),
          columnWidths,
          "left"
        );
      }

      if (isPinned === "right") {
        rightOffset = calculatePinnedOffset(
          column,
          table.getRightLeafColumns(),
          columnWidths,
          "right"
        );
      }

      const size = column.getSize();
      const derivedColumnWidth = columnWidths[column.id];
      const columnWidth =
        isPinned && derivedColumnWidth ? derivedColumnWidth : size;

      styles[column.id] = {
        boxShadow: isLastLeftPinnedColumn
          ? "-4px 0px 0px -3px var(--border) inset"
          : isFirstRightPinnedColumn
            ? "4px 0px 0px -3px var(--border) inset"
            : undefined,
        left: isPinned === "left" ? `${leftOffset}px` : undefined,
        right: isPinned === "right" ? `${rightOffset}px` : undefined,
        position: isPinned ? "sticky" : "relative",
        width: columnWidth,
        minWidth: size === 150 ? undefined : columnWidth,

        zIndex: isPinned ? 1 : 0,
      };
    });

    return styles;
  }, [columnWidths, table]);

  const getCommonPinningStyles = useCallback(
    (column: Column<unknown>): CSSProperties => {
      return columnStyles[column.id] || {};
    },
    [columnStyles]
  );

  // Debounced measure function
  const debouncedMeasure = useCallback(() => {
    if (measureTimeoutRef.current) {
      clearTimeout(measureTimeoutRef.current);
    }
    measureTimeoutRef.current = setTimeout(() => {
      measureWidths();
    }, 150);
  }, [measureWidths]);

  useEffect(() => {
    isMountedRef.current = true;

    // Initial measurement (slight delay to ensure DOM is ready)
    const initialTimeout = setTimeout(() => {
      measureWidths();
    }, 0);

    // Debounced resize listener
    window.addEventListener("resize", debouncedMeasure);

    // // ResizeObserver for the table header
    const resizeObserver = new ResizeObserver(debouncedMeasure);
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      isMountedRef.current = false;
      clearTimeout(initialTimeout);
      if (measureTimeoutRef.current) {
        clearTimeout(measureTimeoutRef.current);
      }
      window.removeEventListener("resize", debouncedMeasure);
      resizeObserver.disconnect();
    };
  }, [measureWidths, debouncedMeasure]);

  return (
    <div className="relative grid">
      {!isMeasured && (
        <div className="bg-background/50 absolute inset-0 z-50 flex items-center justify-center">
          <span className="text-muted-foreground flex items-center gap-1 text-sm">
            <RiLoader4Line className="animate-spin" /> Loading...
          </span>
        </div>
      )}

      <Table
        parentClassName={cn("overflow-auto rounded-xl border", className)}
        className={cn(!isMeasured && "opacity-0")}
      >
        <TableHeader className="bg-muted sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} ref={headerRef}>
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
                    className="bg-background group-hover:bg-muted group-data-[state=selected]:bg-muted"
                  >
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
