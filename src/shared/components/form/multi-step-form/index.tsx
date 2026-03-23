import useControlledState from "@/shared/hooks/use-controlled-state";
import { useMultiStepForm } from "@/shared/hooks/use-multi-step-form";
import { cn } from "@/shared/lib/utils";
import { RiCheckLine } from "@remixicon/react";
import { useCallback, useRef } from "react";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import { FormProvider, type FieldValues } from "react-hook-form";
import type { ZodType } from "zod";
import Spinner from "../../ui/spinner";
import {
  Stepper,
  StepperContent,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
} from "../../ui/stepper";
import { MultiStepFormFooter } from "./multi-step-form-footer";
import { MultiStepFormStepper, type Step } from "./multi-step-form-stepper";

export interface MultiStepFormProps<T extends FieldValues> {
  step?: number;
  setStep?: React.Dispatch<React.SetStateAction<number>>;
  steps: Step[];
  schemas: ZodType[];
  form: UseFormReturn<T>;
  onStepComplete?: (step: number, data: T) => boolean | Promise<boolean>;
  onComplete?: SubmitHandler<T>;
  stickyFooter?: boolean;
  footerClassName?: string;
  isLoading?: boolean;
  className?: string;
}

export default function MultiStepForm<T extends FieldValues>({
  step,
  setStep,
  steps,
  schemas,
  form,
  onStepComplete,
  onComplete,
  stickyFooter = true,
  footerClassName,
  isLoading = false,
  className,
}: MultiStepFormProps<T>) {
  const stepCount = steps.length - 1;
  const topRef = useRef<HTMLDivElement>(null);

  const isSubmitting = form.formState.isSubmitting || isLoading;

  const { value: currentStep, onChange: setCurrentStep } = useControlledState({
    defaultValue: 0,
    value: step,
    onChange: setStep,
  });

  const isLastStep = currentStep === stepCount;

  const scrollToTop = useCallback(() => {
    topRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, []);

  const { goToStep, goToPrevious } = useMultiStepForm({
    currentStep,
    setCurrentStep,
    stepCount,
    form,
    schemas,
    onStepComplete,
    handleScrollToTop: scrollToTop,
  });

  const handleNext = () => goToStep(currentStep + 1);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onComplete ?? (() => {}))}>
        <div ref={topRef} />

        <Stepper
          value={currentStep}
          onValueChange={goToStep}
          indicators={{
            completed: <RiCheckLine />,
            loading: <Spinner />,
          }}
          className="relative space-y-6"
        >
          <StepperNav className="gap-4">
            {steps.map((stepItem, idx) => {
              const isActive = idx === currentStep;
              const isCompleted = idx < currentStep;

              return (
                <StepperItem
                  key={`${idx}-${stepItem.title}`}
                  step={idx}
                  className="relative items-start"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  <MultiStepFormStepper
                    step={stepItem}
                    index={idx}
                    isActive={isActive}
                    isCompleted={isCompleted}
                  />

                  {idx < stepCount && (
                    <StepperSeparator
                      className={cn(
                        "absolute inset-x-0 start-12 top-5 m-0",
                        "group-data-[state=completed]/step:bg-success",
                        "group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-3rem)]",
                        "group-data-[orientation=horizontal]/stepper-nav:flex-none"
                      )}
                    />
                  )}
                </StepperItem>
              );
            })}
          </StepperNav>

          <StepperPanel
            className={cn(
              "text-sm",
              className,
              isSubmitting && "pointer-events-none opacity-60"
            )}
          >
            {steps.map((stepItem, idx) => (
              <StepperContent key={`${idx}-${stepItem.title}`} value={idx}>
                {stepItem.content}
              </StepperContent>
            ))}
          </StepperPanel>

          <div
            className={cn(
              "flex flex-1 justify-between gap-2 border-t py-5",
              stickyFooter &&
                "bg-background/80 sticky bottom-0 z-10 backdrop-blur-sm",
              footerClassName
            )}
          >
            <MultiStepFormFooter
              currentStep={currentStep}
              isLastStep={isLastStep}
              isSubmitting={isSubmitting}
              goToPrevious={goToPrevious}
              goToNext={handleNext}
            />
          </div>
        </Stepper>
      </form>
    </FormProvider>
  );
}
