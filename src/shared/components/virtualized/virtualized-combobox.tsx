import useControlledState from "@/shared/hooks/use-controlled-state";
import { cn } from "@/shared/lib/utils";
import type { ComponentProps } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import VirtualizedCommand, {
  type VirtualizedCommandProps,
} from "./virtualized-command";

const VirtualizedCombobox = ({
  open,
  onOpenChange,
  trigger,
  autoWidth = true,
  modal = false,
  className,
  commandProps,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ComponentProps<typeof PopoverTrigger>["render"];
  autoWidth?: boolean;
  className?: string;
  modal?: boolean;
  commandProps: VirtualizedCommandProps;
}) => {
  const { value, onChange } = useControlledState({
    value: open,
    onChange: onOpenChange,
    defaultValue: false,
  });

  return (
    <Popover modal={modal} open={value} onOpenChange={onChange}>
      {trigger && <PopoverTrigger render={trigger} />}

      <PopoverContent
        align="start"
        className={cn(
          "min-w-44 p-0",
          autoWidth && "w-(--radix-popover-trigger-width)",
          className
        )}
      >
        <VirtualizedCommand {...commandProps} />
      </PopoverContent>
    </Popover>
  );
};

export default VirtualizedCombobox;
