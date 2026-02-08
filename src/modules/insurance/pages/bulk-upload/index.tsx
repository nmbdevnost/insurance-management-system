import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import type { ExcelExtractedRow } from "@/shared/lib/types/insurance";
import { RiArrowRightLine } from "@remixicon/react";
import React, { Activity, useState } from "react";
import BulkUploadSelectStep from "./bulk-upload-steps/bulk-upload-select-step";
import UploadPreviewStep from "./bulk-upload-steps/upload-preview-step";

const UPLOAD_STEPS = [
  "Upload Excel",
  "Validate",
  "Trigger Deduction + Force Loan + Eamil",
];

const BulkUploadPage = () => {
  const [tab, setTab] = useState<"uploader" | "preview">("uploader");

  const [extractedRows, setExtractedRows] = useState<ExcelExtractedRow[]>([]);

  return (
    <>
      <Card className="p-0">
        <CardHeader className="bg-primary p-4 text-center">
          <CardTitle className="text-primary-foreground text-lg font-semibold">
            Bulk Insurance Renewal & Force Loan Booking
          </CardTitle>
          <CardDescription className="text-primary-foreground">
            <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
              {UPLOAD_STEPS.map((step) => (
                <React.Fragment key={step}>
                  <span>{step}</span>
                  <RiArrowRightLine className="size-3 rotate-90 last:hidden md:rotate-0" />
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
