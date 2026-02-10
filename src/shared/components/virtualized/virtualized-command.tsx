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

  const isAllSelected = useMemo(() => {
    if (!multiple) return false;

    const selectedOptions = (selectedOption as DropdownOption[]) || [];

    return filteredOptions.every((option) =>
      selectedOptions.some((item) => item.value === option.value)
    );
  }, [multiple, filteredOptions, selectedOption]);

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

  // util function to get if an option is selected or not
  const getIsOptionSelected = useCallback(
    (value: string) => {
      if (!multiple) {
        const selectedValue = (selectedOption as DropdownOption)?.value;
        return selectedValue === value;
      } else {
        const selectedOptions = (selectedOption as DropdownOption[]) || [];
        return selectedOptions?.some((item) => item.value === value);
      }
    },
    [selectedOption, multiple]
  );

  // const getIsAllSelected = useCallback(() => {
  //   if (!multiple) return false;

  //   const selectedOptions = (selectedOption as DropdownOption[]) || [];

  //   return filteredOptions.every((option) =>
  //     selectedOptions.some((item) => item.value === option.value)
  //   );
  // }, [filteredOptions, selectedOption, multiple]);

  // toggles an option selection
  const handleToggle = useCallback(
    (option: DropdownOption) => {
      if (!onValueChange) return;

      const isSelected = getIsOptionSelected(option.value);

      if (multiple) {
        const selectedOptions = (selectedOption as DropdownOption[]) || [];

        if (isSelected) {
          // filter selected option
          const newSelections = selectedOptions.filter(
            (selectedOption) => option.value !== selectedOption.value
          );
          onValueChange(newSelections);
        } else {
          // add selected option
          const newSelections = [...selectedOptions, option];
          onValueChange(newSelections);
        }
      } else {
        onValueChange(isSelected ? null : option);
      }
    },
    [onValueChange, multiple, selectedOption, getIsOptionSelected]
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
                          <TooltipTrigger>
                            <div className="min-w-0">
                              <span className="block truncate">
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
