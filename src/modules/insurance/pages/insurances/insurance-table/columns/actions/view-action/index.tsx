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
                <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  Status
                </div>
                <InsuranceStatusBadge
                  status={rowData.status}
                  className="mt-2"
                />
              </div>

              {/* Account Status */}
              <div className="p-4">
                <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  Policy Number
                </div>
                <div className="mt-1 text-lg font-semibold">
                  {rowData.policy_number}
                </div>
              </div>

              {/* CIF ID */}
              <div className="p-4">
                <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  CIF ID
                </div>
                <div className="mt-1 text-lg font-semibold">
                  {rowData.cif_id}
                </div>
              </div>

              {/* Account No */}
              <div className="p-4">
                <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  Insurance Type
                </div>
                <div className="mt-1 text-lg font-semibold">{rowData.type}</div>
              </div>
            </div>

            <div className="space-y-8 p-6">
              {/* Loan Information */}
              <div>
                <h3 className="mb-4 text-sm font-semibold tracking-wide uppercase">
                  Loan Information
                </h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        Branch
                      </label>
                      <div className="mt-1 font-mono text-sm">
                        {rowData.branch}
                      </div>
                    </div>
                    <div>
                      <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        Policy Number
                      </label>
                      <div className="mt-1 font-mono text-sm">
                        {rowData.policy_number}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        Province
                      </label>
                      <div className="mt-1 font-mono text-sm">
                        {rowData.province}
                      </div>
                    </div>
                    <div>
                      <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        Segment
                      </label>
                      <div className="mt-1 font-mono text-sm">
                        {rowData.segment}
                      </div>
                    </div>
                    <div>
                      <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        Premium
                      </label>
                      <div className="mt-1 font-mono text-sm">
                        Rs.{rowData.total_premium}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coverage Details */}
              <div>
                <h3 className="mb-4 text-sm font-semibold tracking-wide uppercase">
                  Coverage Details
                </h3>
                <div className="bg-muted/50 rounded-lg border p-4">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label>Province</label>
                      <div>{rowData.province}</div>
                    </div>
                    <div>
                      <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        Coverage Period
                      </label>
                      <div className="mt-1 text-sm">
                        {format(rowData.risk_start_date, "PP")}-
                        {format(rowData.maturity_end_date, "PP")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Dates */}
              <div>
                <h3 className="mb-4 text-sm font-semibold tracking-wide uppercase">
                  Important Dates
                </h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  {rowData.risk_start_date && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                        <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                          Risk Start Date
                        </label>
                      </div>
                      <div className="ml-4 text-sm font-medium">
                        {format(rowData.risk_start_date, "PPP")}
                      </div>
                    </div>
                  )}

                  {rowData.maturity_end_date && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                        <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                          Maturity End Date
                        </label>
                      </div>
                      <div className="ml-4 text-sm font-medium">
                        {format(rowData.maturity_end_date, "PPP")}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="m-0">
            <div className="flex w-full items-center justify-between">
              <div className="text-muted-foreground text-xs">
                Last updated: {new Date().toLocaleDateString()}
              </div>

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
