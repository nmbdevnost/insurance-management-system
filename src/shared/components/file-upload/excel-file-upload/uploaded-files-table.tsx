import { Badge } from "@/shared/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { formatBytes } from "@/shared/hooks/use-file-upload";
import { cn } from "@/shared/lib/utils";
import { getFileIcon, getFileTypeLabel } from "@/shared/lib/utils/file-upload";
import { useFileUpload } from "@/shared/providers/file-upload-provider";
import {
  RiDeleteBinLine,
  RiDownloadLine,
  RiRestartLine,
} from "@remixicon/react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";

const UploadedFilesTable = ({
  actionsDisabled,
}: {
  actionsDisabled?: boolean;
}) => {
  const { uploadFiles, fileUploadActions, retryUpload } = useFileUpload();

  if (uploadFiles.length === 0) {
    return null;
  }

  return (
    <>
      {/* Files Table */}
      {uploadFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">
              Files ({uploadFiles.length})
            </h3>

            <Button
              onClick={fileUploadActions.clearFiles}
              variant="outline"
              size="sm"
            >
              <RiDeleteBinLine />
              Remove all
            </Button>
          </div>
        </div>
      )}
      <div className="rounded-lg border">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow className="text-xs">
              <TableHead className="h-9">Name</TableHead>
              <TableHead className="h-9">Type</TableHead>
              <TableHead className="h-9">Size</TableHead>
              <TableHead className="h-9 w-25 text-end">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {uploadFiles.map((fileItem) => (
              <TableRow key={fileItem.id}>
                {/* File Name */}
                <TableCell className="py-2 ps-1.5">
                  <div className="flex items-center gap-1">
                    <div
                      className={cn(
                        "text-muted-foreground/80 relative flex size-8 shrink-0 items-center justify-center"
                      )}
                    >
                      {fileItem.status === "uploading" ? (
                        <div className="relative">
                          {/* Circular progress background */}
                          <svg
                            className="size-8 -rotate-90"
                            viewBox="0 0 32 32"
                          >
                            <circle
                              cx="16"
                              cy="16"
                              r="14"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="text-muted-foreground/20"
                            />
                            {/* Progress circle */}
                            <circle
                              cx="16"
                              cy="16"
                              r="14"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeDasharray={`${2 * Math.PI * 14}`}
                              strokeDashoffset={`${2 * Math.PI * 14 * (1 - fileItem.progress / 100)}`}
                              className="text-primary transition-all duration-300"
                              strokeLinecap="round"
                            />
                          </svg>
                          {/* File icon in center */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            {getFileIcon(fileItem.file)}
                          </div>
                        </div>
                      ) : (
                        <div className="not-[]:size-8 flex items-center justify-center">
                          {getFileIcon(fileItem.file)}
                        </div>
                      )}
                    </div>
                    <p className="flex items-center gap-1 truncate text-sm font-medium">
                      {fileItem.file.name}
                      {fileItem.status === "error" && (
                        <Badge variant="destructive">Error</Badge>
                      )}
                    </p>
                  </div>
                </TableCell>

                {/* File Type */}
                <TableCell className="py-2">
                  <Badge variant="secondary" className="text-xs">
                    {getFileTypeLabel(fileItem.file)}
                  </Badge>
                </TableCell>

                {/* File Size */}
                <TableCell className="text-muted-foreground py-2 text-sm">
                  {formatBytes(fileItem.file.size)}
                </TableCell>
                <TableCell className="py-2 pe-1">
                  <div className="flex items-center gap-1">
                    {fileItem.preview && (
                      <Button
                        size="icon"
                        className="size-8"
                        render={<Link to={fileItem.preview} target="_blank" />}
                        disabled={actionsDisabled}
                      >
                        <RiDownloadLine className="size-3.5" />
                      </Button>
                    )}
                    {fileItem.status === "error" ? (
                      <Button
                        onClick={() => retryUpload(fileItem.id)}
                        size="icon"
                        variant="destructive"
                        className="text-destructive/80 hover:text-destructive size-8"
                        disabled={actionsDisabled}
                      >
                        <RiRestartLine className="size-3.5" />
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          fileUploadActions.removeFile(fileItem.id)
                        }
                        size="icon"
                        className="size-8"
                        variant="destructive"
                        disabled={actionsDisabled}
                      >
                        <RiDeleteBinLine className="size-3.5" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default UploadedFilesTable;
