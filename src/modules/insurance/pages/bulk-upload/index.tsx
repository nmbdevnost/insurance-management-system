import ExcelFileUpload from "@/shared/components/file-upload/excel-file-upload";
import UploadedFilesTable from "@/shared/components/file-upload/excel-file-upload/uploaded-files-table";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Tabs, TabsContent } from "@/shared/components/ui/tabs";
import FileUploadProvider, {
  type FileUploadItem,
} from "@/shared/providers/file-upload-provider";
import {
  RiAlertLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckLine,
} from "@remixicon/react";
import React, { useState } from "react";
import ExtractionInProgressDialog from "./extraction-inprogress-dialog";

const UPLOAD_STEPS = [
  "Upload Excel",
  "Validate",
  "Trigger Deduction + Force Loan + Eamil",
];

const BulkUploadPage = () => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<FileUploadItem[]>([]);

  const [tab, setTab] = useState<"uploader" | "extracted-rows">("uploader");
  const [extractionErrors, setExtractionErrors] = useState<string[]>([]);
  const [extractedRows, setExtractedRows] = useState<any[]>([]);

  const validRows = 1;
  const overdraftRows = 1;
  const errorRows = 0;

  const handleContinue = () => {
    setExtractionErrors([]);

    setIsExtracting(true);

    // Simulate API call with 5 seconds delay
    new Promise<void>((resolve) => {
      setTimeout(() => {
        setExtractedRows([
          {
            id: "test-1",
            customer_name: "Ramesh Karki",
            loan_number: "L4928",
          },
          {
            id: "test-2",
            loan_number: "L3814",
            customer_name: "Sita Sharma",
          },
        ]);

        // Simulate random success/failure (70% success rate for demo)
        const isSuccess = Math.random() > 0.3;

        setIsExtracting(false);

        if (isSuccess) {
          // Success scenario - switch to extracted rows tab
          setTab("extracted-rows");
        } else {
          // Error scenario - show validation errors
          setExtractionErrors([
            "Invalid file: meetings_20251124_1443 (2).xlsx",
          ]);
        }

        resolve();
      }, 5000);
    });
  };

  const handleSubmit = () => {};

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
                <React.Fragment key={step}>
                  <span>{step}</span>
                  <RiArrowRightLine className="size-3 rotate-90 last:hidden md:rotate-0" />
                </React.Fragment>
              ))}
            </div>
          </CardDescription>
        </CardHeader>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsContent value="uploader">
            <CardContent className="space-y-4 p-4">
              <FileUploadProvider
                uploadFiles={uploadFiles}
                onUploadFilesChange={setUploadFiles}
                accept=".xlsx"
                maxSize={1024 * 1024 * 50}
                showProgress={false}
              >
                <ExcelFileUpload />
                <UploadedFilesTable />
              </FileUploadProvider>

              {extractionErrors.map((error) => (
                <Alert key={error} variant="destructive">
                  <RiAlertLine />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ))}
            </CardContent>

            <CardFooter>
              <Button
                className="ml-auto"
                disabled={uploadFiles.length === 0}
                onClick={handleContinue}
              >
                Continue
                <RiArrowRightLine />
              </Button>
            </CardFooter>
          </TabsContent>

          <TabsContent value="extracted-rows">
            <CardContent className="space-y-4 p-4">
              <p className="text-lg leading-tight font-medium">
                Preview & Validation Results
              </p>

              {/* Summary */}
              <div className="grid grid-cols-4 gap-4">
                <Card className="ring-muted-foreground gap-2 p-4 text-center">
                  <CardTitle className="text-muted-foreground text-sm">
                    Total Rows
                  </CardTitle>
                  <CardDescription className="text-foreground text-lg font-bold md:text-2xl">
                    {extractedRows.length}
                  </CardDescription>
                </Card>

                <Card className="gap-2 p-4 text-center ring-green-500">
                  <CardTitle className="text-muted-foreground text-sm">
                    Valid for Processing
                  </CardTitle>
                  <CardDescription className="text-lg font-bold text-green-500 md:text-2xl">
                    {validRows}
                  </CardDescription>
                </Card>

                <Card className="gap-2 p-4 text-center ring-amber-500">
                  <CardTitle className="text-muted-foreground text-sm">
                    Will Open Overdraft
                  </CardTitle>
                  <CardDescription className="text-lg font-bold text-amber-500 md:text-2xl">
                    {overdraftRows}
                  </CardDescription>
                </Card>

                <Card className="ring-destructive gap-2 p-4 text-center">
                  <CardTitle className="text-muted-foreground text-sm">
                    Error
                  </CardTitle>
                  <CardDescription className="text-destructive text-lg font-bold md:text-2xl">
                    {errorRows}
                  </CardDescription>
                </Card>
              </div>

              {/* Preview */}
              <div className="rounded-lg border">
                <Table>
                  <TableHeader className="bg-muted">
                    <TableRow className="text-xs">
                      <TableHead className="h-9">Loan Number</TableHead>
                      <TableHead className="h-9">Customer Name</TableHead>
                      <TableHead className="h-9 w-25">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {extractedRows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.loan_number}</TableCell>
                        <TableCell>{row.customer_name}</TableCell>
                        <TableCell>
                          <Badge>Ready</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
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
              <Button
                className="ml-auto"
                disabled={uploadFiles.length === 0}
                onClick={handleSubmit}
              >
                <RiCheckLine />
                Process All Valid Rows
              </Button>
            </CardFooter>
          </TabsContent>
        </Tabs>
      </Card>

      <ExtractionInProgressDialog open={isExtracting} />
    </>
  );
};

export default BulkUploadPage;
