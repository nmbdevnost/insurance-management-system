import { Button } from "@/shared/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/shared/components/ui/scroll-area";
import useControlledState from "@/shared/hooks/use-controlled-state";
import { cn } from "@/shared/lib/utils";
import { RiTimeLine } from "@remixicon/react";
import { format } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";

type TimePickerProps = {
  value?: string | Date;
  onChange?: (value: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  "aria-invalid"?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
  format?: "12-hour" | "24-hour";
  id?: string;
};

const HOURS_12 = Array.from({ length: 12 }, (_, i) => i + 1).reverse();
const HOURS_24 = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

export const TimePicker: React.FC<TimePickerProps> = ({
  id,
  value,
  onChange,
  open: controlledOpen,
  onOpenChange,
  "aria-invalid": ariaInvalid,
  disabled,
  readonly,
  format: timeFormat = "12-hour",
}) => {
  const { value: open, onChange: setOpen } = useControlledState({
    defaultValue: false,
    value: controlledOpen,
    onChange: onOpenChange,
  });

  const initialTime = value
    ? typeof value === "string"
      ? new Date(value)
      : value
    : undefined;

  const [selectedTime, setSelectedTime] = useState<Date | undefined>(
    initialTime
  );

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  const scrollToSelected = (ref: React.RefObject<HTMLDivElement | null>) => {
    const selected = ref?.current?.querySelector<HTMLElement>(
      '[data-selected="true"]'
    );
    selected?.scrollIntoView({ block: "center", behavior: "instant" });
  };

  const computeTime = useCallback(
    (type: "hour" | "minute" | "ampm", val: string): Date => {
      const base = selectedTime ?? new Date();
      const d = new Date(base);

      if (type === "hour") {
        const hour = parseInt(val, 10);
        if (timeFormat === "24-hour") {
          d.setHours(hour);
        } else {
          const isPM = d.getHours() >= 12;
          d.setHours(hour === 12 ? (isPM ? 12 : 0) : isPM ? hour + 12 : hour);
        }
      } else if (type === "minute") {
        d.setMinutes(parseInt(val, 10));
      } else {
        const hours = d.getHours();
        if (val === "AM" && hours >= 12) d.setHours(hours - 12);
        else if (val === "PM" && hours < 12) d.setHours(hours + 12);
      }

      return d;
    },
    [selectedTime, timeFormat]
  );

  function handleTimeChange(
    type: "hour" | "minute" | "ampm",
    val: string
  ): void {
    if (disabled || readonly) return;
    const newDate = computeTime(type, val);
    setSelectedTime(newDate);
    onChange?.(newDate.toISOString());

    requestAnimationFrame(() => {
      if (type === "hour") {
        scrollToSelected(hourRef);
      }

      if (type === "minute") {
        scrollToSelected(minuteRef);
      }
    });
  }

  const isHourSelected = (hour: number): boolean => {
    if (!selectedTime) return false;
    return timeFormat === "24-hour"
      ? selectedTime.getHours() === hour
      : selectedTime.getHours() % 12 === hour % 12;
  };

  useEffect(() => {
    if (!open) return;

    // Defer until after popover has rendered
    requestAnimationFrame(() => {
      scrollToSelected(hourRef);
      scrollToSelected(minuteRef);
    });
  }, [open]);

  return (
    <Popover open={readonly ? false : open} onOpenChange={setOpen}>
      <PopoverTrigger disabled={disabled}>
        <Button
          id={id}
          variant="outline"
          className={cn("group w-full pl-3 text-left font-normal")}
          data-selected={!!selectedTime}
          aria-expanded={open}
          aria-invalid={ariaInvalid}
          disabled={disabled}
        >
          {selectedTime ? (
            format(selectedTime, timeFormat === "24-hour" ? "HH:mm" : "p")
          ) : (
            <span>--:-- {timeFormat === "12-hour" ? "--" : ""}</span>
          )}

          <RiTimeLine className="ml-auto h-4 w-4 opacity-50 group-data-selected:opacity-100" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-fit p-0" align="start">
        <div className="flex flex-col divide-y sm:h-75 sm:flex-row sm:divide-x sm:divide-y-0">
          {/* Hours */}
          <ScrollArea className="w-64 sm:w-auto" ref={hourRef}>
            <div className="flex p-2 sm:flex-col">
              {(timeFormat === "24-hour" ? HOURS_24 : HOURS_12).map((hour) => (
                <Button
                  key={hour}
                  size="icon"
                  variant={isHourSelected(hour) ? "default" : "ghost"}
                  className="aspect-square shrink-0 sm:w-auto"
                  onClick={() => handleTimeChange("hour", hour.toString())}
                  data-selected={isHourSelected(hour)}
                >
                  {timeFormat === "24-hour"
                    ? hour.toString().padStart(2, "0")
                    : hour}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="sm:hidden" />
          </ScrollArea>

          {/* Minutes */}
          <ScrollArea className="w-64 sm:w-auto" ref={minuteRef}>
            <div className="flex p-2 sm:flex-col">
              {MINUTES.map((minute) => (
                <Button
                  key={minute}
                  size="icon"
                  variant={
                    selectedTime && selectedTime.getMinutes() === minute
                      ? "default"
                      : "ghost"
                  }
                  className="aspect-square shrink-0 sm:w-full"
                  onClick={() => handleTimeChange("minute", minute.toString())}
                  data-selected={
                    selectedTime && selectedTime.getMinutes() === minute
                  }
                >
                  {minute.toString().padStart(2, "0")}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="sm:hidden" />
          </ScrollArea>

          {/* AM/PM — 12-hour only */}
          {timeFormat === "12-hour" && (
            <ScrollArea>
              <div className="flex p-2 sm:flex-col">
                {(["AM", "PM"] as const).map((ampm) => (
                  <Button
                    key={ampm}
                    size="icon"
                    variant={
                      selectedTime &&
                      ((ampm === "AM" && selectedTime.getHours() < 12) ||
                        (ampm === "PM" && selectedTime.getHours() >= 12))
                        ? "default"
                        : "ghost"
                    }
                    className="aspect-square shrink-0 sm:w-full"
                    onClick={() => handleTimeChange("ampm", ampm)}
                    data-selected={
                      selectedTime &&
                      ((ampm === "AM" && selectedTime.getHours() < 12) ||
                        (ampm === "PM" && selectedTime.getHours() >= 12))
                    }
                  >
                    {ampm}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
