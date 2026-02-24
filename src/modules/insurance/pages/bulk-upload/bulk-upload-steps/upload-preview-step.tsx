import { Button } from "@/shared/components/ui/button";
import { CardContent, CardFooter } from "@/shared/components/ui/card";
import type { InsuranceBulkUploadRow } from "@/shared/lib/types/insurance";
import { RiArrowLeftLine, RiCheckLine, RiInboxLine } from "@remixicon/react";
import ExtractedTable from "../extracted-table";
import { Typography } from "@/shared/components/ui/typography";
import useLeaveConfirmation from "@/shared/hooks/use-leave-confirmation";

const UploadPreviewStep = ({
  extractedRows,
  setTab,
}: {
  extractedRows: InsuranceBulkUploadRow[];
  setTab: (tab: "uploader" | "preview") => void;
}) => {
  const handleSubmit = () => {};

  useLeaveConfirmation();

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

        <div className="ml-auto space-x-1">
          <Button
            disabled={extractedRows.length === 0}
            onClick={handleSubmit}
            variant="outline"
            className="border-dashed"
          >
            <RiInboxLine />
            Save as Draft
          </Button>
          <Button disabled={extractedRows.length === 0} onClick={handleSubmit}>
            <RiCheckLine />
            Process All Valid Rows
          </Button>
        </div>
      </CardFooter>
    </>
  );
};

export default UploadPreviewStep;
