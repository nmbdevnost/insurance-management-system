import type { FilterConfig } from "@/shared/lib/types/table";
import { useDataTable } from "@/shared/providers/data-table-provider";
import SearchInput from "../search-input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Skeleton } from "../ui/skeleton";

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
            <Select
              key={filter.label}
              value={columFilter?.value ?? ""}
              onValueChange={(value) =>
                setColumnFilters((prev) => {
                  const existingFilter = prev.find(
                    (columnFilter) => columnFilter.id === filter.id
                  );
                  if (existingFilter) {
                    return prev.map((columnFilter) =>
                      columnFilter.id === filter.id
                        ? { ...columnFilter, value }
                        : columnFilter
                    );
                  }
                  return [...prev, { id: filter.id, value }];
                })
              }
            >
              <SelectTrigger render={<Button variant="outline" />}>
                {selectedOption ? (
                  <span>{selectedOption.label}</span>
                ) : (
                  <span>{filter.label}</span>
                )}
              </SelectTrigger>

              <SelectContent>
                {filter.optionsLoading ? (
                  <div className="flex w-full flex-col gap-1 p-1">
                    <Skeleton className="h-7" />
                    <Skeleton className="h-7" />
                    <Skeleton className="h-7" />
                  </div>
                ) : (
                  filter.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          );
        })}
      </div>
    </div>
  );
};

export default DataTableToolbar;
