import InsuranceStatusBadge from "@/shared/components/status-badge";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip";
import { Typography } from "@/shared/components/ui/typography";
import type { Insurance } from "@/shared/lib/types/insurance";
import { Tooltip } from "@base-ui/react";
import { RiEyeLine, RiShieldCheckLine } from "@remixicon/react";
import { format } from "date-fns";
import { useState } from "react";

const InsuranceViewAction = ({ rowData }: { rowData: Insurance }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Tooltip.Root>
        <TooltipTrigger
          render={
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)} />
          }
        >
          <RiEyeLine />
        </TooltipTrigger>
        <TooltipContent>View Details</TooltipContent>
      </Tooltip.Root>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl! gap-0 overflow-hidden p-0">
          <DialogHeader className="flex flex-row items-center space-y-1 border-b px-6 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border">
              <RiShieldCheckLine className="size-5" />
            </div>

            <div>
              <DialogTitle className="flex items-center gap-3 text-lg font-semibold">
                Insurance Details
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm font-normal">
                {rowData.policy_number}
              </DialogDescription>
            </div>
          </DialogHeader>

          <ScrollArea className="max-h-[75vh]">
            {/* Key Information Bar */}
            <div className="divide-border bg-muted/50 grid gap-px border-b max-md:divide-y md:grid-cols-4 md:divide-x">
              {/* Status */}
              <div className="p-4">
                <Typography
                  as="p"
                  variant="label"
                  className="text-xs tracking-wide uppercase"
                  muted
                >
                  Status
                </Typography>
                <InsuranceStatusBadge
                  status={rowData.status}
                  className="mt-2"
                />
              </div>

              {/* Account Status */}
              <div className="p-4">
                <Typography
                  as="label"
                  variant="label"
                  className="text-xs tracking-wide uppercase"
                  muted
                >
                  Policy Number
                </Typography>
                <p className="mt-1 text-lg font-semibold">
                  {rowData.policy_number}
                </p>
              </div>

              {/* CIF ID */}
              <div className="p-4">
                <Typography
                  as="label"
                  variant="label"
                  className="text-xs tracking-wide uppercase"
                  muted
                >
                  CIF ID
                </Typography>
                <p className="mt-1 text-lg font-semibold">{rowData.cif_id}</p>
              </div>

              {/* Account No */}
              <div className="p-4">
                <Typography
                  as="label"
                  variant="label"
                  className="text-xs tracking-wide uppercase"
                  muted
                >
                  Insurance Type
                </Typography>
                <p className="mt-1 text-lg font-semibold">{rowData.type}</p>
              </div>
            </div>

            <div className="space-y-8 p-6">
              {/* Loan Information */}
              <div className="space-y-2">
                <Typography
                  as="h3"
                  variant="overline"
                  className="mb-4 text-sm"
                  muted
                >
                  Loan Information
                </Typography>
                <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
                  <div>
                    <Typography
                      as="label"
                      variant="label"
                      className="text-xs tracking-wide uppercase"
                      muted
                    >
                      Branch
                    </Typography>
                    <Typography variant="body-sm" className="mt-1 text-sm">
                      {rowData.branch}
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      as="label"
                      variant="label"
                      className="text-xs tracking-wide uppercase"
                      muted
                    >
                      Province
                    </Typography>
                    <Typography variant="body-sm" className="mt-1 text-sm">
                      {rowData.province}
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      variant="label"
                      as="label"
                      className="text-xs tracking-wide uppercase"
                      muted
                    >
                      Policy Number
                    </Typography>
                    <Typography
                      variant="body-sm"
                      className="mt-1 font-mono text-sm"
                    >
                      {rowData.policy_number}
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      variant="label"
                      as="label"
                      className="text-xs tracking-wide uppercase"
                      muted
                    >
                      Segment
                    </Typography>
                    <div className="mt-1 text-sm">{rowData.segment}</div>
                  </div>
                  <div>
                    <Typography
                      as="label"
                      variant="label"
                      className="text-xs tracking-wide uppercase"
                      muted
                    >
                      Premium
                    </Typography>
                    <Typography
                      variant="body-sm"
                      className="mt-1 font-mono text-sm"
                    >
                      Rs.{rowData.total_premium}
                    </Typography>
                  </div>
                </div>
              </div>

              {/* Coverage Details */}
              <div>
                <Typography
                  as="h3"
                  variant="overline"
                  className="mb-4 text-sm"
                  muted
                >
                  Coverage Details
                </Typography>
                <div className="bg-muted/50 rounded-lg border p-4">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <Typography
                        as="label"
                        variant="label"
                        className="text-xs tracking-wide uppercase"
                        muted
                      >
                        Province
                      </Typography>
                      <Typography variant="body-sm" className="mt-1 text-sm">
                        {rowData.province}
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        as="label"
                        variant="label"
                        className="text-xs tracking-wide uppercase"
                        muted
                      >
                        Coverage Period
                      </Typography>
                      <Typography variant="body-sm" className="mt-1 text-sm">
                        {format(rowData.risk_start_date, "PP")}-
                        {format(rowData.maturity_end_date, "PP")}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Dates */}
              <div>
                <Typography
                  as="h3"
                  variant="overline"
                  className="mb-4 text-sm"
                  muted
                >
                  Important Dates
                </Typography>
                <div className="grid gap-6 sm:grid-cols-2">
                  {rowData.risk_start_date && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                        <Typography
                          as="label"
                          variant="label"
                          className="text-xs tracking-wide uppercase"
                          muted
                        >
                          Risk Start Date
                        </Typography>
                      </div>
                      <Typography
                        variant="body-sm"
                        className="ml-4 font-medium"
                      >
                        {format(rowData.risk_start_date, "PPP")}
                      </Typography>
                    </div>
                  )}

                  {rowData.maturity_end_date && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                        <Typography
                          as="label"
                          className="text-xs tracking-wide uppercase"
                          variant="label"
                          muted
                        >
                          Maturity End Date
                        </Typography>
                      </div>
                      <Typography
                        variant="body-sm"
                        className="ml-4 font-medium"
                      >
                        {format(rowData.maturity_end_date, "PPP")}
                      </Typography>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="m-0">
            <div className="flex w-full items-center justify-between">
              <Typography variant="body-sm" className="text-xs" muted>
                Last updated: {new Date().toLocaleDateString()}
              </Typography>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InsuranceViewAction;
