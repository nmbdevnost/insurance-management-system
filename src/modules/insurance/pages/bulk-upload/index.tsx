import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import type { InsuranceBulkUploadRow } from "@/shared/lib/types/insurance";
import { RiArrowRightLine } from "@remixicon/react";
import React, { Activity, useState } from "react";
import BulkUploadSelectStep from "./bulk-upload-steps/bulk-upload-select-step";
import UploadPreviewStep from "./bulk-upload-steps/upload-preview-step";
import { Typography } from "@/shared/components/ui/typography";

const UPLOAD_STEPS = [
  "Upload Excel",
  "Validate",
  "Trigger Deduction + Force Loan + Eamil",
];

const BulkUploadPage = () => {
  const [tab, setTab] = useState<"uploader" | "preview">("uploader");

  const [extractedRows, setExtractedRows] = useState<InsuranceBulkUploadRow[]>(
    []
  );

  return (
    <>
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

        <Activity mode={tab === "uploader" ? "visible" : "hidden"}>
          <BulkUploadSelectStep
            setExtractedRows={setExtractedRows}
            setTab={setTab}
          />
        </Activity>

        <Activity mode={tab === "preview" ? "visible" : "hidden"}>
          <UploadPreviewStep extractedRows={extractedRows} setTab={setTab} />
        </Activity>
      </Card>
    </>
  );
};

export default BulkUploadPage;
