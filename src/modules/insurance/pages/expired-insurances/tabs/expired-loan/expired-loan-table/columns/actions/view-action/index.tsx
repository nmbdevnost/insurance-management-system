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
import type { ExpiredLoan } from "@/shared/lib/types/loans";
import { Tooltip } from "@base-ui/react";
import { RiEyeLine, RiShieldCheckLine } from "@remixicon/react";
import { format } from "date-fns";
import { useState } from "react";

type ExpiredLoanViewActionProps = {
  rowData: ExpiredLoan;
};

const ExpiredLoanViewAction = ({ rowData }: ExpiredLoanViewActionProps) => {
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
                Loan Details
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm font-normal">
                {rowData.referenceNo}
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
                  Account Status
                </div>
                <div className="mt-1 text-lg font-semibold">
                  {rowData.accountStatus}
                </div>
              </div>

              {/* CIF ID */}
              <div className="p-4">
                <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  CIF ID
                </div>
                <div className="mt-1 text-lg font-semibold">
                  {rowData.cifId}
                </div>
              </div>

              {/* Account No */}
              <div className="p-4">
                <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  Account No
                </div>
                <div className="mt-1 text-lg font-semibold">
                  {rowData.accountNo}
                </div>
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
                        Customer Name
                      </label>
                      <div className="mt-1 font-mono text-sm">
                        {rowData.customerName}
                      </div>
                    </div>
                    <div>
                      <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        Policy Number
                      </label>
                      <div className="mt-1 font-mono text-sm">
                        {rowData.policyNumber}
                      </div>
                    </div>
                    {/* <div>
                      <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase"></label>
                      <div className="mt-1 text-sm">{rowData.type}</div>
                    </div>
                    <div>
                      <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase"></label>
                      <div className="mt-1 text-sm">{rowData.type}</div>
                    </div>
                  </div> */}

                    {/* <div className="space-y-4">
                    <div>
                      <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        Segment
                      </label>
                      <div className="mt-1 text-sm">{rowData.segment}</div>
                    </div> */}

                    {/* <div>
                      <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        Branch
                      </label>
                      <div className="mt-1 text-sm">{rowData.branch}</div>
                    </div> */}

                    {/* <div>
                      <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        Province
                      </label>
                      <div className="mt-1 text-sm">{rowData.province}</div>
                    </div> */}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        Reference Number
                      </label>
                      <div className="mt-1 font-mono text-sm">
                        {rowData.referenceNo}
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
                      <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        Account Closed Date
                      </label>
                      <div className="mt-1 text-sm">
                        {format(rowData.accountClosedDate, "PP")}
                      </div>
                    </div>

                    {/* <div>
                      <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        Risk Maturity Date
                      </label>
                      <div className="mt-1 text-sm">
                        {format(rowData.riskMaturityDate, "PP")}
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Important Dates */}
              <div>
                <h3 className="mb-4 text-sm font-semibold tracking-wide uppercase">
                  Important Dates
                </h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  {rowData.accountClosedDate && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                        <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                          Account Closed Date
                        </label>
                      </div>
                      <div className="ml-4 text-sm font-medium">
                        {format(rowData.accountClosedDate, "PPP")}
                      </div>
                    </div>
                  )}

                  {/* <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                      <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        Risk Start Date
                      </label>
                    </div>
                    <div className="ml-4 text-sm font-medium">
                      {format(rowData.riskStartDate, "PPP")}
                    </div>
                  </div> */}

                  {/* <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        Risk Maturity Date
                      </label>
                    </div>
                    <div className="ml-4 text-sm font-medium">
                      {format(rowData.riskMaturityDate, "PPP")}
                    </div>
                  </div> */}
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

export default ExpiredLoanViewAction;
