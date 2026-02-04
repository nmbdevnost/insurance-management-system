import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { RiFileExcelLine } from "@remixicon/react";

const ExtractionInProgressDialog = ({ open }: { open?: boolean }) => {
  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Extraction In Progress
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center space-y-6 py-4">
          {/* File icon with scanning animation */}
          <div className="relative h-16 w-16">
            <div className="flex items-center justify-center">
              <RiFileExcelLine className="size-16 text-green-600" />
            </div>

            {/* Scanning line animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-scan h-0.5 w-16 bg-blue-500"></div>
            </div>
          </div>

          {/* Loading text */}
          <div className="space-y-2 text-center">
            <p className="text-muted-foreground text-sm">
              Processing your Excel files...
            </p>
            <p className="text-muted-foreground text-xs">
              Extracting and validating rows. This may take a few moments
              depending on the number and size of the files you uploaded.
            </p>
          </div>

          {/* Progress dots animation */}
          {/* <div className="flex space-x-1">
            <div
              className="bg-primary h-2 w-2 animate-bounce rounded-full"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="bg-primary h-2 w-2 animate-bounce rounded-full"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="bg-primary h-2 w-2 animate-bounce rounded-full"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExtractionInProgressDialog;
