import { cn } from "@/shared/lib/utils";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnPinningState,
  type PaginationState,
  type SortingState,
  type Table,
} from "@tanstack/react-table";
import { createContext, useCallback, useContext, useMemo } from "react";
import useControlledState from "../hooks/use-controlled-state";
import { DEFAULT_TABLE_PARAMS } from "../lib/constants";
import { resolveUpdater } from "../lib/utils/resolver";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ColumnMetaWithPinning = {
  pin?: "left" | "right";
};

export type RowSelectionState = Record<string, boolean>;
export type ControlledPaginationState = PaginationState & { page: number };

export type TableParams = {
  pagination: ControlledPaginationState;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  globalFilter: string;
  selections: RowSelectionState;
};

export type DataTableContextValue<TData> = {
  table: Table<TData>;
  isLoading?: boolean;
  isPaginationLoading?: boolean;
  totalRows?: number;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  pagination: ControlledPaginationState;
  setPagination: React.Dispatch<
    React.SetStateAction<ControlledPaginationState>
  >;
  rowSelection: RowSelectionState;
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
  isError?: boolean;
  error?: string;
};

export type DataTableProviderProps<TData> = {
  columns: ColumnDef<TData>[];
  data?: TData[];
  children: React.ReactNode;
  pageCount?: number;
  onTableParamsChange?: React.Dispatch<React.SetStateAction<TableParams>>;
  onRowSelectionChange?: (selections: RowSelectionState) => void;
  onPaginationChange?: (pagination: ControlledPaginationState) => void;
  onSortingChange?: (sorting: SortingState) => void;
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void;
  onGlobalFilterChange?: (filter: string) => void;
  enableRowSelection?: boolean;
  enableMultiRowSelection?: boolean;
  tableParams?: TableParams;
  className?: string;
  isLoading?: boolean;
  manualPagination?: boolean;
  totalRows?: number;
  isError?: boolean;
  error?: string;
  rowId?: keyof TData;
};

// ─── Utilities ────────────────────────────────────────────────────────────────

/**
 * Extracts pinned column IDs from column definitions for a given direction.
 */
function getPinnedColumnIds<TData>(
  columns: ColumnDef<TData>[],
  direction: ColumnMetaWithPinning["pin"]
): string[] {
  return columns
    .filter(
      (col) =>
        (col.meta as ColumnMetaWithPinning)?.pin === direction &&
        ("accessorKey" in col || "id" in col)
    )
    .map((col) => ("accessorKey" in col ? String(col.accessorKey) : col.id!));
}

// ─── Context ──────────────────────────────────────────────────────────────────

const DataTableContext = createContext<DataTableContextValue<unknown> | null>(
  null
);

