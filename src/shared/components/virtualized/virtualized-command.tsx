import type { DropdownOption } from "@/shared/lib/types/dropdown";
import { cn } from "@/shared/lib/utils";
import { Tooltip } from "@base-ui/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useMemo, useRef, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "../ui/command";
import { Skeleton } from "../ui/skeleton";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export type VirtualizedCommandProps = {
  options?: DropdownOption[];
  placeholder?: string;
  emptyMessage?: string;
  height?: number;
  loading?: boolean;
  disableSearch?: boolean;
  overscan?: number;
  multiple?: boolean;
  selectedOption?: DropdownOption | DropdownOption[];
  onValueChange?: (option: DropdownOption[] | DropdownOption | null) => void;
};

const VirtualizedCommand = ({
  options = [],
  placeholder = "Search...",
  emptyMessage = "No results found.",
  height = 250,
  loading,
  disableSearch,
  multiple = false,
  selectedOption,
  onValueChange,
  overscan = 5,
}: VirtualizedCommandProps) => {
  // actual options available after search
  const [filteredOptions, setFilteredOptions] =
    useState<DropdownOption[]>(options);

  // virtualization
  const parentRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan,
  });

  // options to be displayed
  const virtualOptions = virtualizer.getVirtualItems();

  const selectedSet = useMemo(() => {
    if (!multiple) return new Set<string>();

    return new Set(
      ((selectedOption as DropdownOption[]) ?? []).map((o) => o.value)
    );
  }, [multiple, selectedOption]);

  const isAllSelected = useMemo(() => {
    if (!multiple || filteredOptions.length === 0) return false;
    return filteredOptions.every((o) => selectedSet.has(o.value));
  }, [multiple, filteredOptions, selectedSet]);

  const isOptionSelected = useCallback(
    (value: string) => {
      if (!multiple) return (selectedOption as DropdownOption)?.value === value;

      return selectedSet.has(value);
    },
    [multiple, selectedOption, selectedSet]
  );

  // custom function to handle search
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

  // toggles an option selection
  const handleToggle = useCallback(
    (option: DropdownOption) => {
      if (!onValueChange) return;

      if (multiple) {
        const selectedOptions = (selectedOption as DropdownOption[]) ?? [];
        const isCurrentSelected = isOptionSelected(option.value);

        const newSelections = isCurrentSelected
          ? selectedOptions.filter((o) => o.value !== option.value)
          : [...selectedOptions, option];

        onValueChange(newSelections);
      } else {
        onValueChange(option);
      }
    },
    [multiple, selectedOption, onValueChange, isOptionSelected]
  );

  // toggles selection for all filtered options
  const handleToggleAll = useCallback(() => {
    if (!onValueChange || !multiple) return;

    if (isAllSelected) {
      onValueChange([]);
    } else {
      onValueChange(filteredOptions);
    }
  }, [onValueChange, multiple, isAllSelected, filteredOptions]);

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
        style={{
          maxHeight: height,
          scrollBehavior: "smooth",
        }}
        onWheel={(e) => {
          e.stopPropagation();
        }}
      >
        {loading ? (
          <CommandGroup>
            <Skeleton className="mb-1 h-8 w-full" />
            <Skeleton className="mb-1 h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </CommandGroup>
        ) : (
          <>
            <CommandEmpty>
              {options.length > 0 ? emptyMessage : "No options found."}
            </CommandEmpty>

            <CommandGroup>
              {multiple && filteredOptions.length > 0 && (
                <CommandItem
                  onSelect={handleToggleAll}
                  className={cn(
                    "command-item:hidden cursor-pointer",
                    isAllSelected && "bg-muted/50"
                  )}
                >
                  <Checkbox
                    checked={isAllSelected}
                    indeterminate={
                      (selectedOption as DropdownOption[])?.length > 0 &&
                      (selectedOption as DropdownOption[])?.length <
                        filteredOptions.length
                    }
                  />
                  <span className="font-medium">Select All</span>

                  <CommandShortcut className="tracking-normal">
                    <p>
                      {(selectedOption as DropdownOption[])?.length} of{" "}
                      {filteredOptions.length}
                    </p>
                  </CommandShortcut>
                </CommandItem>
              )}

              <div
                style={{
                  height: `${virtualizer.getTotalSize()}px`,
                  position: "relative",
                }}
                className="grid min-w-max overflow-hidden"
              >
                <TooltipProvider delay={500}>
                  {virtualOptions.map((virtualRow) => {
                    const filteredOption = filteredOptions[virtualRow.index];

                    if (!filteredOption) return null;

                    const isSelected = isOptionSelected(filteredOption.value);

                    return (
                      <CommandItem
                        key={filteredOption.value}
                        value={filteredOption.value}
                        onSelect={() => handleToggle(filteredOption)}
                        data-checked={!multiple && isSelected}
                        className={cn(
                          "absolute top-0 left-0 w-full cursor-pointer",
                          isSelected && "bg-muted/50"
                        )}
                        style={{
                          height: `${virtualRow.size}px`,
                          transform: `translateY(${virtualRow.start}px)`,
                          userSelect: "none",
                        }}
                      >
                        {multiple && (
                          <Checkbox
                            checked={isSelected}
                            className="size-4 shrink-0 text-inherit"
                          />
                        )}

                        <Tooltip.Root>
                          <TooltipTrigger className="min-w-0">
                            <span className="block truncate">
                              {filteredOption.label}
                            </span>
                          </TooltipTrigger>

                          <TooltipContent side="right" sideOffset={10}>
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
