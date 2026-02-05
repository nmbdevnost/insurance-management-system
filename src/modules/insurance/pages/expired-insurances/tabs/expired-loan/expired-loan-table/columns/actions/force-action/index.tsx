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
import { RiAuctionLine } from "@remixicon/react";
import { useState } from "react";
import { toast } from "sonner";

const ExpiredLoanForceAction = ({ rowData }: { rowData: ExpiredLoan }) => {
  const [open, setOpen] = useState(false);

  const handleForce = () => {
    setOpen(false);
    toast.success(`Policy ${rowData.policyNumber} forced successfully.`);
  };

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
            <AlertDialogTitle>Force Policy</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to force this policy?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleForce}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ExpiredLoanForceAction;
