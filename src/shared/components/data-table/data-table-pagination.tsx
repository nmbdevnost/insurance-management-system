import { PAGINATION_PAGE_SIZES } from "@/shared/lib/constants/data-table";
import { cn } from "@/shared/lib/utils";
import { getPageRange } from "@/shared/lib/utils/data-table";
import { useDataTable } from "@/shared/providers/data-table-provider";
import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
import { useMemo } from "react";
import { Button, buttonVariants } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Typography } from "../ui/typography";

const DataTablePagination = ({ className }: { className?: string }) => {
  const { table, setPagination } = useDataTable();

  const currentPage = table.getState().pagination.pageIndex;
  const totalPages = table.getPageCount();

  const pageRange = useMemo(
    () => getPageRange(currentPage, totalPages),
    [currentPage, totalPages]
  );

  return (
    <div
      className={cn(
        "flex flex-col flex-wrap items-center justify-between gap-4 px-2 md:flex-row",
        className
      )}
    >
      {/* Selections */}
      <div className="text-muted-foreground flex-1 text-sm">
        <Typography variant="label" muted>
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </Typography>
      </div>

      {/* Page Controls */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <RiArrowLeftLine />
        </Button>

        {/* Pages */}
        {pageRange.map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "pointer-events-none"
              )}
            >
              &#8230;
            </span>
          ) : (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "ghost"}
              size="icon"
              className="min-w-fit px-1"
              onClick={() => table.setPageIndex(page)}
              type="button"
            >
              {page + 1}
            </Button>
          )
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <RiArrowRightLine />
        </Button>
      </div>

      {/* Page Size */}
      <div className="flex flex-1 justify-end">
        <Select
          items={PAGINATION_PAGE_SIZES.map((pageSize) => ({
            value: `${pageSize}`,
            label: `${pageSize}/page`,
          }))}
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            setPagination((prev) => ({
              ...prev,
              page: 1,
              pageIndex: 0,
              pageSize: Number(value),
            }));
          }}
        >
          <SelectTrigger className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="top">
            {PAGINATION_PAGE_SIZES.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}/page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DataTablePagination;
