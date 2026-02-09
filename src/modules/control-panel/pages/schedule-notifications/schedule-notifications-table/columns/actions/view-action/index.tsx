import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import type { ScheduledNotification } from "@/shared/lib/types/notifications";
import { RiEyeLine, RiNotification2Line } from "@remixicon/react";
import { useState } from "react";
import HoldNotification from "./hold-notification";
import ScheduledNotificationDetails from "./scheduled-notification-details";
import UnholdNotification from "./unhold-notification";

const ScheduledNotificationViewAction = ({
  rowData,
}: {
  rowData: ScheduledNotification;
}) => {
  // State for details dialog
  const [open, setOpen] = useState(false);

  const [openHoldAlert, setOpenHoldAlert] = useState(false);
  const [openUnholdAlert, setOpenUnholdAlert] = useState(false);

  return (
    <>
      <Tooltip delay={500}>
        <TooltipTrigger
          render={
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
              <RiEyeLine />
            </Button>
          }
        />

        <TooltipContent>View</TooltipContent>
      </Tooltip>

      <Dialog
        open={open}
        onOpenChange={openHoldAlert || openUnholdAlert ? undefined : setOpen}
      >
        <DialogContent className="max-w-lg! gap-0 overflow-hidden p-0">
          <DialogHeader className="flex flex-row items-center space-y-1 border-b px-6 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border">
              <RiNotification2Line className="size-5" />
            </div>

            <div>
              <DialogTitle className="flex items-center gap-3 text-lg font-semibold">
                Scheduled Notification
              </DialogTitle>
            </div>
          </DialogHeader>

          <ScheduledNotificationDetails rowData={rowData} />

          <DialogFooter className="m-0">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpenHoldAlert(true)}>Hold</Button>
            <Button onClick={() => setOpenUnholdAlert(true)}>Unhold</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <HoldNotification open={openHoldAlert} onOpenChange={setOpenHoldAlert} />

      <UnholdNotification
        open={openUnholdAlert}
        onOpenChange={setOpenUnholdAlert}
      />
    </>
  );
};

export default ScheduledNotificationViewAction;
