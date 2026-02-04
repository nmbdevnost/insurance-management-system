import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip";
import type { Insurance } from "@/shared/lib/types/insurance";
import { Tooltip } from "@base-ui/react";
import { RiSendInsLine } from "@remixicon/react";
import { useState } from "react";

type ExpiredInsuranceSendActionProps = {
  insurance: Insurance;
};

const ExpiredInsuranceSendAction = ({
  insurance,
}: ExpiredInsuranceSendActionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip.Root>
        <TooltipTrigger
          render={
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)} />
          }
        >
          <RiSendInsLine />
        </TooltipTrigger>

        <TooltipContent>Send</TooltipContent>
      </Tooltip.Root>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Insurance</DialogTitle>
            <DialogDescription>
              Are you sure you want to send this insurance?
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExpiredInsuranceSendAction;
