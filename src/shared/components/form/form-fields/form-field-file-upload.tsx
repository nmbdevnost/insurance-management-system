import {
  formatBytes,
  useFileUpload,
  type FileUploadOptions,
  type FileWithPreview,
} from "@/shared/hooks/use-file-upload";
import { cn } from "@/shared/lib/utils";
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
} & FileUploadOptions;

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
  maxFiles,
  maxSize,
  accept,
  multiple,
  initialFiles,
  onError,
  onFilesChange,
}: FormFieldFileUploadProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FieldFileUploadInner
          field={field}
          fieldState={fieldState}
          label={label}
          description={description}
          className={className}
          maxFiles={maxFiles}
          maxSize={maxSize}
          accept={accept}
          multiple={multiple || (!!maxFiles && maxFiles > 1)}
          initialFiles={initialFiles}
          onError={onError}
          onFilesChange={onFilesChange}
        />
      )}
    />
  );
};

// Separated to allow hook usage inside Controller render
type InnerProps = {
  field: { name: string; onChange: (value: FileWithPreview[]) => void };
  fieldState: { invalid: boolean; error?: { message?: string } };
  label?: string;
  description?: string;
  className?: string;
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
}: InnerProps) => {
  const { setError, clearErrors } = useFormContext();

  const isMultiple = multiple || (!!maxFiles && maxFiles > 1);

  const [
    { files, isDragging },
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
    onError: (errs) => {
      setError(field.name, { message: errs[0] });
      onError?.(errs);
    },
    onFilesChange: (updatedFiles) => {
      clearErrors(field.name);
      if (onFilesChange) {
        onFilesChange?.(updatedFiles);
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
            "flex flex-col gap-3 rounded-lg border border-dashed p-3 transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50",
            fieldState.invalid && "border-destructive"
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <input {...getInputProps()} id={field.name} className="sr-only" />

          {/* Top row: button + hint/count */}
          <div className="flex items-center gap-3">
            <Button
              type="button"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                openFileDialog();
              }}
              className={cn(isDragging && "animate-bounce")}
            >
              <RiAddLine className="size-4" />
              Browse
            </Button>

            {files.length > 0 ? (
              <ul className="flex w-full flex-wrap items-stretch space-y-2 gap-x-2">
                {files.map((fileItem) => (
                  <li
                    key={fileItem.id}
                    className={cn(
                      "bg-background flex items-center gap-3 rounded-md border px-3 py-2",
                      !isMultiple && "w-full"
                    )}
                  >
                    <div className="bg-primary/10 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-md">
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
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">
                Drop files here or click to browse{" "}
                {maxFiles && maxFiles > 1 ? ` (max ${maxFiles})` : ""}
              </p>
            )}
          </div>
        </div>
      </div>

      {description && <FieldDescription>{description}</FieldDescription>}
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
};

export default FormFieldFileUpload;
