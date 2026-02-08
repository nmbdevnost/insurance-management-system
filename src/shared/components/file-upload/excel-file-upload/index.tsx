"use client";

import {
  formatBytes,
  type FileWithPreview,
} from "@/shared/hooks/use-file-upload";
import { cn } from "@/shared/lib/utils";
import { useFileUpload } from "@/shared/providers/file-upload-provider";
import { RiUploadLine } from "@remixicon/react";
import { Separator } from "../../ui/separator";

export interface ExcelFileUploadItem extends FileWithPreview {
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
}

export default function ExcelFileUpload({ className }: { className?: string }) {
  const { maxSize, maxFiles, fileUploadState, fileUploadActions } =
    useFileUpload();

  const { isDragging } = fileUploadState;

  const {
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    getInputProps,
    openFileDialog,
  } = fileUploadActions;

  // Get accepted file types from input props
  const getAcceptedFileTypes = (): string => {
    const inputProps = getInputProps();
    const accept = inputProps.accept;

    if (!accept) return "All files";

    const types = accept.split(",").map((type) => type.trim());
    const formattedTypes = types.map((type) => {
      if (type.startsWith(".")) {
        return type.toUpperCase();
      }
      if (type.endsWith("/*")) {
        const baseType = type.split("/")[0];
        return baseType.charAt(0).toUpperCase() + baseType.slice(1) + " files";
      }
      return type;
    });

    return formattedTypes.join(", ");
  };

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
                onClick={(e) => {
                  e.stopPropagation();
                  openFileDialog();
                }}
                className="text-primary cursor-pointer underline-offset-4 hover:underline"
              >
                browse files
              </button>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <p className="text-muted-foreground text-xs">
                Supported file types: {getAcceptedFileTypes()}
              </p>

              {maxSize && (
                <>
                  <Separator orientation="vertical" />
                  <p className="text-muted-foreground text-xs">
                    Maximum file size: {formatBytes(maxSize)}
                  </p>
                </>
              )}

              {maxFiles && (
                <>
                  <Separator orientation="vertical" />
                  <p className="text-muted-foreground text-xs">
                    Maximum files: {maxFiles}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
