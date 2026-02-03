import type { TableParams } from "@/providers/data-table-provider";

/**
 * Generates URL query parameters from table params.
 * @param tableParams - The table parameters.
 * @returns An object containing the query parameters.
 */

export function generateQueryParams(tableParams: TableParams) {
  const filterParams = tableParams.columnFilters.reduce(
    (acc, filter) => {
      acc[filter.id] = filter.value;
      return acc;
    },
    {} as Record<string, unknown>,
  );

  return {
    page: tableParams.pagination.page,
    pageSize: tableParams.pagination.pageSize,

    search: tableParams.globalFilter,

    sortBy: tableParams.sorting[0]?.id,
    sortOrder: tableParams.sorting[0]?.desc ? "desc" : "asc",

    ...filterParams,
  };
}
