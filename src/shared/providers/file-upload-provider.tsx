import { createContext, useContext } from "react";
import {
  useFileUpload as useFileUploadHook,
  type FileUploadActions,
  type FileUploadState,
  type FileWithPreview,
} from "../hooks/use-file-upload";
import { cn } from "../lib/utils";

export type FileUploadProviderProps = {
  uploadFiles: FileUploadItem[];
  onUploadFilesChange?: (files: FileUploadItem[]) => void;

  maxFiles?: number;
  maxSize?: number;
  accept?: string;

  showProgress?: boolean;

  className?: string;
  children: React.ReactNode;
};

export interface FileUploadItem extends FileWithPreview {
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;
}

export type FileUploadProviderValue = {
  showProgress?: boolean;
  maxSize?: number;
  maxFiles?: number;
  uploadFiles: FileUploadItem[];
  fileUploadState: FileUploadState;
  fileUploadActions: FileUploadActions;
  retryUpload: (fileId: string) => void;
};

const FileUploadContext = createContext<FileUploadProviderValue | null>(null);

export function useFileUpload(): FileUploadProviderValue {
  const context = useContext(FileUploadContext);
  if (!context) {
    throw new Error("useFileUpload must be used within a FileUploadProvider");
  }
  return context;
}

const FileUploadProvider = ({
  uploadFiles,
  children,
  accept,
  className,
  maxFiles,
  maxSize,
  showProgress,
  onUploadFilesChange,
}: FileUploadProviderProps) => {
  const convertToUploadItems = (files: FileWithPreview[]): FileUploadItem[] => {
    return files.map((file) => {
      // Check if this file already exists in uploadFiles
      const existingFile = uploadFiles.find(
        (existing) => existing.id === file.id
      );

      if (existingFile) {
        // Preserve existing file status and progress
        return {
          ...existingFile,
          ...file, // Update any changed properties from the file
        };
      } else {
        // New file - set to uploading
        return {
          ...file,
          progress: showProgress ? 0 : 100,
          status: showProgress
            ? ("uploading" as const)
            : ("completed" as const),
        };
      }
    });
  };

  const [fileUploadState, fileUploadActions] = useFileUploadHook({
    maxFiles,
    maxSize,
    accept,
    multiple: maxFiles ? maxFiles > 1 : true,
    initialFiles: [],
    onFilesAdded: (addedFiles) => {
      const allFiles = [...fileUploadState.files, ...addedFiles];
      const newUploadFiles = convertToUploadItems(allFiles);
      onUploadFilesChange?.(newUploadFiles);
    },
  });

  // Wrap removeFile to notify parent
  const handleRemoveFile = (id: string) => {
    fileUploadActions.removeFile(id);

    // Calculate what the new files will be after removal
    const newFiles = fileUploadState.files.filter((file) => file.id !== id);
    const newUploadFiles = convertToUploadItems(newFiles);
    onUploadFilesChange?.(newUploadFiles);
  };

  // Wrap clearFiles to notify parent
  const handleClearFiles = () => {
    fileUploadActions.clearFiles();
    onUploadFilesChange?.([]);
  };

  const retryUpload = (fileId: string) => {
    // TODO: implement retry upload
    console.log("🚀 ~ retryUpload ~ fileId:", fileId);
  };

  return (
    <FileUploadContext.Provider
      value={{
        showProgress,
        maxSize,
        maxFiles,
        uploadFiles,
        fileUploadState,
        fileUploadActions: {
          ...fileUploadActions,
          removeFile: handleRemoveFile,
          clearFiles: handleClearFiles,
        },
        retryUpload,
      }}
    >
      <div className={cn("w-full space-y-4", className)}>{children}</div>
    </FileUploadContext.Provider>
  );
};

export default FileUploadProvider;
