import type { TableParams } from "@/shared/providers/data-table-provider";

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
    {} as Record<string, unknown>
  );

  const sorting = tableParams.sorting || [];
  const sortBy = sorting[0];

  return {
    page: tableParams.pagination.page,
    pageSize: tableParams.pagination.pageSize,

    search: tableParams.globalFilter || undefined,

    sortBy,
    sortOrder: sortBy ? (sortBy.desc ? "desc" : "asc") : undefined,

    ...filterParams,
  };
}
