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
import { RiRestartLine } from "@remixicon/react";
import { useState } from "react";

type ExpiredInsuranceRenewActionProps = {
  insurance: Insurance;
};

const ExpiredInsuranceRenewAction = ({
  insurance,
}: ExpiredInsuranceRenewActionProps) => {
  const [open, setOpen] = useState(false);

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
            <DialogTitle>Renew Insurance</DialogTitle>
            <DialogDescription>
              Are you sure you want to renew this insurance?
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExpiredInsuranceRenewAction;
