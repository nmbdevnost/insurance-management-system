import type { DropdownOption } from "@/shared/lib/types/dropdown";
import type { FilterConfig } from "@/shared/lib/types/table";
import { cn } from "@/shared/lib/utils";
import { formatString } from "@/shared/lib/utils/format";
import { RiFilterLine } from "@remixicon/react";
import type { ColumnFiltersState } from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import VirtualizedCombobox from "../../virtualized/virtualized-combobox";

const DEFAULT_DISPLAY_OPTIONS = 3;

type DataTableDropdownFilterProps = {
  filter: FilterConfig;
  columnFilters: ColumnFiltersState;
  onColumnFiltersChange: (filters: ColumnFiltersState) => void;
};

const DataTableDropdownFilter = ({
  columnFilters,
  filter,
  onColumnFiltersChange,
}: DataTableDropdownFilterProps) => {
  const {
    id,
    label,
    options,
    placeholder,
    mode = "single",
    disabled,
  } = filter || {};

  const isMultiple = mode === "multiple";

  // get current filter using id
  const currentFilter = useMemo(() => {
    return columnFilters?.find((f) => f.id === id);
  }, [columnFilters, id]);

  // find selected option/s
  const selectedOption = useMemo(() => {
    if (!currentFilter?.value) {
      return isMultiple ? [] : undefined;
    }

    if (isMultiple) {
      const values = currentFilter?.value as string[];
      return options?.filter((opt) => values.includes(opt.value));
    } else {
      const value = currentFilter.value as string;
      return options?.find((opt) => opt.value === value);
    }
  }, [currentFilter, options, isMultiple]);

  const handleValueChange = useCallback(
    (selected: DropdownOption | DropdownOption[] | null) => {
      const isSelectedArray = Array.isArray(selected);

      if (!selected || (isSelectedArray && selected.length === 0)) {
        const newFilters = columnFilters.filter((f) => f.id !== id);
        onColumnFiltersChange(newFilters);
        return;
      }

      const value = isSelectedArray
        ? selected.map((opt) => opt.value)
        : selected?.value;

      const existingFilterIndex = columnFilters.findIndex((f) => f.id === id);

      if (existingFilterIndex >= 0) {
        const newFilters = [...columnFilters];
        newFilters[existingFilterIndex] = { id, value };
        onColumnFiltersChange(newFilters);
      } else {
        onColumnFiltersChange([...columnFilters, { id, value }]);
      }
    },
    [columnFilters, onColumnFiltersChange, id]
  );

  const isSelected =
    selectedOption &&
    (isMultiple
      ? (selectedOption as DropdownOption[]).length > 0
      : (selectedOption as DropdownOption).value);

  const displayOptions = isMultiple
    ? (selectedOption as DropdownOption[]).slice(0, DEFAULT_DISPLAY_OPTIONS)
    : [selectedOption as DropdownOption];

  return (
    <VirtualizedCombobox
      selectedOption={selectedOption}
      placeholder={placeholder || formatString(label || "")}
      onValueChange={handleValueChange}
      {...filter}
      trigger={
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={cn(
            "h-8 border-dashed",
            isSelected && "text-primary! border-primary"
          )}
          disabled={disabled}
        >
          <RiFilterLine />

          {formatString(label ?? "Filter")}

          {isSelected && (
            <>
              <Separator
                orientation="vertical"
                className="bg-primary mx-1 h-full"
              />

              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary rounded-sm px-1 font-semibold lg:hidden"
              >
                {(selectedOption as DropdownOption[])?.length}
              </Badge>

              <div className="hidden space-x-1 lg:flex">
                {displayOptions?.map((option) => (
                  <Badge
                    key={"selected-option-badge-" + option.value}
                    variant="secondary"
                    className="bg-primary/10 text-primary rounded-sm px-1 font-semibold"
                  >
                    {option.label}
                  </Badge>
                ))}
                {(selectedOption as DropdownOption[]).length >
                  DEFAULT_DISPLAY_OPTIONS && (
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary rounded-sm px-1 font-semibold"
                  >
                    +
                    {(selectedOption as DropdownOption[]).length -
                      DEFAULT_DISPLAY_OPTIONS}
                  </Badge>
                )}
              </div>
            </>
          )}
        </Button>
      }
    />
  );
};

export default DataTableDropdownFilter;