export function useDataTable<TData>(): DataTableContextValue<TData> {
  const context = useContext(DataTableContext);
  if (!context) {
    throw new Error("useDataTable must be used within a DataTableProvider");
  }
  return context as DataTableContextValue<TData>;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function DataTableProvider<TData>({
  columns,
  data = [],
  children,
  pageCount,
  tableParams,
  onTableParamsChange,
  onColumnFiltersChange,
  onGlobalFilterChange,
  onPaginationChange,
  onRowSelectionChange,
  onSortingChange,
  enableRowSelection = true,
  enableMultiRowSelection,
  className,
  isLoading,
  manualPagination = true,
  totalRows,
  isError,
  error,
  rowId = "id" as keyof TData,
}: DataTableProviderProps<TData>) {
  const { value: activeParams, onChange: setActiveParams } =
    useControlledState<TableParams>({
      value: tableParams,
      onChange: onTableParamsChange,
      defaultValue: DEFAULT_TABLE_PARAMS,
    });

  const setGlobalFilter = useCallback(
    (value: string) => {
      onGlobalFilterChange?.(value);
      setActiveParams((prev) => ({ ...prev, globalFilter: value }));
    },
    [setActiveParams, onGlobalFilterChange]
  );

  const setColumnFilters = useCallback(
    (updater: React.SetStateAction<ColumnFiltersState>) => {
      setActiveParams((prev) => {
        const next = resolveUpdater(updater, prev.columnFilters);
        onColumnFiltersChange?.(next);
        return { ...prev, columnFilters: next };
      });
    },
    [setActiveParams, onColumnFiltersChange]
  );

  const setSorting = useCallback(
    (updater: React.SetStateAction<SortingState>) => {
      setActiveParams((prev) => {
        const next = resolveUpdater(updater, prev.sorting);
        onSortingChange?.(next);
        return { ...prev, sorting: next };
      });
    },
    [setActiveParams, onSortingChange]
  );

  const setRowSelection = useCallback(
    (updater: React.SetStateAction<RowSelectionState>) => {
      setActiveParams((prev) => {
        const next = resolveUpdater(updater, prev.selections);
        onRowSelectionChange?.(next);
        return { ...prev, selections: next };
      });
    },
    [setActiveParams, onRowSelectionChange]
  );

  const setPagination = useCallback(
    (updater: React.SetStateAction<ControlledPaginationState>) => {
      setActiveParams((prev) => {
        const next = resolveUpdater(updater, prev.pagination);
        onPaginationChange?.(next);
        return { ...prev, pagination: next };
      });
    },
    [setActiveParams, onPaginationChange]
  );

  // Internal handler for react-table's pagination (which uses PaginationState, not ControlledPaginationState)
  const handlePaginationChange = useCallback(
    (
      updater: PaginationState | ((prev: PaginationState) => PaginationState)
    ) => {
      setActiveParams((prev) => {
        const prevBase: PaginationState = {
          pageIndex: prev.pagination.pageIndex,
          pageSize: prev.pagination.pageSize,
        };
        const resolved = resolveUpdater(updater, prevBase);
        const pageSizeChanged = resolved.pageSize !== prevBase.pageSize;
        const pageIndex = pageSizeChanged ? 0 : resolved.pageIndex;

        return {
          ...prev,
          pagination: { ...resolved, pageIndex, page: pageIndex + 1 },
        };
      });
    },
    [setActiveParams]
  );

  const columnPinning = useMemo<ColumnPinningState>(
    () => ({
      left: getPinnedColumnIds(columns, "left"),
      right: getPinnedColumnIds(columns, "right"),
    }),
    [columns]
  );

  const computedPageCount = manualPagination
    ? (pageCount ??
      (totalRows != null
        ? Math.ceil(totalRows / activeParams.pagination.pageSize)
        : 1))
    : undefined;

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    pageCount: computedPageCount,
    getRowId: (row) => String(row[rowId]),
    state: {
      globalFilter: activeParams.globalFilter,
      columnFilters: activeParams.columnFilters,
      sorting: activeParams.sorting,
      pagination: activeParams.pagination,
      rowSelection: activeParams.selections,
      columnPinning,
    },
    enableColumnPinning: true,
    enableRowSelection,
    enableMultiRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: handlePaginationChange,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination,
    manualSorting: true,
    manualFiltering: true,
    autoResetPageIndex: false,
  });

  const contextValue = useMemo<DataTableContextValue<TData>>(
    () => ({
      table,
      isLoading,
      isPaginationLoading: isLoading && data.length > 0,
      totalRows: totalRows ?? data.length,
      globalFilter: activeParams.globalFilter,
      setGlobalFilter,
      columnFilters: activeParams.columnFilters,
      setColumnFilters,
      sorting: activeParams.sorting,
      setSorting,
      pagination: activeParams.pagination,
      setPagination,
      rowSelection: activeParams.selections,
      setRowSelection,
      isError,
      error,
    }),
    [
      table,
      isLoading,
      data.length,
      totalRows,
      activeParams,
      isError,
      error,
      setGlobalFilter,
      setColumnFilters,
      setSorting,
      setPagination,
      setRowSelection,
    ]
  );

  return (
    <DataTableContext.Provider
      value={contextValue as unknown as DataTableContextValue<unknown>}
    >
      <div className={cn("grid w-full gap-4", className)}>{children}</div>
    </DataTableContext.Provider>
  );
}
