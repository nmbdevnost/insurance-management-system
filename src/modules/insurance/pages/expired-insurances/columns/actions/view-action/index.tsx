import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Insurance } from "@/lib/types/insurance";
import { Tooltip } from "@base-ui/react";
import { RiEyeLine } from "@remixicon/react";
import { useState } from "react";

type ExpiredInsuranceViewActionProps = {
  insurance: Insurance;
};

const ExpiredInsuranceViewAction = ({
  insurance,
}: ExpiredInsuranceViewActionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip.Root>
        <TooltipTrigger
          render={
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)} />
          }
        >
          <RiEyeLine />
        </TooltipTrigger>

        <TooltipContent>View</TooltipContent>
      </Tooltip.Root>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insurance Details</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExpiredInsuranceViewAction;
