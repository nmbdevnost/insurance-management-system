import useControlledState from "@/shared/hooks/use-controlled-state";
import { cn } from "@/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import type { ZodType } from "zod";
import type { ZodTypeAny } from "zod/v3";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../ui/alert-dialog";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { ScrollArea } from "../../ui/scroll-area";
import Spinner from "../../ui/spinner";

type DialogFormProps<T extends FieldValues> = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schema: ZodType<T>;
  defaultValues?: DefaultValues<T>;
  onSubmit: SubmitHandler<T>;
  className?: string;
  children: React.ReactNode;

  bodyClassName?: string;

  // header props
  title?: string;
  description?: string;
  header?: React.ReactNode;

  // footer props
  submitText?: string;
  cancelText?: string;
  footer?: React.ReactNode;

  autoScroll?: boolean;
};

const DialogForm = <T extends FieldValues>({
  open,
  onOpenChange,
  schema,
  defaultValues,
  onSubmit,
  className,
  children,
  bodyClassName,

  title,
  description,
  header,

  submitText = "Submit",
  cancelText = "Cancel",
  footer,

  autoScroll,
}: DialogFormProps<T>) => {
  // state for controlling the open state of the dialog
  const { value, onChange } = useControlledState({
    defaultValue: false,
    value: open,
    onChange: onOpenChange,
  });

  // state for close confirmation
  const [openCloseAlert, setOpenCloseAlert] = useState(false);

  // react hook form setup
  const form = useForm({
    resolver: zodResolver(schema as unknown as ZodTypeAny),
    defaultValues,
  });

  const { formState } = form;

  const isFormDirty = formState.isDirty;
  const isSubmitting = formState.isSubmitting;

  const handleToggle = () => {
    if (value) {
      if (isFormDirty) {
        setOpenCloseAlert(true);
      } else {
        onChange(false);
      }
    } else {
      onChange(true);
    }
  };

  return (
    <>
      <Dialog open={value} onOpenChange={handleToggle}>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogContent className={cn("gap-0 p-0", className)}>
              {header ? (
                header
              ) : (
                <DialogHeader className="border-b p-4">
                  <DialogTitle>{title}</DialogTitle>
                  <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
              )}

              {!autoScroll ? (
                children
              ) : (
                <ScrollArea className="max-h-[70vh]">
                  <div className={cn("p-2", bodyClassName)}>{children}</div>
                </ScrollArea>
              )}

              {footer ? (
                footer
              ) : (
                <DialogFooter className="m-0">
                  <Button
                    type="button"
                    onClick={handleToggle}
                    variant="outline"
                  >
                    {cancelText}
                  </Button>

                  <Button disabled={isSubmitting}>
                    {isSubmitting && <Spinner />} {submitText}
                  </Button>
                </DialogFooter>
              )}
            </DialogContent>
          </form>
        </FormProvider>
      </Dialog>

      <AlertDialog open={openCloseAlert} onOpenChange={setOpenCloseAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to close this
              form?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setOpenCloseAlert(false);
                onChange(false);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DialogForm;
