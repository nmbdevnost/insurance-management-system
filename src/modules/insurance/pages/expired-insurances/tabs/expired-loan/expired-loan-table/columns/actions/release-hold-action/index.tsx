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
import type { ExpiredLoan } from "@/shared/lib/types/loans";
import { Tooltip } from "@base-ui/react";
import { RiStopCircleLine } from "@remixicon/react";
import { useState } from "react";
import { toast } from "sonner";

const ExpiredLoanReleaseHoldAction = ({
  rowData,
}: {
  rowData: ExpiredLoan;
}) => {
  const [open, setOpen] = useState(false);

  const handleReleaseHold = () => {
    setOpen(false);
    toast.success(`Policy ${rowData.policyNumber} hold released successfully.`);
  };

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
            <AlertDialogTitle>Release Policy Hold</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to release this policy hold?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReleaseHold}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ExpiredLoanReleaseHoldAction;
