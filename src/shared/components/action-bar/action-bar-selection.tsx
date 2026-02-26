import { cn } from "@/shared/lib/utils";
import { RiCloseLine } from "@remixicon/react";
import { Button, buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

type ActionBarSelectionProps = {
  selections?: number;
  onDeselect?: () => void;
  disabled?: boolean;
};

const ActionBarSelection: React.FC<ActionBarSelectionProps> = ({
  selections,
  onDeselect,
  disabled,
}) => {
  return (
    <div
      className={cn(
        buttonVariants({ variant: "outline" }),
        "hover:bg-card gap-0 pr-1"
      )}
    >
      <Badge className="mr-1">{selections}</Badge> Selected{" "}
      <Separator orientation="vertical" className="my-2 mr-0.5 ml-1.5" />
      <Button
        variant="ghost"
        size="icon-xs"
        className="text-muted-foreground hover:text-foreground h-fit w-fit rounded-full"
        onClick={onDeselect}
        disabled={disabled}
      >
        <RiCloseLine />
      </Button>
    </div>
  );
};

export default ActionBarSelection;
