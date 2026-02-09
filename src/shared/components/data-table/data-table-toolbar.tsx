import type { FilterConfig } from "@/shared/lib/types/table";
import { useDataTable } from "@/shared/providers/data-table-provider";
import { RiCloseLine } from "@remixicon/react";
import SearchInput from "../search-input";
import { Button } from "../ui/button";
import { DataTableDropdownFilter } from "./data-table-filters";

type DataTableToolbarProps = {
  filters?: FilterConfig[];
  searchEnabled?: boolean;
};

const DataTableToolbar = ({
  filters,
  searchEnabled = true,
}: DataTableToolbarProps) => {
  const { globalFilter, setGlobalFilter, columnFilters, setColumnFilters } =
    useDataTable();

  const hasAppliedFilters =
    (columnFilters && columnFilters.length > 0) ||
    (globalFilter && globalFilter.length > 0);

  const handleReset = () => {
    setGlobalFilter("");
    setColumnFilters([]);
  };

  return (
    <div className="flex w-full flex-wrap items-center gap-2">
      {searchEnabled && (
        <SearchInput
          className="max-w-sm"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      )}

      <div className="flex items-center gap-2">
        {columnFilters &&
          filters?.map((filter) => {
            return (
              <DataTableDropdownFilter
                key={filter.id}
                filter={filter}
                columnFilters={columnFilters}
                onColumnFiltersChange={setColumnFilters}
              />
            );
          })}

        {hasAppliedFilters && (
          <Button variant="ghost" onClick={handleReset}>
            <RiCloseLine />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default DataTableToolbar;
