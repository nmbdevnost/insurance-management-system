import useControlledState from "@/shared/hooks/use-controlled-state";
import type { DropdownOption } from "@/shared/lib/types/dropdown";
import { cn } from "@/shared/lib/utils";
import { RiArrowDownSLine, RiCloseLine } from "@remixicon/react";
import type { ComponentProps } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import VirtualizedCommand, {
  type VirtualizedCommandProps,
} from "./virtualized-command";

type VirtualizedComboboxProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ComponentProps<typeof PopoverTrigger>["render"];
  autoWidth?: boolean;
  className?: string;
  modal?: boolean;
  limit?: number;
} & VirtualizedCommandProps;

const VirtualizedCombobox = ({
  open,
  onOpenChange,
  trigger,
  autoWidth = true,
  modal = true,
  className,
  limit = 3,
  ...commandProps
}: VirtualizedComboboxProps) => {
  const { value, onChange } = useControlledState({
    value: open,
    onChange: onOpenChange,
    defaultValue: false,
  });

  const isMultiple = commandProps.multiple;

  const displayedOptions = isMultiple
    ? (commandProps.selectedOption as DropdownOption[]).slice(0, limit)
    : [];

  const remainingOptions = isMultiple
    ? (commandProps.selectedOption as DropdownOption[]).length - limit
    : 0;

  return (
    <Popover modal={modal} open={value} onOpenChange={onChange}>
      <PopoverTrigger
        data-selected={!!commandProps.selectedOption}
        render={
          trigger ? (
            trigger
          ) : (
            <Button
              variant="outline"
              className={cn(
                "text-muted-foreground! h-fit min-h-8 justify-between py-1 font-normal",
                "data-[selected=true]:text-foreground!",
                className
              )}
            >
              {commandProps.selectedOption ? (
                <>
                  {isMultiple ? (
                    <div className="flex flex-wrap items-center gap-1 overflow-x-auto">
                      {displayedOptions.map((item) => (
                        <Badge>
                          {item.label} <RiCloseLine />
                        </Badge>
                      ))}

                      {remainingOptions > 0 && (
                        <Badge>+{remainingOptions}</Badge>
                      )}
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
        className={cn(
          "min-w-44 p-0",
          autoWidth && "w-(--anchor-width)",
          className
        )}
      >
        <VirtualizedCommand {...commandProps} />
      </PopoverContent>
    </Popover>
  );
};

export default VirtualizedCombobox;
