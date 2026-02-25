import useControlledState from "@/shared/hooks/use-controlled-state";
import type { DropdownOption } from "@/shared/lib/types/dropdown";
import { cn } from "@/shared/lib/utils";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { RiArrowDownSLine, RiCloseLine } from "@remixicon/react";
import { useMemo, type ComponentProps } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import VirtualizedCommand, {
  type VirtualizedCommandProps,
} from "./virtualized-command";

type TriggerState = {
  isSelected: boolean;
  displayedOptions: DropdownOption[];
  remaining: number;
};

type VirtualizedComboboxProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: (
    state: TriggerState
  ) => ComponentProps<typeof PopoverTrigger>["render"];
  autoWidth?: boolean;
  className?: string;
  triggerClassName?: string;
  modal?: boolean;
  limit?: number;
  disabled?: boolean;
  invalid?: boolean;
} & VirtualizedCommandProps;

/** Extra horizontal space (in px) added to the calculated content width to account for popover padding. */
const CONTENT_WIDTH_OFFSET = 48;

/** Estimated average character width (in px) used to approximate label text width from character count. */
const CHARACTER_OFFSET = 8;

const VirtualizedCombobox = ({
  open,
  onOpenChange,
  trigger,
  autoWidth = true,
  modal = true,
  className,
  limit = 3,
  disabled,
  invalid,
  options = [],
  triggerClassName,
  ...commandProps
}: VirtualizedComboboxProps) => {
  const { value, onChange } = useControlledState({
    value: open,
    onChange: onOpenChange,
    defaultValue: false,
  });

  const isMultiple = commandProps.multiple;

  const selectedArray = isMultiple
    ? ((commandProps.selectedOption as DropdownOption[]) ?? [])
    : [commandProps.selectedOption as DropdownOption];

  const isSelected = isMultiple
    ? selectedArray.length > 0
    : !!(commandProps.selectedOption as DropdownOption)?.value;

  const displayedOptions = selectedArray.slice(0, limit);
  const remaining = selectedArray.length - limit;

  const triggerState: TriggerState = {
    isSelected,
    displayedOptions,
    remaining,
  };

  const handleClearOption = (option: DropdownOption) => {
    if (!isMultiple) return;

    const selectedOptions = commandProps.selectedOption as DropdownOption[];
    const newOptions = selectedOptions.filter(
      (item) => item.value !== option.value
    );
    commandProps.onValueChange?.(newOptions);
  };

  const contentWidth = useMemo(() => {
    const longest = options.reduce(
      (max, o) => (o.label.length > max ? o.label.length : max),
      0
    );
    return longest * CHARACTER_OFFSET;
  }, [options]);

  return (
    <Popover modal={modal} open={value} onOpenChange={onChange}>
      {modal && (
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Backdrop className="fixed inset-0 z-50 duration-100" />
        </PopoverPrimitive.Portal>
      )}

      <PopoverTrigger
        data-selected={isSelected}
        disabled={disabled}
        render={
          trigger ? (
            trigger(triggerState)
          ) : (
            <Button
              variant="outline"
              className={cn(
                "text-muted-foreground! h-fit min-h-8 justify-between py-1 font-normal hover:bg-inherit aria-expanded:bg-inherit",
                "data-[selected=true]:text-foreground!",
                triggerClassName
              )}
              aria-invalid={invalid}
            >
              {isSelected ? (
                <>
                  {isMultiple ? (
                    <div className="flex flex-wrap items-center gap-1 overflow-x-auto">
                      {displayedOptions.map((item) => (
                        <Badge key={item.value + "-selected-badge"}>
                          {item.label}

                          <div
                            role="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClearOption(item);
                            }}
                            className="hover:bg-muted/30 rounded-full transition-colors duration-150"
                          >
                            <RiCloseLine className="size-3" />
                          </div>
                        </Badge>
                      ))}

                      {remaining > 0 && <Badge>+{remaining}</Badge>}
                    </div>
                  ) : (
                    <>
                      {(commandProps.selectedOption as DropdownOption)?.label}
                    </>
                  )}
                </>
              ) : (
                <>{commandProps.placeholder}</>
              )}
              <RiArrowDownSLine
                className={cn(
                  "ml-auto transition-transform",
                  value && "rotate-180"
                )}
              />
            </Button>
          )
        }
      />

      <PopoverContent
        align="start"
        style={{
          width: autoWidth
            ? contentWidth + CONTENT_WIDTH_OFFSET
            : "fit-content",
        }}
        className={cn("max-w-72 min-w-44 p-0", className)}
      >
        <VirtualizedCommand options={options} {...commandProps} />
      </PopoverContent>
    </Popover>
  );
};

export default VirtualizedCombobox;
