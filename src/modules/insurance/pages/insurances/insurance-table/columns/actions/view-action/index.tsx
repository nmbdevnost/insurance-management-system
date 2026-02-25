import { DetailField } from "@/shared/components/details/detail-field";
import { DetailsSection } from "@/shared/components/details/detail-section";
import DetailSectionGroup from "@/shared/components/details/detail-section-group";
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
import { formatCurrency } from "@/shared/lib/utils/format";
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
        <DialogContent className="max-w-3xl! gap-0 overflow-hidden p-0">
          <DialogHeader className="flex flex-row items-center space-y-1 border-b px-6 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border">
              <RiShieldCheckLine className="size-5" />
            </div>

            <div>
              <DialogTitle className="flex items-center gap-3 text-lg font-semibold">
                Insurance Details
              </DialogTitle>
              <DialogDescription className="text-muted-foreground font-mono text-sm font-normal">
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
                <p className="mt-1 font-mono text-lg font-semibold">
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
                <p className="mt-1 font-mono text-lg font-semibold">
                  {rowData.cif_id}
                </p>
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
            <DetailSectionGroup>
              <DetailsSection title="Loan Information">
                <DetailField label="Branch" value={rowData.branch} />
                <DetailField label="Province" value={rowData.province} />
                <DetailField
                  label="Policy Number"
                  value={rowData.policy_number}
                  variant="mono"
                />
                <DetailField label="Segment" value={rowData.segment} />
                <DetailField
                  label="Premium"
                  value={`${formatCurrency(rowData.total_premium)}`}
                />
              </DetailsSection>

              {/* Coverage Details */}
              <DetailsSection
                title="Coverage Details"
                className="bg-muted/50 rounded-lg border p-4"
              >
                <DetailField label="Province" value={rowData.province} />
                <DetailField
                  label="Coverage Period"
                  value={` ${format(rowData.risk_start_date, "PP")}-
                        ${format(rowData.maturity_end_date, "PP")}`}
                />
              </DetailsSection>

              {/* Important Dates */}
              <DetailsSection title="Important Dates">
                {rowData.risk_start_date && (
                  <DetailField
                    label={
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-purple-500"></div>{" "}
                        Risk Start Date
                      </div>
                    }
                    className="ml-4 font-medium"
                    value={`${format(rowData.risk_start_date, "PPP")}`}
                  />
                )}

                {rowData.maturity_end_date && (
                  <DetailField
                    label={
                      <div className="flex items-center gap-2">
                        <div className="bg-destructive h-2 w-2 rounded-full"></div>{" "}
                        Risk Maturity Date
                      </div>
                    }
                    className="ml-4 font-medium"
                    value={`${format(rowData.maturity_end_date, "PPP")}`}
                  />
                )}
              </DetailsSection>
            </DetailSectionGroup>
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
