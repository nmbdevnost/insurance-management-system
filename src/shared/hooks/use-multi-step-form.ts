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
    async (targetStep: number): Promise<boolean> => {
      const clamped = Math.max(0, Math.min(targetStep, stepCount));
      if (clamped === currentStep) return true;

      // Backwards navigation is always allowed
      if (clamped < currentStep) {
        setCurrentStep(clamped);
        form.clearErrors();
        handleScrollToTop();
        return true;
      }

      // Forward → validate each intermediate step
      let canProceed = true;

      for (let i = currentStep; i < clamped; i++) {
        const fields = getSchemaFields<T>(schemas[i]);
        const isValid = await form.trigger(fields);

        if (!isValid) {
          canProceed = false;
          setCurrentStep(i);
          handleScrollToTop();
          break;
        }

        if (onStepComplete) {
          const result = await onStepComplete(i, form.getValues());
          if (!result) {
            canProceed = false;
            setCurrentStep(i);
            handleScrollToTop();
            break;
          }
        }
      }

      if (canProceed) {
        setCurrentStep(clamped);
        form.clearErrors();
        handleScrollToTop();
      }

      return canProceed;
    },
    [
      currentStep,
      setCurrentStep,
      stepCount,
      form,
      schemas,
      onStepComplete,
      handleScrollToTop,
    ]
  );

  const goToPrevious = useCallback(() => {
    setCurrentStep(Math.max(currentStep - 1, 0));
    handleScrollToTop();
  }, [currentStep, setCurrentStep, handleScrollToTop]);

  return { goToStep, goToPrevious };
}
