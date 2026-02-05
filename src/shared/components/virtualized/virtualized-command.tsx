import type { DropdownOption } from "@/shared/lib/types/dropdown";
import { cn } from "@/shared/lib/utils";
import { Tooltip } from "@base-ui/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useRef, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export type VirtualizedCommandProps = {
  options?: DropdownOption[];
  placeholder?: string;
  emptyMessage?: string;
  height?: number;
  loading?: boolean;
  disableSearch?: boolean;
  overscan?: number;
  mode?: "single" | "multiple";
  selectedOption?: DropdownOption[];
  onValueChange?: (options: DropdownOption[]) => void;
};

const VirtualizedCommand = ({
  options = [],
  placeholder = "Search...",
  emptyMessage = "No results found.",
  height = 250,
  loading,
  disableSearch,
  mode = "single",
  selectedOption = [],
  onValueChange,
  overscan = 5,
}: VirtualizedCommandProps) => {
  const isMultiple = mode === "multiple";

  const [filteredOptions, setFilteredOptions] =
    useState<DropdownOption[]>(options);

  const parentRef = useRef<HTMLDivElement>(null);

  // Sync filteredOptions when options prop changes
  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan,
  });

  const virtualOptions = virtualizer.getVirtualItems();

  const handleSearch = useCallback(
    (search: string) => {
      if (!search) {
        setFilteredOptions(options);
        return;
      }

      const filtered = options.filter(
        (option) =>
          option.label.toLowerCase().includes(search.toLowerCase()) ||
          option.value.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredOptions(filtered);
    },
    [options]
  );

  const getIsOptionSelected = useCallback(
    (value: string) => {
      return selectedOption.some((item) => item.value === value);
    },
    [selectedOption]
  );

  const getSelectAllState = useCallback(() => {
    if (!isMultiple) return { checked: false, indeterminate: false };

    if (selectedOption.length === 0) {
      return { checked: false, indeterminate: false };
    }
    if (filteredOptions.length === 0) {
      return { checked: false, indeterminate: false };
    }

    // Count how many filtered options are selected
    const selectedCount = filteredOptions.filter((option) =>
      selectedOption.some((item) => item.value === option.value)
    ).length;

    if (selectedCount === 0) {
      return { checked: false, indeterminate: false };
    } else if (selectedCount === filteredOptions.length) {
      return { checked: true, indeterminate: false };
    } else {
      return { checked: false, indeterminate: true };
    }
  }, [filteredOptions, selectedOption, isMultiple]);

  const handleToggle = useCallback(
    (option: DropdownOption) => {
      if (!onValueChange) return;

      const isSelected = getIsOptionSelected(option.value);

      if (!isMultiple) {
        // Single mode: only one item in array, or empty array
        if (isSelected) {
          onValueChange([]);
        } else {
          onValueChange([option]);
        }
      } else {
        // Multiple mode: add/remove from array
        if (isSelected) {
          const newSelections = selectedOption.filter(
            (item) => item.value !== option.value
          );
          onValueChange(newSelections);
        } else {
          const newSelections = [...selectedOption, option];
          onValueChange(newSelections);
        }
      }
    },
    [onValueChange, isMultiple, selectedOption, getIsOptionSelected]
  );

  const handleToggleAll = useCallback(() => {
    if (!onValueChange || !isMultiple) return;

    const { checked } = getSelectAllState();

    if (checked) {
      // Deselect all filtered options
      const filteredValues = new Set(filteredOptions.map((opt) => opt.value));
      const newSelections = selectedOption.filter(
        (item) => !filteredValues.has(item.value)
      );
      onValueChange(newSelections);
    } else {
      // Select all filtered options
      const selectedValues = new Set(selectedOption.map((opt) => opt.value));
      const newOptions = filteredOptions.filter(
        (opt) => !selectedValues.has(opt.value)
      );
      onValueChange([...selectedOption, ...newOptions]);
    }
  }, [
    onValueChange,
    isMultiple,
    getSelectAllState,
    filteredOptions,
    selectedOption,
  ]);

  const selectAllState = getSelectAllState();

  return (
    <Command shouldFilter={false}>
      {!disableSearch && (
        <CommandInput
          placeholder={placeholder}
          onValueChange={handleSearch}
          disabled={loading}
        />
      )}

      <CommandList
        ref={parentRef}
        className="overflow-y-auto"
        style={{
          maxHeight: height,
          scrollBehavior: "smooth",
        }}
        onWheel={(e) => {
          e.stopPropagation();
        }}
      >
        {loading ? (
          <></>
        ) : (
          <>
            <CommandEmpty>
              {options.length > 0 ? emptyMessage : "No options found."}
            </CommandEmpty>

            <CommandGroup>
              {isMultiple && filteredOptions.length > 0 && (
                <CommandItem
                  onSelect={handleToggleAll}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectAllState.checked}
                      indeterminate={selectAllState.indeterminate}
                    />
                    <span className="font-medium">Select All</span>
                  </div>
                </CommandItem>
              )}

              <div
                style={{
                  height: `${virtualizer.getTotalSize()}px`,
                  position: "relative",
                }}
              >
                <TooltipProvider delay={500}>
                  {virtualOptions.map((virtualRow) => {
                    const filteredOption = filteredOptions[virtualRow.index];

                    if (!filteredOption) return null;

                    const isSelected = getIsOptionSelected(
                      filteredOption.value
                    );

                    return (
                      <CommandItem
                        key={filteredOption.value}
                        value={filteredOption.value}
                        onSelect={() => handleToggle(filteredOption)}
                        className={cn(
                          "absolute top-0 left-0 w-full cursor-pointer",
                          isSelected && "bg-muted/50",
                          !isMultiple && "justify-between"
                        )}
                        style={{
                          height: `${virtualRow.size}px`,
                          transform: `translateY(${virtualRow.start}px)`,
                          userSelect: "none",
                        }}
                        data-checked={isSelected && !isMultiple}
                      >
                        {isMultiple && (
                          <Checkbox
                            checked={isSelected}
                            className="size-4 shrink-0 text-inherit"
                          />
                        )}

                        <Tooltip.Root>
                          <TooltipTrigger>
                            <div className="grid min-w-0">
                              <span className="truncate">
                                {filteredOption.label}
                              </span>
                            </div>
                          </TooltipTrigger>

                          <TooltipContent>
                            {filteredOption.label}
                          </TooltipContent>
                        </Tooltip.Root>
                      </CommandItem>
                    );
                  })}
                </TooltipProvider>
              </div>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </Command>
  );
};

export default VirtualizedCommand;
