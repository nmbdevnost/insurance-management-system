import type { ExpiredPolicy } from "@/shared/lib/types/policies";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip";
import { Tooltip } from "@base-ui/react";
import { RiSendInsLine } from "@remixicon/react";
import { useState } from "react";
import { toast } from "sonner";

type ExpiredInsuranceSendActionProps = {
  policy: ExpiredPolicy;
};

const ExpiredInsuranceSendAction = ({
  policy,
}: ExpiredInsuranceSendActionProps) => {
  const [open, setOpen] = useState(false);

  const handleSend = () => {
    setOpen(false);
    toast.success(`Policy ${policy.policyNumber} sent successfully.`);
  };

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
            <DialogTitle>Send Policy</DialogTitle>
            <DialogDescription>
              Are you sure you want to send this policy?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleSend}>Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExpiredInsuranceSendAction;
