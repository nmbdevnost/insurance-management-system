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
import { FieldSet } from "../../ui/field";
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

  scrollableBody?: boolean;
};

/**
 * A dialog form component that allows for the creation of a form inside a dialog.
 * @param open - The open state of the dialog
 * @param onOpenChange - The function to call when the open state of the dialog changes
 * @param schema - The schema to use for the form
 * @param defaultValues - The default values to use for the form
 * @param onSubmit - The function to call when the form is submitted
 * @param className - The class name to use for the dialog
 * @param children - The children to render in the dialog
 * @param bodyClassName - The class name to use for the body of the dialog
 * @param title - The title of the dialog
 * @param description - The description of the dialog
 * @param header - The header of the dialog
 * @param submitText - The text to use for the submit button
 * @param cancelText - The text to use for the cancel button
 * @param footer - The footer of the dialog
 * @param scrollableBody - Whether to add a scroll area to the body of the dialog
 */
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

  scrollableBody = true,
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

  const handleClose = () => {
    if (value) {
      if (isFormDirty) {
        setOpenCloseAlert(true);
      } else {
        onChange(false);
        form.reset(defaultValues);
      }
    } else {
      onChange(true);
    }
  };

  const handleDiscard = () => {
    setOpenCloseAlert(false);
    onChange(false);
    form.reset(defaultValues);
  };

  return (
    <>
      <Dialog open={value} onOpenChange={handleClose}>
        <DialogContent className={cn("p-0", className)}>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full gap-0"
            >
              {header ? (
                header
              ) : (
                <DialogHeader className="border-b p-4">
                  <DialogTitle>{title}</DialogTitle>
                  <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
              )}

              {!scrollableBody ? (
                children
              ) : (
                <ScrollArea className="max-h-[70vh]">
                  <FieldSet className={cn("p-4 pt-2", bodyClassName)}>
                    {children}
                  </FieldSet>
                </ScrollArea>
              )}

              {footer ? (
                footer
              ) : (
                <DialogFooter className="m-0">
                  <Button type="button" onClick={handleClose} variant="outline">
                    {cancelText}
                  </Button>

                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Spinner />} {submitText}
                  </Button>
                </DialogFooter>
              )}
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>

      <AlertDialog open={openCloseAlert} onOpenChange={setOpenCloseAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to discard your changes? Your changes will
              be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDiscard}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DialogForm;
