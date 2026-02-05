import type { DropdownOption } from "@/shared/lib/types/dropdown";
import { cn } from "@/shared/lib/utils";
import { formatString } from "@/shared/lib/utils/format";
import { RiFilterLine } from "@remixicon/react";
import { useState } from "react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import VirtualizedCombobox from "../../virtualized/virtualized-combobox";

type DataTableDropdownFilterProps = {
  id: string;
  label: string;
  options: DropdownOption[];
  disableSearch?: boolean;
  disabled?: boolean;
  selectedValue: string[];
  onValueChange: (filterKey: string, value: string[]) => void;
  loading?: boolean;
  closeOnSelect?: boolean;
};

const DataTableDropdownFilter = ({
  label,
  id,
  onValueChange,
  options,
  selectedValue,
  disableSearch,
  disabled,
  loading,
  closeOnSelect,
}: DataTableDropdownFilterProps) => {
  const [open, setOpen] = useState(false);

  const selectedOptions = options?.filter((option) =>
    selectedValue.includes(option.value)
  );

  const handleSelect = (options: DropdownOption[]) => {
    const selectedOption = options[0];

    const value = selectedOption?.value;

    const isSelected = selectedOptions.some((option) => option.value === value);

    let newSelections = [];

    if (isSelected) {
      newSelections = selectedValue?.filter((selection) => selection !== value);
    } else {
      newSelections = [value];
    }

    onValueChange(id, newSelections);

    if (closeOnSelect) {
      setOpen(false);
    }
  };

  return (
    <VirtualizedCombobox
      open={open}
      onOpenChange={setOpen}
      commandProps={{
        selectedOption: selectedOptions,
        onValueChange: handleSelect,
        options,
        disableSearch,
        loading,
      }}
      trigger={
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={cn(
            "h-8 border-dashed",
            selectedValue?.length > 0 && "text-primary! border-primary"
          )}
          disabled={disabled}
        >
          <RiFilterLine />

          {formatString(label ?? "Filter")}

          {selectedValue?.length > 0 && (
            <>
              <Separator
                orientation="vertical"
                className="bg-primary mx-2 h-full"
              />

              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary rounded-sm px-1 font-semibold lg:hidden"
              >
                1
              </Badge>

              <div className="hidden space-x-1 lg:flex">
                {selectedOptions.map((option) => (
                  <Badge
                    key={"selected-option-badge-" + option.value}
                    variant="secondary"
                    className="bg-primary/10 text-primary rounded-sm px-1 font-semibold"
                  >
                    {option.label}
                  </Badge>
                ))}
              </div>
            </>
          )}
        </Button>
      }
      modal={false}
    />
  );
};

export default DataTableDropdownFilter;
