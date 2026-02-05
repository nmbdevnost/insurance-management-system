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
import type { Loan } from "@/shared/lib/types/loans";
import { Tooltip } from "@base-ui/react";
import { RiRestartLine } from "@remixicon/react";
import { useState } from "react";
import { toast } from "sonner";

const LoanNotExpiredRenewAction = ({ rowData }: { rowData: Loan }) => {
  const [open, setOpen] = useState(false);

  const handleRenew = () => {
    setOpen(false);
    toast.success(`Policy ${rowData.policyNumber} renewed successfully.`);
  };

  return (
    <>
      <Tooltip.Root>
        <TooltipTrigger
          render={
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)} />
          }
        >
          <RiRestartLine />
        </TooltipTrigger>

        <TooltipContent>Renew</TooltipContent>
      </Tooltip.Root>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Renew policy</DialogTitle>
            <DialogDescription>
              Are you sure you want to renew this policy?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleRenew}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoanNotExpiredRenewAction;
