import { useBulkUpload } from "@/modules/insurance/providers/bulk-upload-provider";
import { Button } from "@/shared/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import {
  RiCheckboxCircleLine,
  RiFileChartLine,
  RiUploadLine,
} from "@remixicon/react";
import { useNavigate } from "react-router";

const BulkUploadDoneStep = () => {
  const { reset } = useBulkUpload();
  const navigate = useNavigate();

  return (
    <>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <RiCheckboxCircleLine className="text-success size-12" />
          </EmptyMedia>
          <EmptyTitle className="text-xl">Rows Sent for Processing</EmptyTitle>
          <EmptyDescription>
            Your selected transactions have been submitted successfully. You can
            track their status in the Reports page.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row flex-wrap justify-center gap-2">
          <Button
            variant="outline"
            onClick={reset}
            className="flex-1 sm:max-w-fit"
          >
            <RiUploadLine />
            Upload More Files
          </Button>
          <Button
            onClick={() => navigate("/report")}
            className="flex-1 sm:max-w-fit"
          >
            <RiFileChartLine />
            View in Reports
          </Button>
        </EmptyContent>
      </Empty>
    </>
  );
};

export default BulkUploadDoneStep;
