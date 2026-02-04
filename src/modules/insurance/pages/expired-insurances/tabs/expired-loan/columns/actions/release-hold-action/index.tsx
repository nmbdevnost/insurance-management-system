import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { Button } from "@/shared/components/ui/button";
import { TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip";
import type { Insurance } from "@/shared/lib/types/insurance";
import { Tooltip } from "@base-ui/react";
import { RiStopCircleLine } from "@remixicon/react";
import { useState } from "react";

type ExpiredInsuranceReleaseHoldActionProps = {
  insurance: Insurance;
};

const ExpiredInsuranceReleaseHoldAction = ({
  insurance,
}: ExpiredInsuranceReleaseHoldActionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip.Root>
        <TooltipTrigger
          render={
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)} />
          }
        >
          <RiStopCircleLine />
        </TooltipTrigger>

        <TooltipContent>Release Hold</TooltipContent>
      </Tooltip.Root>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Release Insurance Hold</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to release this insurance hold?
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

export default ExpiredInsuranceReleaseHoldAction;
