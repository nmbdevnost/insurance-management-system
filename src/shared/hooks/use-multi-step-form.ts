import { getSchemaFields } from "@/shared/lib/utils/form";
import { useCallback } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import type { ZodType } from "zod";

type UseMultiStepFormProps<T extends FieldValues> = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  stepCount: number;
  form: UseFormReturn<T>;
  schemas: ZodType[];
  onStepComplete?: (step: number, data: T) => boolean | Promise<boolean>;
  handleScrollToTop: () => void;
};

export function useMultiStepForm<T extends FieldValues>({
  currentStep,
  setCurrentStep,
  stepCount,
  form,
  schemas,
  onStepComplete,
  handleScrollToTop,
}: UseMultiStepFormProps<T>) {
  const goToStep = useCallback(
    async (step: number) => {
      const targetStep = Math.max(0, Math.min(step, stepCount - 1));

      if (targetStep === currentStep) return true;

      // Backwards navigation is always allowed
      if (targetStep < currentStep) {
        setCurrentStep(targetStep);
        form.clearErrors();
        handleScrollToTop();
        return true;
      }

      // Forward → validate each intermediate step
      let canProceed = true;

      await form.handleSubmit(
        async (data) => {
          for (let i = currentStep; i < targetStep; i++) {
            if (onStepComplete) {
              const result = await onStepComplete?.(i, data);

              if (!result) {
                canProceed = false;
                setCurrentStep(i);
                handleScrollToTop();
                break;
              }

              canProceed = result;
            }
          }
        },
        async (errors) => {
          for (let i = currentStep; i < targetStep; i++) {
            const stepFields = getSchemaFields<T>(schemas[i]);

            const stepHasErrors = stepFields.some((field) => field in errors);

            let isStepCompleted = !stepHasErrors;

            if (!stepHasErrors && onStepComplete) {
              const result = await onStepComplete(i, form.getValues());
              isStepCompleted = !!result;
            }

            if (isStepCompleted) {
              canProceed = true;
            } else {
              canProceed = false;
              setCurrentStep(i);
              handleScrollToTop();
              break;
            }
          }
        }
      )();

      if (canProceed) {
        setCurrentStep(targetStep);
        form.clearErrors();
        handleScrollToTop();
      }

      return canProceed;
    },
    [
      currentStep,
      form,
      handleScrollToTop,
      setCurrentStep,
      stepCount,
      onStepComplete,
      schemas,
    ]
  );

  const goToPrevious = useCallback(() => {
    setCurrentStep(Math.max(currentStep - 1, 0));
    handleScrollToTop();
  }, [currentStep, setCurrentStep, handleScrollToTop]);

  return { goToStep, goToPrevious };
}
