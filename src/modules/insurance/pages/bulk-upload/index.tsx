import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { RiArrowRightLine, RiAttachmentLine } from "@remixicon/react";

const UPLOAD_STEPS = [
  "Upload Excel",
  "Validate",
  "Trigger Deduction + Force Loan + Eamil",
];

const BulkUploadPage = () => {
  return (
    <>
      <Card className="gap-0 p-0">
        <CardHeader className="bg-primary p-4 text-center">
          <CardTitle className="text-primary-foreground text-lg font-semibold">
            Bulk Insurance Renewal & Force Loan Booking
          </CardTitle>
          <CardDescription className="text-primary-foreground">
            <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
              {UPLOAD_STEPS.map((step) => (
                <>
                  <span>{step}</span>
                  <RiArrowRightLine className="size-3 rotate-90 last:hidden md:rotate-0" />
                </>
              ))}
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4">
          <div className="border-primary bg-primary/10 flex h-full min-h-48 w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-4 text-center">
            <div className="flex items-center gap-1">
              <RiAttachmentLine className="text-primary size-5" />

              <span className="text-primary font-medium">
                Drop your Excel file here.
              </span>
            </div>

            <span className="text-primary">or</span>

            <div className="flex flex-col items-center gap-2">
              <Button>Choose Excel File</Button>

              <span className="text-muted-foreground text-xs">
                Supported: .xlsx only | Max Size: 5000 rows
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default BulkUploadPage;
