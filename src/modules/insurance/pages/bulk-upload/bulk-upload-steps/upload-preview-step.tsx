import { useBulkUpload } from "@/modules/insurance/providers/bulk-upload-provider";
import { Button } from "@/shared/components/ui/button";
import { CardContent, CardFooter } from "@/shared/components/ui/card";
import { Typography } from "@/shared/components/ui/typography";
import useLeaveConfirmation from "@/shared/hooks/use-leave-confirmation";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiInboxLine,
} from "@remixicon/react";
import ExtractedTable from "../extracted-table";

const UploadPreviewStep = () => {
  const { extractedRows, setTab } = useBulkUpload();

  useLeaveConfirmation();

  const handleSaveAsDraft = () => {};

  return (
    <>
      <CardContent className="mb-4 w-full space-y-2">
        <Typography variant="h4">Preview & Validation Results</Typography>

        {/* Preview */}
        <ExtractedTable extractedRows={extractedRows} />
      </CardContent>

      <CardFooter>
        <Button
          variant="outline"
          onClick={() => {
            setTab("uploader");
          }}
        >
          <RiArrowLeftLine />
          Back
        </Button>

        <div className="ml-auto flex items-center gap-1">
          <Button
            disabled={extractedRows.length === 0}
            onClick={handleSaveAsDraft}
            variant="outline"
            className="border-dashed"
          >
            <RiInboxLine />
            Save as Draft
          </Button>
          <Button
            disabled={extractedRows.length === 0}
            onClick={() => setTab("balance")}
          >
            Continue
            <RiArrowRightLine />
          </Button>
        </div>
      </CardFooter>
    </>
  );
};

export default UploadPreviewStep;
