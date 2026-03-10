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
import { RiInbox2Line } from "@remixicon/react";
import { flexRender, type Column } from "@tanstack/react-table";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { useFillHeight } from "@/shared/hooks/use-fill-height";
import { useVirtualizer } from "@tanstack/react-virtual";

const DataTable = ({ className }: { className?: string }) => {
  const { table, isLoading, isPaginationLoading } = useDataTable();

  const outerRef = useRef<HTMLDivElement>(null); // for useFillHeight
  const scrollRef = useRef<HTMLDivElement>(null); // for virtualizer

  const tableHeight = useFillHeight({ ref: outerRef, offset: 80 });

  const headerRef = useRef<HTMLTableRowElement>(null);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [isMeasured, setIsMeasured] = useState(false);
  const isMountedRef = useRef(false);

  const measureTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const headerGroups = table.getHeaderGroups();

  const measureWidths = useCallback(() => {
    if (!headerRef.current || !isMountedRef.current) return;

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
  }, [headerGroups]);

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

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 38,
    overscan: 3,
  });

  const virtualItems = virtualizer.getVirtualItems();

  const paddingTop = virtualItems.length > 0 ? virtualItems[0].start : 0;
  const paddingBottom =
    virtualItems.length > 0
      ? virtualizer.getTotalSize() - virtualItems[virtualItems.length - 1].end
      : 0;

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
    <div className="relative grid" ref={outerRef}>
      {isPaginationLoading && (
        <div className="bg-accent animate-progress absolute inset-y-0 z-20 h-1 w-1/3 rounded-full" />
      )}

      <Table
        parentRef={scrollRef}
        parentStyle={{
          maxHeight: tableHeight,
        }}
        parentClassName={cn("overflow-auto rounded-xl border", className)}
        className={cn(
          (!isMeasured || isPaginationLoading) && "pointer-events-none",
          isPaginationLoading && "opacity-50"
        )}
        style={{
          maxHeight: tableHeight,
        }}
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

        {/*<TableBody>
          {!isMeasured || (isLoading && !isPaginationLoading) ? (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={`Skeleton-${i}`}>
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className="h-10"
                  >
                    <Skeleton className="h-full w-full" />
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : table.getRowModel().rows?.length ? (
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
        </TableBody>*/}

        <TableBody>
          {!isMeasured || (isLoading && !isPaginationLoading) ? (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={`Skeleton-${i}`}>
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className="h-10"
                  >
                    <Skeleton className="h-full w-full" />
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : table.getRowModel().rows?.length ? (
            <>
              {paddingTop > 0 && (
                <TableRow>
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    style={{ height: paddingTop, padding: 0 }}
                  />
                </TableRow>
              )}
              {virtualItems.map((virtualRow) => {
                const row = table.getRowModel().rows[virtualRow.index];
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    data-index={virtualRow.index}
                    ref={virtualizer.measureElement}
                    className="group"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{ ...getCommonPinningStyles(cell.column) }}
                        className="bg-background group-hover:bg-muted group-data-[state=selected]:bg-muted"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {paddingBottom > 0 && (
                <TableRow>
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    style={{ height: paddingBottom, padding: 0 }}
                  />
                </TableRow>
              )}
            </>
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
