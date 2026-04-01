import {
  formatBytes,
  useFileUpload,
  type FileMetadata,
  type FileUploadOptions,
  type FileWithPreview,
} from "@/shared/hooks/use-file-upload";
import { cn, getAcceptedFileTypes } from "@/shared/lib/utils";
import { RiAddLine, RiCloseLine, RiFileLine } from "@remixicon/react";
import {
  Controller,
  useFormContext,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Button } from "../../ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../../ui/field";

type FormFieldFileUploadProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  description?: string;
  control?: Control<T>;
  className?: string;
  disabled?: boolean;
  showPreview?: boolean;
} & FileUploadOptions;

type InnerProps = {
  field: {
    name: string;
    onChange: (value: FileWithPreview[]) => void;
  };
  fieldState: {
    invalid: boolean;
    error?: { message?: string };
  };
  label?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  showPreview?: boolean;
} & FileUploadOptions;

const FieldFileUploadInner = ({
  field,
  fieldState,
  label,
  description,
  className,
  maxFiles,
  maxSize,
  accept,
  multiple,
  initialFiles,
  onError,
  onFilesChange,
  onFilesAdded,
  disabled,
  showPreview,
}: InnerProps) => {
  const { setError, clearErrors } = useFormContext();

  const isMultiple = multiple || (!!maxFiles && maxFiles > 1);
  const accepted = Array.isArray(accept) ? accept.join(",") : accept;

  const supportedFileTypes = getAcceptedFileTypes(accepted);

  const [
    { files, isDragging, errors },
    {
      getInputProps,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
    },
  ] = useFileUpload({
    maxFiles,
    maxSize,
    accept,
    multiple: isMultiple,
    initialFiles,
    onFilesAdded,
    onError: (errs) => {
      setError(field.name, { message: errs[0] });
      onError?.(errs);
    },
    onFilesChange: (updatedFiles) => {
      clearErrors(field.name);
      if (onFilesChange) {
        onFilesChange(updatedFiles);
      } else {
        field.onChange(updatedFiles);
      }
    },
  });

  return (
    <Field data-invalid={fieldState.invalid}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}

      <div className={cn("space-y-3", className)}>
        <div
          className={cn(
            "bg-input/30 flex cursor-pointer flex-col gap-3 rounded-lg border border-dashed p-3 transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50",
            (fieldState.invalid || errors.length > 0) &&
              "border-destructive/80 ring-destructive/20 hover:border-destructive ring-2",
            disabled && "pointer-events-none"
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <input
            {...getInputProps()}
            id={field.name}
            className="sr-only"
            disabled={disabled}
          />

          <div className="flex items-center gap-3">
            {files.length === 0 ? (
              <>
                <Button
                  type="button"
                  size="sm"
                  className={cn(isDragging && "animate-bounce")}
                  onClick={(e) => {
                    e.stopPropagation();
                    openFileDialog();
                  }}
                >
                  <RiAddLine className="size-4" />
                  Browse
                </Button>
                <p className="text-muted-foreground text-sm">
                  Drop files here or click to browse
                  {maxFiles && maxFiles > 1 ? ` (max ${maxFiles})` : ""}
                  {supportedFileTypes !== "*" && (
                    <span className="text-muted-foreground">
                      {" "}
                      (Supported: {supportedFileTypes})
                    </span>
                  )}
                </p>
              </>
            ) : (
              <ul className="flex w-full flex-wrap items-stretch gap-x-2 gap-y-2">
                {files.map((fileItem) => {
                  const isImage =
                    fileItem.preview && fileItem.file.type.startsWith("image/");

                  return showPreview ? (
                    <li
                      key={fileItem.id}
                      className="bg-background overflow-hidden rounded-md border"
                    >
                      {/* Preview area */}
                      <div className="bg-muted relative h-40 w-full">
                        {isImage ? (
                          <img
                            src={fileItem.preview!}
                            alt={fileItem.file.name}
                            className="size-full object-cover"
                          />
                        ) : (
                          <div className="text-muted-foreground flex size-full flex-col items-center justify-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="size-12 opacity-40"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={1}
                            >
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                              <line x1="16" y1="13" x2="8" y2="13" />
                              <line x1="16" y1="17" x2="8" y2="17" />
                              <polyline points="10 9 9 9 8 9" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* File info row */}
                      <div className="flex items-center gap-3 px-3 py-2">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm leading-tight font-medium">
                            {fileItem.file.name}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {formatBytes(fileItem.file.size)}
                          </p>
                        </div>

                        {!disabled && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-destructive size-7 shrink-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(fileItem.id);
                            }}
                          >
                            <RiCloseLine className="size-4" />
                          </Button>
                        )}
                      </div>
                    </li>
                  ) : (
                    <li
                      key={fileItem.id}
                      className="bg-background flex w-full items-center gap-3 rounded-md border px-3 py-2"
                    >
                      <div className="bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md">
                        <RiFileLine className="size-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm leading-tight font-medium">
                          {fileItem.file.name}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {formatBytes(fileItem.file.size)}
                        </p>
                      </div>

                      {!disabled && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive size-7 shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(fileItem.id);
                          }}
                        >
                          <RiCloseLine className="size-4" />
                        </Button>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>

      {description && <FieldDescription>{description}</FieldDescription>}
      {errors.length > 0 && (
        <FieldError errors={errors.map((message) => ({ message }))} />
      )}
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
};

/**
 * A react-hook-form compatible file upload field.
 * Field value is `FileWithPreview[]`.
 */
const FormFieldFileUpload = <T extends FieldValues>({
  name,
  label,
  description,
  control,
  className,
  disabled,
  ...fileUploadOptions
}: FormFieldFileUploadProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const initialFileWithPreview = field.value as FileWithPreview[];

        const initialFiles: FileMetadata[] = initialFileWithPreview?.map(
          (f) => ({
            id: f.id,
            name: f.file.name,
            size: f.file.size,
            type: f.file.type,
            url: f.preview ?? "",
          })
        );

        return (
          <FieldFileUploadInner
            field={field}
            fieldState={fieldState}
            label={label}
            description={description}
            className={className}
            disabled={disabled}
            initialFiles={initialFiles}
            {...fileUploadOptions}
          />
        );
      }}
    />
  );
};

export default FormFieldFileUpload;
