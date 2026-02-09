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
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type ColumnMetaWithPinning = {
  pin?: "left" | "right";
};

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
  globalFilter?: string;
  setGlobalFilter: (value: string) => void;

  // filters
  columnFilters?: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;

  // sorting
  sorting?: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;

  // pagination
  pagination?: CustomPaginationState;
  setPagination: React.Dispatch<React.SetStateAction<CustomPaginationState>>;

  // selection
  rowSelection: RowSelectionState;
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
};

export type DataTableProviderProps<TData> = {
  columns: ColumnDef<TData>[];
  data?: TData[];
  children: React.ReactNode;
  pageCount?: number;
  totalRows?: number;
  onTableParamsChange?: React.Dispatch<React.SetStateAction<TableParams>>;
  enableRowSelection?: boolean;
  enableMultiRowSelection?: boolean;
  tableParams?: TableParams;
  className?: string;
};

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

export function DataTableProvider<TData>({
  columns,
  data = [],
  children,
  pageCount,
  totalRows,
  onTableParamsChange,
  enableRowSelection,
  enableMultiRowSelection,
  tableParams,
  className,
}: DataTableProviderProps<TData>) {
  const { columnFilters, globalFilter, pagination, sorting } =
    tableParams || {};

  // Determine if pagination is controlled
  const isControlledPagination = !!pagination && !!onTableParamsChange;

  // Local state for uncontrolled pagination
  const [internalPagination, setInternalPagination] =
    useState<CustomPaginationState>({
      pageIndex: 0,
      pageSize: 10,
      page: 1,
    });

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  /**
   * Handles changes to the global search filter.
   * Updates the global filter state and notifies parent component of parameter changes.
   * @param value - The new global filter string to apply
   */
  const handleGlobalFilterChange = useCallback(
    (value: string) => {
      onTableParamsChange?.((prev) => ({
        ...prev,
        globalFilter: value,
      }));
    },
    [onTableParamsChange]
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
        | ((old: ColumnFiltersState) => ColumnFiltersState)
    ) => {
      if (!columnFilters || !onTableParamsChange) return;

      const newColumnFilters =
        typeof updater === "function" ? updater(columnFilters) : updater;

      onTableParamsChange((prev) => ({
        ...prev,
        columnFilters: newColumnFilters,
      }));
    },
    [onTableParamsChange, columnFilters]
  );

  /**
   * Handles changes to table sorting configuration.
   * Accepts either a new sorting state or an updater function for functional updates.
   * Notifies parent component after updating the sorting state.
   * @param updater - New sorting state or function that receives old state and returns new state
   */
  const handleSortingChange = useCallback(
    (updater: SortingState | ((old: SortingState) => SortingState)) => {
      if (!sorting || !onTableParamsChange) return;

      const newSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      onTableParamsChange((prev) => ({ ...prev, sorting: newSorting }));
    },
    [onTableParamsChange, sorting]
  );

  /**
   * Handles changes to table pagination (page index and page size).
   * Accepts either a new pagination state or an updater function for functional updates.
   * Automatically calculates the page number (pageIndex + 1) and includes it in the state.
   * Supports both controlled and uncontrolled modes.
   * @param updater - New pagination state or function that receives old state and returns new state
   */
  const handlePaginationChange = useCallback(
    (
      updater: PaginationState | ((old: PaginationState) => PaginationState)
    ) => {
      if (isControlledPagination && pagination && onTableParamsChange) {
        // Controlled mode
        const basePagination: PaginationState =
          typeof updater === "function"
            ? updater({
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize,
              })
            : updater;

        const newPagination: CustomPaginationState = {
          ...basePagination,
          page: basePagination.pageIndex + 1,
        };

        onTableParamsChange((prev) => ({ ...prev, pagination: newPagination }));
      } else {
        // Uncontrolled mode
        setInternalPagination((prev) => {
          const basePagination: PaginationState =
            typeof updater === "function"
              ? updater({
                  pageIndex: prev.pageIndex,
                  pageSize: prev.pageSize,
                })
              : updater;

          return {
            ...basePagination,
            page: basePagination.pageIndex + 1,
          };
        });
      }
    },
    [isControlledPagination, onTableParamsChange, pagination]
  );

  /**
   * Wrapper for external consumers to set pagination with CustomPaginationState.
   * Converts CustomPaginationState to PaginationState for React Table compatibility.
   * Supports both controlled and uncontrolled modes.
   * @param updater - New custom pagination state or function that receives old state and returns new state
   */
  const handleCustomPaginationChange = useCallback(
    (
      updater:
        | CustomPaginationState
        | ((old: CustomPaginationState) => CustomPaginationState)
    ) => {
      if (isControlledPagination && pagination && onTableParamsChange) {
        // Controlled mode
        const newCustomPagination =
          typeof updater === "function" ? updater(pagination) : updater;

        onTableParamsChange((prev) => ({
          ...prev,
          pagination: newCustomPagination,
        }));
      } else {
        // Uncontrolled mode
        setInternalPagination((prev) => {
          return typeof updater === "function" ? updater(prev) : updater;
        });
      }
    },
    [isControlledPagination, onTableParamsChange, pagination]
  );

  const filterPinned = useCallback(
    (
      pinnedDirection: ColumnMetaWithPinning["pin"],
      columns: DataTableProviderProps<TData>["columns"]
    ) => {
      const filteredColumns =
        columns?.filter(
          (col) =>
            (col.meta as ColumnMetaWithPinning)?.pin === pinnedDirection &&
            ("accessorKey" in col || "id" in col)
        ) || [];

      return filteredColumns?.map((col) => {
        return "accessorKey" in col ? col.accessorKey : col.id!;
      });
    },
    []
  );

  const getPinnedColumns = useMemo(() => {
    const leftPinned = filterPinned("left", columns);
    const rightPinned = filterPinned("right", columns);

    return { left: leftPinned, right: rightPinned };
  }, [filterPinned, columns]);

  // Use controlled pagination if available, otherwise use internal state
  const activePagination = isControlledPagination
    ? pagination
    : internalPagination;

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    pageCount,

    state: {
      globalFilter,
      columnFilters,
      sorting,
      pagination: activePagination,
      rowSelection,
      columnPinning: getPinnedColumns as ColumnPinningState,
    },

    enableColumnPinning: true,
    enableRowSelection,
    enableMultiRowSelection,

    onGlobalFilterChange: handleGlobalFilterChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onSortingChange: handleSortingChange,
    onPaginationChange: handlePaginationChange,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    // Include pagination row model for uncontrolled mode
    getPaginationRowModel: isControlledPagination
      ? undefined
      : getPaginationRowModel(),

    // Manual controls based on mode
    manualPagination: isControlledPagination,
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
    pagination: activePagination,
    setPagination: handleCustomPaginationChange,
    rowSelection,
    setRowSelection,
  };

  return (
    <DataTableContext.Provider
      value={contextValue as unknown as DataTableContextValue<unknown>}
    >
      <div className={cn("grid w-full gap-4", className)}>{children}</div>
    </DataTableContext.Provider>
  );
}
