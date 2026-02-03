import { cn } from "@/lib/utils";
import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type Table,
} from "@tanstack/react-table";
import { createContext, useCallback, useContext, useState } from "react";

export type RowSelectionState = Record<string, boolean>;

export type CustomPaginationState = PaginationState & { page: number };

export type TableParams = {
  pagination: CustomPaginationState;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  globalFilter: string;
};

export type DataTableContextValue<TData> = {
  table: Table<TData>;

  totalRows?: number;

  // search
  globalFilter: string;
  setGlobalFilter: (value: string) => void;

  // filters
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;

  // sorting
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;

  // pagination
  pagination: CustomPaginationState;
  setPagination: React.Dispatch<React.SetStateAction<CustomPaginationState>>;

  // selection
  rowSelection: RowSelectionState;
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
};

export type DataTableProviderProps<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  children: React.ReactNode;
  pageCount: number;
  totalRows?: number;
  onTableParamsChange: (params: TableParams) => void;
  enableRowSelection?: boolean;
  enableMultiRowSelection?: boolean;
  tableParams: TableParams;
  className?: string;
};

const DataTableContext = createContext<DataTableContextValue<unknown> | null>(
  null,
);

export function useDataTable<TData>(): DataTableContextValue<TData> {
  const context = useContext(DataTableContext);
  if (!context) {
    throw new Error("useDataTable must be used within a DataTableProvider");
  }
  return context as DataTableContextValue<TData>;
}

export function DataTableProvider<TData>({
  columns,
  data,
  children,
  pageCount,
  totalRows,
  onTableParamsChange,
  enableRowSelection,
  enableMultiRowSelection,
  tableParams,
  className,
}: DataTableProviderProps<TData>) {
  const { columnFilters, globalFilter, pagination, sorting } = tableParams;

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  /**
   * Returns the current table parameters (pagination, sorting, filters, search).
   * Optionally accepts overrides to merge with current state before returning.
   * @param overrides - Partial table parameters to override current values
   * @returns Complete TableParams object with current or overridden values
   */
  const getCurrentParams = useCallback(
    (overrides?: Partial<TableParams>): TableParams => ({
      pagination,
      sorting,
      columnFilters,
      globalFilter,
      ...overrides,
    }),
    [pagination, sorting, columnFilters, globalFilter],
  );

  /**
   * Handles changes to the global search filter.
   * Updates the global filter state and notifies parent component of parameter changes.
   * @param value - The new global filter string to apply
   */
  const handleGlobalFilterChange = useCallback(
    (value: string) => {
      onTableParamsChange(getCurrentParams({ globalFilter: value }));
    },
    [getCurrentParams, onTableParamsChange],
  );

  /**
   * Handles changes to column-specific filters.
   * Accepts either a new filter state or an updater function for functional updates.
   * Notifies parent component after updating the filter state.
   * @param updater - New column filters state or function that receives old state and returns new state
   */
  const handleColumnFiltersChange = useCallback(
    (
      updater:
        | ColumnFiltersState
        | ((old: ColumnFiltersState) => ColumnFiltersState),
    ) => {
      const newColumnFilters =
        typeof updater === "function" ? updater(columnFilters) : updater;
      onTableParamsChange(
        getCurrentParams({ columnFilters: newColumnFilters }),
      );
    },
    [getCurrentParams, onTableParamsChange, columnFilters],
  );

  /**
   * Handles changes to table sorting configuration.
   * Accepts either a new sorting state or an updater function for functional updates.
   * Notifies parent component after updating the sorting state.
   * @param updater - New sorting state or function that receives old state and returns new state
   */
  const handleSortingChange = useCallback(
    (updater: SortingState | ((old: SortingState) => SortingState)) => {
      const newSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      onTableParamsChange(getCurrentParams({ sorting: newSorting }));
    },
    [getCurrentParams, onTableParamsChange, sorting],
  );

  /**
   * Handles changes to table pagination (page index and page size).
   * Accepts either a new pagination state or an updater function for functional updates.
   * Automatically calculates the page number (pageIndex + 1) and includes it in the state.
   * Notifies parent component after updating the pagination state.
   * @param updater - New pagination state or function that receives old state and returns new state
   */
  const handlePaginationChange = useCallback(
    (
      updater: PaginationState | ((old: PaginationState) => PaginationState),
    ) => {
      // React Table sends PaginationState, so we need to extract just pageIndex and pageSize
      const basePagination: PaginationState =
        typeof updater === "function"
          ? updater({
              pageIndex: pagination.pageIndex,
              pageSize: pagination.pageSize,
            })
          : updater;

      // Enhance with the page number
      const newPagination: CustomPaginationState = {
        ...basePagination,
        page: basePagination.pageIndex + 1,
      };

      onTableParamsChange(getCurrentParams({ pagination: newPagination }));
    },
    [getCurrentParams, onTableParamsChange, pagination],
  );

  /**
   * Wrapper for external consumers to set pagination with CustomPaginationState.
   * Converts CustomPaginationState to PaginationState for React Table compatibility.
   * @param updater - New custom pagination state or function that receives old state and returns new state
   */
  const handleCustomPaginationChange = useCallback(
    (
      updater:
        | CustomPaginationState
        | ((old: CustomPaginationState) => CustomPaginationState),
    ) => {
      const newCustomPagination =
        typeof updater === "function" ? updater(pagination) : updater;

      onTableParamsChange(
        getCurrentParams({ pagination: newCustomPagination }),
      );
    },
    [getCurrentParams, onTableParamsChange, pagination],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    pageCount,

    state: {
      globalFilter,
      columnFilters,
      sorting,
      pagination,
      rowSelection,
    },

    enableRowSelection,
    enableMultiRowSelection,

    onGlobalFilterChange: handleGlobalFilterChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onSortingChange: handleSortingChange,
    onPaginationChange: handlePaginationChange,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),

    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });

  const contextValue: DataTableContextValue<TData> = {
    table,
    totalRows,
    globalFilter,
    setGlobalFilter: handleGlobalFilterChange,
    columnFilters,
    setColumnFilters: handleColumnFiltersChange,
    sorting,
    setSorting: handleSortingChange,
    pagination,
    setPagination: handleCustomPaginationChange,
    rowSelection,
    setRowSelection,
  };

  return (
    <DataTableContext.Provider
      value={contextValue as unknown as DataTableContextValue<unknown>}
    >
      <div className={cn("w-full grid gap-4", className)}>{children}</div>
    </DataTableContext.Provider>
  );
}
