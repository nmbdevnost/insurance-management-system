import ExcelFileUpload from "@/shared/components/file-upload/excel-file-upload";
import FileUploadErrors from "@/shared/components/file-upload/excel-file-upload/file-upload-errors";
import UploadedFilesTable from "@/shared/components/file-upload/excel-file-upload/uploaded-files-table";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { Button } from "@/shared/components/ui/button";
import { CardContent, CardFooter } from "@/shared/components/ui/card";
import type { ExcelExtractedRow } from "@/shared/lib/types/insurance";
import { parseExcelFile } from "@/shared/lib/utils/excel";
import type { FileUploadItem } from "@/shared/providers/file-upload-provider";
import FileUploadProvider from "@/shared/providers/file-upload-provider";
import { RiAlertLine, RiArrowRightLine } from "@remixicon/react";
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

const EXPECTED_COLUMNS = [
  "Customer Name",
  "Customer Email",
  "Customer Phone",
  "Customer ID Number",
  "Reference Identifier",
  "Proposed Date Time",
  "Scheduled Date Time",
  "Purpose",
  "Status",
  "Location",
  "Assigned Staff",
  "Customer TimeZone",
  "Agent TimeZone",
  "Remarks",
  "Cancellation Reason",
] as const;

interface FileError {
  fileId: string;
  fileName: string;
  errors: string[];
}

const BulkUploadSelectStep = ({
  setExtractedRows,
  setTab,
}: {
  setExtractedRows: Dispatch<SetStateAction<ExcelExtractedRow[]>>;
  setTab: Dispatch<SetStateAction<"uploader" | "preview">>;
}) => {
  const [uploadFiles, setUploadFiles] = useState<FileUploadItem[]>([]);
  const [fileErrors, setFileErrors] = useState<FileError[]>([]);

  const lastErrorRef = useRef<HTMLDivElement>(null);

  // track uploads pending
  const isUploadPending = uploadFiles.some(
    (file) => file.status === "uploading"
  );

  // track active errors
  const hasActiveErrors = fileErrors.some((error) =>
    uploadFiles.some((file) => file.id === error.fileId)
  );

  // Helper to update specific file in state
  const updateFileProgress = (
    fileId: string,
    updates: Partial<FileUploadItem>
  ) => {
    setUploadFiles((prev) =>
      prev.map((file) => (file.id === fileId ? { ...file, ...updates } : file))
    );
  };

  // Add error for a specific file
  const addFileError = (fileId: string, fileName: string, errors: string[]) => {
    setFileErrors((prev) => {
      // Remove existing errors for this file
      const filtered = prev.filter((e) => e.fileId !== fileId);
      // Add new errors
      return [...filtered, { fileId, fileName, errors }];
    });
  };

  // Remove errors for a specific file
  const removeFileError = (fileId: string) => {
    setFileErrors((prev) => prev.filter((e) => e.fileId !== fileId));
  };

  const processFile = async (file: FileUploadItem) => {
    try {
      // clear any previous errors for this file
      removeFileError(file.id);

      // initialize with uploading status and 0 progress
      updateFileProgress(file.id, {
        status: "uploading",
        progress: 0,
      });

      // start processing
      await new Promise((resolve) => setTimeout(resolve, 50));
      updateFileProgress(file.id, { progress: 30 });
      await new Promise((resolve) => setTimeout(resolve, 50));

      // parse Excel file
      const result = await parseExcelFile(file.file as File, EXPECTED_COLUMNS);

      // parsing complete - increase progress
      updateFileProgress(file.id, { progress: 70 });

      // handle errors
      if ("errors" in result) {
        addFileError(file.id, file.file.name, result.errors);
        updateFileProgress(file.id, {
          status: "error",
          progress: 0,
          error: result.errors.join(", "),
        });
        return;
      }

      // extract rows - 90% progress
      updateFileProgress(file.id, { progress: 90 });

      const newRows = (result as ExcelExtractedRow[]).map((row) => ({
        ...row,
        fileName: file.file.name,
        status: "draft",
      }));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setExtractedRows((prev) => [...prev, ...newRows] as any);

      // complete processing
      await new Promise((resolve) => setTimeout(resolve, 500));

      updateFileProgress(file.id, {
        status: "completed",
        progress: 100,
      });
    } catch (error) {
      const errorMessage = `Failed to process ${file.file.name}: ${
        error instanceof Error ? error.message : "Unknown error"
      }`;
      addFileError(file.id, file.file.name, [errorMessage]);
      updateFileProgress(file.id, {
        status: "error",
        progress: 0,
        error: errorMessage,
      });
    }
  };

  const handleFilesChange = async (files: FileUploadItem[]) => {
    if (files.length === 0) {
      setFileErrors([]);
      setExtractedRows([]);
      setUploadFiles(files);
      return;
    }

    // Find newly added files
    const newFiles = files.filter(
      (file) => !uploadFiles.some((uf) => uf.id === file.id)
    );

    // Find removed files and clean up their errors
    const removedFiles = uploadFiles.filter(
      (uf) => !files.some((file) => file.id === uf.id)
    );

    removedFiles.forEach((file) => {
      removeFileError(file.id);
      // Also remove extracted rows from this file
      setExtractedRows((prev) =>
        prev.filter(
          (row) =>
            (row as ExcelExtractedRow & { fileName: string }).fileName !==
            file.file.name
        )
      );
    });

    // Update state with new files
    setUploadFiles(files);

    // Process new files immediately
    newFiles.forEach((file) => {
      processFile(file);
    });
  };

  const handleContinue = () => {
    if (!isUploadPending && !hasActiveErrors) {
      setTab("preview");
    }
  };

  // Scroll to last error when errors change
  useEffect(() => {
    if (fileErrors.length > 0 && lastErrorRef.current) {
      lastErrorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [fileErrors]);

  return (
    <>
      <CardContent className="space-y-4 p-4">
        <FileUploadProvider
          uploadFiles={uploadFiles}
          onUploadFilesChange={handleFilesChange}
          accept=".xlsx"
          maxSize={1024 * 1024 * 50}
          maxFiles={5}
          showProgress={true}
        >
          <ExcelFileUpload />
          <UploadedFilesTable />
          <FileUploadErrors />

          {fileErrors.length > 0 &&
            fileErrors.map((fileError, index) => (
              <div key={fileError.fileId}>
                {fileError.errors.map((error, errorIndex) => (
                  <Alert
                    key={`${fileError.fileId}-${errorIndex}`}
                    variant="destructive"
                    ref={
                      index === fileErrors.length - 1 &&
                      errorIndex === fileError.errors.length - 1
                        ? lastErrorRef
                        : null
                    }
                  >
                    <RiAlertLine />
                    <AlertTitle>Error in {fileError.fileName}</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ))}
              </div>
            ))}
        </FileUploadProvider>
      </CardContent>
      <CardFooter>
        <Button
          className="ml-auto"
          disabled={
            uploadFiles.length === 0 || isUploadPending || hasActiveErrors
          }
          onClick={handleContinue}
        >
          Continue
          <RiArrowRightLine />
        </Button>
      </CardFooter>
    </>
  );
};

export default BulkUploadSelectStep;
