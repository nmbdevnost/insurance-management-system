import InsuranceStatusBadge from "@/shared/components/status-badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
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
import type { ExpiredPolicy } from "@/shared/lib/types/policies";
import { formatCurrency } from "@/shared/lib/utils/format";
import { Tooltip } from "@base-ui/react";
import { RiEyeLine, RiShieldCheckLine } from "@remixicon/react";
import { format } from "date-fns";
import { useState } from "react";

type ExpiredInsuranceViewActionProps = {
  policy: ExpiredPolicy;
};

const ExpiredInsuranceViewAction = ({
  policy,
}: ExpiredInsuranceViewActionProps) => {
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
              <DialogTitle className="flex items-center gap-3 text-lg font-semibold text-slate-900">
                Policy Details
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm font-normal">
                {policy.policyNumber}
              </DialogDescription>
            </div>
          </DialogHeader>

          <ScrollArea className="max-h-[75vh]">
            {/* Key Information Bar */}
            <div className="divide-border bg-muted/50 grid gap-px border-b max-md:divide-y md:grid-cols-4 md:divide-x">
              {/* Status  */}
              <div className="p-4">
                <Typography
                  as="p"
                  variant="label"
                  className="text-xs tracking-wide uppercase"
                  muted
                >
                  Status
                </Typography>

                <InsuranceStatusBadge status={policy.status} className="mt-2" />
              </div>

              {/* Days Left */}
              <div className="p-4">
                <Typography
                  as="label"
                  variant="label"
                  className="racking-wide text-xs uppercase"
                  muted
                >
                  Term Days
                </Typography>

                <p className="mt-1 font-mono text-lg font-semibold">
                  {policy.termDays}
                </p>
              </div>

              <div className="p-4">
                <Typography
                  as="label"
                  variant="label"
                  className="text-xs tracking-wide uppercase"
                  muted
                >
                  Premium
                </Typography>
                <p className="mt-1 font-mono text-lg font-semibold">
                  {formatCurrency(policy.totalPremium)}
                </p>
              </div>

              <div className="p-4">
                <Typography
                  as="label"
                  variant="label"
                  className="text-xs tracking-wide uppercase"
                  muted
                >
                  Sum Insured
                </Typography>
                <p className="mt-1 font-mono text-lg font-semibold">
                  {formatCurrency(policy.sumInsured)}
                </p>
              </div>
            </div>

            <div className="space-y-8 p-6">
              {/* Policy Information */}
              <div>
                <Typography
                  as="h3"
                  variant="overline"
                  className="mb-4 text-sm"
                  muted
                >
                  Policy Information
                </Typography>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Typography
                      as="label"
                      variant="label"
                      className="text-xs tracking-wide uppercase"
                      muted
                    >
                      Customer Name
                    </Typography>
                    <Typography variant="body-sm" className="mt-1 text-sm">
                      {policy.customerName}
                    </Typography>
                  </div>
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
                      {policy.branchName}
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      as="label"
                      variant="label"
                      className="text-xs tracking-wide uppercase"
                      muted
                    >
                      Policy Number
                    </Typography>
                    <Typography
                      variant="body-sm"
                      className="mt-1 font-mono text-sm"
                    >
                      {policy.policyNumber}
                    </Typography>
                  </div>

                  <div>
                    <Typography
                      as="label"
                      variant="label"
                      className="text-xs tracking-wide uppercase"
                      muted
                    >
                      Reference Number
                    </Typography>
                    <Typography
                      variant="body-sm"
                      className="mt-1 font-mono text-sm"
                    >
                      {policy.referenceNo}
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      as="label"
                      variant="label"
                      className="text-xs tracking-wide uppercase"
                      muted
                    >
                      Insurance Company
                    </Typography>
                    <Typography variant="body-sm" className="mt-1 text-sm">
                      {policy.insuranceCompany}
                    </Typography>
                  </div>

                  <div>
                    <Typography
                      as="label"
                      variant="label"
                      className="text-xs tracking-wide uppercase"
                      muted
                    >
                      Asset Type
                    </Typography>
                    <Typography variant="body-sm" className="mt-1 text-sm">
                      {policy.assetType}
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

                <Card className="bg-muted/50 p-4">
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
                        {policy.province}
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
                        {format(policy.riskStartDate, "PP")} -{" "}
                        {format(policy.riskMaturityDate, "PP")}
                      </Typography>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Financial Summary */}
              <div>
                <Typography
                  as="h3"
                  variant="overline"
                  className="mb-4 text-sm"
                  muted
                >
                  Financial Summary
                </Typography>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <Typography
                        as="label"
                        variant="label"
                        className="text-xs tracking-wide uppercase"
                        muted
                      >
                        Sum Insured
                      </Typography>
                    </div>
                    <Typography
                      variant="body-sm"
                      className="ml-4 font-mono font-medium"
                    >
                      {formatCurrency(policy.sumInsured)}
                    </Typography>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <Typography
                        as="label"
                        variant="label"
                        className="text-xs tracking-wide uppercase"
                        muted
                      >
                        Premium
                      </Typography>
                    </div>
                    <Typography
                      variant="body-sm"
                      className="ml-4 font-mono text-sm font-medium"
                    >
                      {formatCurrency(policy.totalPremium)}
                    </Typography>
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
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-orange-500"></div>
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
                      className="ml-4 text-sm font-medium"
                    >
                      {format(policy.riskStartDate, "PPP")}
                    </Typography>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <Typography
                        as="label"
                        variant="label"
                        className="text-xs tracking-wide uppercase"
                        muted
                      >
                        Risk Maturity Date
                      </Typography>
                    </div>
                    <Typography
                      variant="body-sm"
                      className="ml-4 text-sm font-medium"
                    >
                      {format(policy.riskMaturityDate, "PPP")}
                    </Typography>
                  </div>
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

export default ExpiredInsuranceViewAction;
