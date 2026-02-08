import { Button } from "@/shared/components/ui/button";
import { CardContent, CardFooter } from "@/shared/components/ui/card";
import type { ExcelExtractedRow } from "@/shared/lib/types/insurance";
import { RiArrowLeftLine, RiCheckLine, RiInboxLine } from "@remixicon/react";
import ExtractedTable from "../extracted-table";

const UploadPreviewStep = ({
  extractedRows,
  setTab,
}: {
  extractedRows: ExcelExtractedRow[];
  setTab: (tab: "uploader" | "preview") => void;
}) => {
  const handleSubmit = () => {};

  return (
    <>
      <CardContent className="mb-4 w-full">
        <p className="mb-2 text-lg leading-tight font-medium">
          Preview & Validation Results
        </p>

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
