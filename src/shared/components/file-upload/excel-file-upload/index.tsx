"use client";

import { Button } from "@/shared/components/ui/button";

import {
  formatBytes,
  type FileWithPreview,
} from "@/shared/hooks/use-file-upload";
import { cn } from "@/shared/lib/utils";
import { useFileUpload } from "@/shared/providers/file-upload-provider";
import { RiDeleteBinLine, RiUploadLine } from "@remixicon/react";

export interface ExcelFileUploadItem extends FileWithPreview {
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
}

export default function ExcelFileUpload({ className }: { className?: string }) {
  const { maxSize, maxFiles, uploadFiles, fileUploadState, fileUploadActions } =
    useFileUpload();

  const { isDragging } = fileUploadState;

  const {
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    getInputProps,
    openFileDialog,
    clearFiles,
  } = fileUploadActions;

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Upload Area */}
      <div
        className={cn(
          "hover:border-primary! hover:bg-primary/5 relative cursor-pointer rounded-lg border border-dashed p-6 text-center transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input {...getInputProps()} className="sr-only" />

        <div className="flex flex-col items-center gap-4">
          <div
            className={cn(
              "bg-primary/20 text-primary flex h-12 w-12 items-center justify-center rounded-full transition-colors"
            )}
          >
            <RiUploadLine className="size-6" />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">
              Drop files here or{" "}
              <button
                type="button"
                onClick={openFileDialog}
                className="text-primary cursor-pointer underline-offset-4 hover:underline"
              >
                browse files
              </button>
            </p>
            {maxSize && (
              <>
                <p className="text-muted-foreground text-xs">
                  Maximum file size: {formatBytes(maxSize)}{" "}
                  {maxFiles && `• Maximum files: ${maxFiles}`}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Files Table */}
      {uploadFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">
              Files ({uploadFiles.length})
            </h3>

            <Button onClick={clearFiles} variant="outline" size="sm">
              <RiDeleteBinLine />
              Remove all
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
