import type { TableParams } from "@/providers/data-table-provider";

export const PAGINATION_PAGE_SIZES = [10, 20, 25, 30, 40, 50];

const DEFAULT_PAGE_INDEX = 0;

const DEFAULT_PAGE_SIZE = 10;

export const DEFAULT_TABLE_PARAMS: TableParams = {
  pagination: {
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
    page: DEFAULT_PAGE_INDEX + 1,
  },
  sorting: [],
  columnFilters: [],
  globalFilter: "",
};
