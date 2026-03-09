import useControlledState from "@/shared/hooks/use-controlled-state";
import { cn } from "@/shared/lib/utils";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { Dialog, DialogPortal } from "../ui/dialog";

type ActionBarProps = {
  children?: React.ReactNode;
  side?: "top" | "bottom";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const ActionBar: React.FC<ActionBarProps> = ({
  open,
  onOpenChange,
  children,
  side = "bottom",
}) => {
  const { value, onChange } = useControlledState({
    defaultValue: false,
    onChange: onOpenChange,
    value: open,
  });

  return (
    <Dialog open={value} onOpenChange={onChange} modal={false}>
      <DialogPortal>
        <DialogPrimitive.Popup
          data-slot="dialog-content"
          className={cn(
            "bg-background ring-foreground/10 w-fit rounded-xl p-2 ring-1 outline-none",
            "fixed left-1/2 z-50 -translate-x-1/2",
            side === "top"
              ? "data-open:animate-slide-down-from-top data-closed:animate-slide-up-to-top top-4 transition-all"
              : "data-open:animate-slide-up-from-bottom data-closed:animate-slide-down-to-bottom bottom-4 transition-all"
          )}
        >
          <div className="flex gap-2 has-data-[loading=true]:pointer-events-none">
            {children}
          </div>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  );
};

export default ActionBar;
