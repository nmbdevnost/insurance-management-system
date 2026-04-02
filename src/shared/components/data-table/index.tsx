import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { useFillHeight } from "@/shared/hooks/use-fill-height";
import { cn } from "@/shared/lib/utils";
import { calculatePinnedOffset } from "@/shared/lib/utils/data-table";
import { useDataTable } from "@/shared/providers/data-table-provider";
import { RiCloseCircleLine, RiInbox2Line } from "@remixicon/react";
import { flexRender, type Column, type Row } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { CSSProperties } from "react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";

type DataTableProps = {
  className?: string;
  overscan?: number;
  emptyText?: string;
  autoFillHeight?: boolean;
  autoFillHeightOffset?: number;
  estimatedRowHeight?: number;
  skeletonRows?: number;
  virtualized?: boolean;
};

type TableRowItemProps<TData> = {
  row: Row<TData>;
  rowIndex: number;
  measureRef?: (el: Element | null) => void;
  getCommonPinningStyles: (column: Column<TData>) => CSSProperties;
  isSelected: boolean;
};

/**
 * Memoized row component to prevent re-renders of visible rows during scroll.
 * Re-renders only when selection state or row data changes.
 */
const TableRowItem = memo(
  <TData,>({
    row,
    rowIndex,
    measureRef,
    getCommonPinningStyles,
    isSelected,
  }: TableRowItemProps<TData>) => (
    <TableRow
      data-state={isSelected && "selected"}
      data-index={rowIndex}
      ref={measureRef}
      className="group"
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          style={getCommonPinningStyles(cell.column)}
          className="bg-background group-hover:bg-muted group-data-[state=selected]:bg-muted"
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
) as <TData>(props: TableRowItemProps<TData>) => React.ReactElement;

const DataTable: React.FC<DataTableProps> = ({
  className,
  overscan = 3,
  emptyText = "No results.",
  autoFillHeight = true,
  autoFillHeightOffset = 80,
  estimatedRowHeight = 38,
  skeletonRows = 5,
  virtualized = true,
}) => {
  const { table, isLoading, isPaginationLoading, isError, error } =
    useDataTable();

  const outerRef = useRef<HTMLDivElement>(null);
  const tableHeight = useFillHeight({
    ref: outerRef,
    offset: autoFillHeightOffset,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLTableRowElement>(null);
  const measureTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [isMeasured, setIsMeasured] = useState(false);

  const columnStyles = useMemo(() => {
    const styles: Record<string, CSSProperties> = {};

    table.getAllColumns().forEach((column) => {
      const isPinned = column.getIsPinned();
      const isLastLeftPinnedColumn =
        isPinned === "left" && column.getIsLastColumn("left");
      const isFirstRightPinnedColumn =
        isPinned === "right" && column.getIsFirstColumn("right");

      const leftOffset =
        isPinned === "left"
          ? calculatePinnedOffset(
              column,
              table.getLeftLeafColumns(),
              columnWidths,
              "left"
            )
          : 0;

      const rightOffset =
        isPinned === "right"
          ? calculatePinnedOffset(
              column,
              table.getRightLeafColumns(),
              columnWidths,
              "right"
            )
          : 0;

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
    (column: Column<unknown>): CSSProperties => columnStyles[column.id] ?? {},
    [columnStyles]
  );

  const measureWidths = useCallback(() => {
    if (!headerRef.current) return;

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

    setColumnWidths((prev) => {
      const hasChanged = Object.keys(widths).some(
        (key) => prev[key] !== widths[key]
      );
      return hasChanged ? widths : prev;
    });

    setIsMeasured(true);
  }, [table]);

  const debouncedMeasure = useCallback(() => {
    if (measureTimeoutRef.current) clearTimeout(measureTimeoutRef.current);
    measureTimeoutRef.current = setTimeout(measureWidths, 150);
  }, [measureWidths]);

  /** Stable scroll element getter to avoid virtualizer re-initialization on each render. */
  const getScrollElement = useCallback(() => scrollRef.current, []);

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: virtualized ? table.getRowModel().rows.length : 0,
    getScrollElement,
    estimateSize: () => estimatedRowHeight,
    overscan,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

  const paddingTop = virtualItems.length > 0 ? virtualItems[0].start : 0;
  const paddingBottom =
    virtualItems.length > 0
      ? totalSize - virtualItems[virtualItems.length - 1].end
      : 0;

  useEffect(() => {
    const initialTimeout = setTimeout(measureWidths, 0);

    window.addEventListener("resize", debouncedMeasure);

    const resizeObserver = new ResizeObserver(debouncedMeasure);
    if (headerRef.current) resizeObserver.observe(headerRef.current);

    return () => {
      clearTimeout(initialTimeout);
      if (measureTimeoutRef.current) clearTimeout(measureTimeoutRef.current);
      window.removeEventListener("resize", debouncedMeasure);
      resizeObserver.disconnect();
    };
  }, [measureWidths, debouncedMeasure]);

  const rows = table.getRowModel().rows;

  return (
    <div className="relative grid" ref={outerRef}>
      {isPaginationLoading && (
        <div className="bg-accent animate-progress absolute inset-y-0 z-20 h-1 w-1/3 rounded-full" />
      )}

      <Table
        parentRef={scrollRef}
        parentStyle={{ maxHeight: autoFillHeight ? tableHeight : undefined }}
        parentClassName={cn("overflow-auto rounded-xl border", className)}
        className={cn(
          (!isMeasured || isPaginationLoading) && "pointer-events-none",
          isPaginationLoading && "opacity-50"
        )}
      >
        <TableHeader className="bg-muted sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} ref={headerRef}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-muted-foreground bg-muted font-semibold"
                  style={getCommonPinningStyles(header.column)}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {!isMeasured || (isLoading && !isPaginationLoading) ? (
            Array.from({ length: skeletonRows }).map((_, i) => (
              <TableRow key={`skeleton-${i}`}>
                {table.getAllColumns().map((column) => (
                  <TableCell
                    key={column.id}
                    className="h-10"
                    style={getCommonPinningStyles(column)}
                  >
                    <Skeleton className="h-full w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : rows.length ? (
            <>
              {virtualized ? (
                <>
                  {paddingTop > 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={table.getAllColumns().length}
                        style={{ height: paddingTop, padding: 0 }}
                      />
                    </TableRow>
                  )}
                  {virtualItems.map((virtualRow) => (
                    <TableRowItem
                      key={rows[virtualRow.index].id}
                      row={rows[virtualRow.index]}
                      rowIndex={virtualRow.index}
                      measureRef={virtualizer.measureElement}
                      getCommonPinningStyles={getCommonPinningStyles}
                      isSelected={rows[virtualRow.index].getIsSelected()}
                    />
                  ))}
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
                rows.map((row, i) => (
                  <TableRowItem
                    key={row.id}
                    row={row}
                    rowIndex={i}
                    getCommonPinningStyles={getCommonPinningStyles}
                    isSelected={row.getIsSelected()}
                  />
                ))
              )}
            </>
          ) : isError || error ? (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-24 text-center"
              >
                <div className="flex flex-col items-center gap-2">
                  <RiCloseCircleLine className="text-muted-foreground" />
                  <span className="text-muted-foreground">{error}</span>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-24 text-center"
              >
                <div className="flex flex-col items-center gap-2">
                  <RiInbox2Line className="text-muted-foreground" />
                  <span className="text-muted-foreground">{emptyText}</span>
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
