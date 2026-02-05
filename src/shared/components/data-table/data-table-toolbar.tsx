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

  const hasAppliedFilters = columnFilters.length > 0 || globalFilter.length > 0;

  const handleReset = () => {
    setColumnFilters([]);
    setGlobalFilter("");
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
        {filters?.map((filter) => {
          const columFilter = columnFilters.find(
            (columnFilter) => columnFilter.id === filter.id
          );

          const selectedOption = filter.options?.find(
            (option) => option.value === columFilter?.value
          );

          return (
            <DataTableDropdownFilter
              {...filter}
              options={filter.options ?? []}
              selectedValue={selectedOption ? [selectedOption.value] : []}
              onValueChange={(_id, value) => {
                setColumnFilters((prev) => {
                  const existingFilter = prev.find(
                    (columnFilter) => columnFilter.id === filter.id
                  );
                  if (existingFilter) {
                    return prev.map((columnFilter) =>
                      columnFilter.id === filter.id
                        ? { ...columnFilter, value: value[0] }
                        : columnFilter
                    );
                  }
                  return [...prev, { id: filter.id, value: value[0] }];
                });
              }}
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
