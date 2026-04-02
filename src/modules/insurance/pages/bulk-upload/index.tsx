import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Typography } from "@/shared/components/ui/typography";
import useLeaveConfirmation from "@/shared/hooks/use-leave-confirmation";
import { RiArrowRightLine } from "@remixicon/react";
import React, { Activity, useState } from "react";
import type { FlowPhase } from "../../lib/types/bulk-transaction";
import { BulkUploadProvider } from "../../providers/bulk-upload-provider";
import BulkUploadDoneStep from "./bulk-upload-steps/bulk-upload-complete-step";
import UploadPreviewStep from "./bulk-upload-steps/bulk-upload-preview-step";
import BulkUploadReviewStep from "./bulk-upload-steps/bulk-upload-review-step";
import BulkUploadSelectStep from "./bulk-upload-steps/bulk-upload-select-step";

const UPLOAD_STEPS = ["Upload Excel", "Preview", "Review & Process"];

const BulkUploadPage = () => {
  const [tab, setTab] = useState<FlowPhase>("upload");

  useLeaveConfirmation(tab !== "upload");

  return (
    <BulkUploadProvider tab={tab} setTab={setTab}>
      <Card className="p-0">
        <CardHeader className="bg-primary p-4 text-center">
          <CardTitle>
            <Typography
              variant="h2"
              as="h1"
              className="text-primary-foreground"
            >
              Bulk Insurance Renewal & Force Loan Booking
            </Typography>
          </CardTitle>
          <CardDescription>
            <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
              {UPLOAD_STEPS.map((step) => (
                <React.Fragment key={step}>
                  <Typography
                    variant="label"
                    className="text-primary-foreground"
                  >
                    {step}
                  </Typography>
                  <RiArrowRightLine className="text-primary-foreground size-3 rotate-90 last:hidden md:rotate-0" />
                </React.Fragment>
              ))}
            </div>
          </CardDescription>
        </CardHeader>

        <Activity mode={tab === "upload" ? "visible" : "hidden"}>
          <BulkUploadSelectStep />
        </Activity>
        <Activity mode={tab === "preview" ? "visible" : "hidden"}>
          <UploadPreviewStep />
        </Activity>
        <Activity mode={tab === "balance_check" ? "visible" : "hidden"}>
          <BulkUploadReviewStep />
        </Activity>
        <Activity mode={tab === "done" ? "visible" : "hidden"}>
          <BulkUploadDoneStep />
        </Activity>
      </Card>
    </BulkUploadProvider>
  );
};

export default BulkUploadPage;
