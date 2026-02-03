import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Insurance } from "@/lib/types/insurance";
import { Tooltip } from "@base-ui/react";
import { RiAuctionLine } from "@remixicon/react";
import { useState } from "react";

type ExpiredInsuranceForceActionProps = {
  insurance: Insurance;
};

const ExpiredInsuranceForceAction = ({
  insurance,
}: ExpiredInsuranceForceActionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip.Root>
        <TooltipTrigger
          render={
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)} />
          }
        >
          <RiAuctionLine />
        </TooltipTrigger>

        <TooltipContent>Force</TooltipContent>
      </Tooltip.Root>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Force Insurance</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to force this insurance?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ExpiredInsuranceForceAction;
