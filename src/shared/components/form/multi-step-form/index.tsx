import useControlledState from "@/shared/hooks/use-controlled-state";
import { cn } from "@/shared/lib/utils";
import { getSchemaFields } from "@/shared/lib/utils/form";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckLine,
} from "@remixicon/react";
import { useCallback, useRef, type ReactNode } from "react";
import {
  FormProvider,
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import { type ZodType } from "zod";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import Spinner from "../../ui/spinner";
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "../../ui/stepper";

export type Step = {
  title: string;
  icon: ReactNode;
  content: ReactNode;
};

type MultiStepFormProps<T extends FieldValues> = {
  step?: number;
  setStep?: React.Dispatch<React.SetStateAction<number>>;
  steps: Step[];
  schemas: ZodType[];
  form: UseFormReturn<T>;
  onStepComplete?: (step: number, data: T) => boolean | Promise<boolean>;
  onComplete?: (data: T) => void | Promise<void>;
  stickyFooter?: boolean;
  footerClassName?: string;
};

const MultiStepForm = <T extends FieldValues>({
  step,
  setStep,
  steps,
  schemas,
  form,
  onStepComplete,
  onComplete,
  stickyFooter = true,
  footerClassName,
}: MultiStepFormProps<T>) => {
  const stepCount = steps.length;

  const topRef = useRef<HTMLDivElement>(null);

  const isSubmitting = form.formState.isSubmitting;

  const { value: currentStep, onChange: setCurrentStep } = useControlledState({
    defaultValue: 0,
    value: step,
    onChange: setStep,
  });

  const isLastStep = currentStep === stepCount - 1;

  const handleScrollToTop = useCallback(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({
        block: "end",
      });
    }
  }, []);

  const goToStep = useCallback(
    async (step: number) => {
      const targetStep = Math.max(0, Math.min(step, stepCount - 1));

      if (targetStep === currentStep) return true;

      let canProcced = targetStep < currentStep;

      if (targetStep > currentStep) {
        await form.handleSubmit(
          async (data) => {
            for (let i = currentStep; i < targetStep; i++) {
              const result = await onStepComplete?.(i, data);

              if (result) {
                canProcced = true;
              } else {
                canProcced = false;
                setCurrentStep(i);
                handleScrollToTop();
                break;
              }
            }
          },
          async (errors) => {
            for (let i = currentStep; i < targetStep; i++) {
              const stepFields = getSchemaFields<T>(schemas[i]);

              const stepHasErrors = stepFields.some((field) => field in errors);

              let isStepCompleted = !stepHasErrors;

              if (!stepHasErrors) {
                const result = await onStepComplete?.(i, form.getValues());
                console.log("result :", result);
                isStepCompleted = !!result;
              }

              if (isStepCompleted) {
                canProcced = true;
              } else {
                canProcced = false;
                setCurrentStep(i);
                handleScrollToTop();
                break;
              }
            }
          }
        )();
      }

      if (!canProcced) return false;

      setCurrentStep(targetStep);
      form.clearErrors();
      handleScrollToTop();

      return true;
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

  const goToPrev = useCallback(() => {
    setCurrentStep(Math.max(currentStep - 1, 0));
    handleScrollToTop();
  }, [handleScrollToTop, setCurrentStep, currentStep]);

  const handleSubmit: SubmitHandler<T> = async (data) => {
    await onComplete?.(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div ref={topRef} />

        <Stepper
          value={currentStep}
          onValueChange={goToStep}
          indicators={{
            completed: <RiCheckLine />,
            loading: <Spinner />,
          }}
          className="relative space-y-4"
        >
          <StepperNav className="gap-3">
            {steps.map((step, index) => (
              <StepperItem
                key={`${index}-${step.title}-stepper`}
                step={index}
                className="relative items-start"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                <StepperTrigger className="flex grow flex-col items-start justify-center gap-2.5 outline-none">
                  <StepperIndicator className="data-[state=inactive]:border-border data-[state=inactive]:text-muted-foreground data-[state=completed]:bg-success size-10 border-2 data-[state=completed]:text-white data-[state=inactive]:bg-transparent [&_svg:not([class*='size-'])]:size-5">
                    {step.icon}
                  </StepperIndicator>
                  <div className="flex flex-col items-start gap-1">
                    <div className="text-muted-foreground text-[10px] font-semibold uppercase">
                      Step {index + 1}
                    </div>
                    <StepperTitle className="group-data-[state=inactive]/step:text-muted-foreground text-start text-base font-semibold">
                      {step.title}
                    </StepperTitle>
                    <div>
                      <Badge
                        size="sm"
                        variant="primary-light"
                        className="hidden group-data-[state=active]/step:inline-flex"
                      >
                        In Progress
                      </Badge>
                      <Badge
                        variant="success-light"
                        size="sm"
                        className="hidden group-data-[state=completed]/step:inline-flex"
                      >
                        Completed
                      </Badge>
                      <Badge
                        variant="secondary"
                        size="sm"
                        className="text-muted-foreground hidden group-data-[state=inactive]/step:inline-flex"
                      >
                        Pending
                      </Badge>
                    </div>
                  </div>
                </StepperTrigger>
                {index < steps.length - 1 && (
                  <StepperSeparator className="group-data-[state=completed]/step:bg-success absolute inset-x-0 start-12 top-4 m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-3rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" />
                )}
              </StepperItem>
            ))}
          </StepperNav>

          <StepperPanel
            className={cn(
              "text-sm",
              isSubmitting && "pointer-events-none opacity-50"
            )}
          >
            {steps.map((step, index) => (
              <StepperContent
                key={`${index}-${step.title}-content`}
                value={index}
              >
                {step.content}
              </StepperContent>
            ))}
          </StepperPanel>

          <div
            className={cn(
              "flex flex-1 justify-between gap-2 border-t py-4",
              stickyFooter && "bg-background sticky bottom-0",
              footerClassName
            )}
          >
            {currentStep > 0 ? (
              <StepperItem step={currentStep - 1} className="flex-none!">
                <StepperTrigger
                  type="button"
                  disabled={isSubmitting}
                  onClick={goToPrev}
                >
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                  >
                    <RiArrowLeftLine />
                    Previous
                  </Button>
                </StepperTrigger>
              </StepperItem>
            ) : (
              <div />
            )}
            {isLastStep ? (
              <Button type="submit" disabled={isSubmitting} className="ml-auto">
                {isSubmitting && <Spinner />} Submit
              </Button>
            ) : (
              <Button
                type="button"
                disabled={isSubmitting}
                className="ml-auto"
                onClick={() => goToStep(currentStep + 1)}
              >
                Next
                <RiArrowRightLine />
              </Button>
            )}
          </div>
        </Stepper>
      </form>
    </FormProvider>
  );
};

export default MultiStepForm;
