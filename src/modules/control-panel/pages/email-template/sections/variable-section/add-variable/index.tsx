import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { RiAddLine } from "@remixicon/react";
import { useState } from "react";

const AddVariable = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip delay={500}>
        <TooltipTrigger
          render={
            <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
              <RiAddLine />
            </Button>
          }
        />

        <TooltipContent>Add Variable</TooltipContent>
      </Tooltip>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Variable</DialogTitle>
            <DialogDescription>
              Add a new variable to be used in email templates.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddVariable;
