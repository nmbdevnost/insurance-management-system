import { RiCalendarLine } from "@remixicon/react";
import type { ComponentProps } from "react";
import useControlledState from "../hooks/use-controlled-state";
import { cn, formatDate } from "../lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type DatePickerProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  date?: Date;
  onDateChange?: (date?: Date) => void;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
  render?: ComponentProps<typeof Button>["render"];
  dateFormat?: string;
  invalid?: boolean;
};

const DatePicker = ({
  open: openProp,
  onOpenChange,
  date,
  onDateChange,
  placeholder = "Select date",
  readonly = false,
  disabled = false,
  render,
  dateFormat,
  invalid,
}: DatePickerProps) => {
  const { value: open, onChange: setOpen } = useControlledState({
    defaultValue: false,
    value: openProp,
    onChange: onOpenChange,
  });

  return (
    <Popover
      open={readonly ? undefined : open}
      onOpenChange={readonly ? undefined : setOpen}
    >
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            id="date"
            className={cn(
              "justify-between font-normal",
              !date && "text-muted-foreground!",
              readonly && "pointer-events-none"
            )}
            disabled={disabled}
            render={render}
            aria-expanded={open}
            aria-invalid={invalid}
          >
            {date ? formatDate(date, dateFormat) : placeholder}
            <RiCalendarLine />
          </Button>
        }
      />
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          defaultMonth={date}
          captionLayout="dropdown"
          onSelect={(date) => {
            onDateChange?.(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
