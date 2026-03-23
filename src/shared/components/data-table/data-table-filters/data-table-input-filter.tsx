import type { FilterConfig } from "@/shared/lib/types/table";
import { cn } from "@/shared/lib/utils";
import { formatString } from "@/shared/lib/utils/format";
import { RiFilterLine } from "@remixicon/react";
import type { ColumnFiltersState } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Separator } from "../../ui/separator";

type DataTableInputFilterProps = {
  filter: FilterConfig;
  columnFilters: ColumnFiltersState;
  onColumnFiltersChange: (filters: ColumnFiltersState) => void;
  /** Debounce delay in ms @default 300 */
  debounceMs?: number;
};

const DEBOUNCE_MS = 300;

const DataTableInputFilter = ({
  filter,
  columnFilters,
  onColumnFiltersChange,
  debounceMs = DEBOUNCE_MS,
}: DataTableInputFilterProps) => {
  const { id, label, placeholder, disabled } = filter ?? {};

  const currentFilter = useMemo(
    () => columnFilters.find((f) => f.id === id),
    [columnFilters, id]
  );

  const currentValue = (currentFilter?.value as string) ?? "";

  const [inputValue, setInputValue] = useState(currentValue);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync local state if external filters are reset
  useEffect(() => {
    setInputValue(currentValue);
  }, [currentValue]);

  const commitValue = useCallback(
    (value: string) => {
      if (!value) {
        onColumnFiltersChange(columnFilters.filter((f) => f.id !== id));
        return;
      }

      const idx = columnFilters.findIndex((f) => f.id === id);
      if (idx >= 0) {
        const next = [...columnFilters];
        next[idx] = { id, value };
        onColumnFiltersChange(next);
      } else {
        onColumnFiltersChange([...columnFilters, { id, value }]);
      }
    },
    [columnFilters, onColumnFiltersChange, id]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);

      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => commitValue(value), debounceMs);
    },
    [commitValue, debounceMs]
  );

  const isSelected = Boolean(currentFilter?.value);
  const formattedLabel = formatString(label ?? "Filter");

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className={cn(
              "h-8 border-dashed",
              isSelected && "text-primary! border-primary"
            )}
            disabled={disabled}
          >
            <RiFilterLine />
            {formattedLabel}
            {isSelected && (
              <>
                <Separator
                  orientation="vertical"
                  className="bg-primary mx-1 h-full"
                />
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary rounded-sm px-1 font-semibold"
                >
                  {currentValue}
                </Badge>
              </>
            )}
          </Button>
        }
      ></PopoverTrigger>

      <PopoverContent className="w-56 p-2" align="start">
        <Input
          autoFocus
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder ?? formattedLabel}
          className="h-8"
        />
      </PopoverContent>
    </Popover>
  );
};

export default DataTableInputFilter;
