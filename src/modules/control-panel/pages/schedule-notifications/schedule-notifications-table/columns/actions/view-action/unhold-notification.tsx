import { AlertDescription, AlertTitle } from "@/shared/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/shared/components/ui/alert-dialog";
import Spinner from "@/shared/components/ui/spinner";
import useControlledState from "@/shared/hooks/use-controlled-state";
import { useState, useTransition } from "react";

const UnholdNotification = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { value, onChange } = useControlledState({
    value: open,
    onChange: onOpenChange,
    defaultValue: false,
  });

  const [openResult, setOpenResult] = useState(false);
  const [result, setResult] = useState("");

  const [isPending, startTransition] = useTransition();

  const handleUnholdNotification = () => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onChange(false);
      setOpenResult(true);
      setResult("Notification unheld successfully.");
    });
  };

  return (
    <>
      <AlertDialog open={value} onOpenChange={isPending ? undefined : onChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertTitle>Unhold Notification</AlertTitle>
            <AlertDescription>
              Are you sure you want to unhold this notification?
            </AlertDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleUnholdNotification}
              disabled={isPending}
            >
              {isPending && <Spinner />}
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={openResult} onOpenChange={setOpenResult}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertTitle>Unhold Notification</AlertTitle>
            <AlertDescription>{result}</AlertDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UnholdNotification;
