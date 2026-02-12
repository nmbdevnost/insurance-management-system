import { cn } from "@/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckLine,
} from "@remixicon/react";
import { useCallback, useRef, useState } from "react";
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
  type FieldErrors,
  type Path,
  type Resolver,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import type { ZodType } from "zod";

function pickStepErrors<T extends FieldValues>(
  errors: FieldErrors<T>,
  stepFields: Path<T>[] | undefined
): FieldErrors<T> {
  if (!stepFields?.length) return errors;
  const picked: FieldErrors<T> = {};
  for (const key of stepFields) {
    const err = (errors as Record<string, unknown>)[key as string];
    if (err != null) (picked as Record<string, unknown>)[key as string] = err;
  }
  return picked;
}
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

export type SimpleStepConfig<T extends FieldValues> = {
  id?: string;
  title: string;
  icon?: React.ReactNode;
  /** Zod schema for this step. Used by handleSubmit to validate before moving on. */
  schema?: ZodType<Partial<T>> | ZodType<T>;
  /** Fields that belong to this step. When set, only these fields are considered for validation (errors for other fields are ignored so only the current step can block Next). */
  stepFields?: Path<T>[];
  /** Render fields for this step. */
  fields: (
    form: UseFormReturn<T, unknown, T>,
    stepIndex: number
  ) => React.ReactNode;
  /** Runs after current step passes validation (e.g. call API, setValue for next step). Return false to block moving to next step. */
  onStepSubmit?: (
    data: T,
    form: UseFormReturn<T, unknown, T>
  ) => Promise<boolean | void> | boolean | void;
};

export type SimpleMultiStepFormProps<T extends FieldValues> = {
  defaultValues?: DefaultValues<T>;
  steps: SimpleStepConfig<T>[];
  onSubmit: SubmitHandler<T>;
  footerClassName?: string;
  stickyFooter?: boolean;
};

/**
 * Multi-step form with its own logic: validates only via handleSubmit (no manual trigger).
 * - Next: validates current step, runs onStepSubmit, then advances.
 * - Submit: validates last step and runs onSubmit.
 * Uses mode "onSubmit" and reValidateMode "onChange".
 */
function SimpleMultiStepForm<T extends FieldValues>({
  defaultValues,
  steps,
  onSubmit,
  footerClassName,
  stickyFooter = true,
}: SimpleMultiStepFormProps<T>) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isStepSubmitting, setIsStepSubmitting] = useState(false);
  const formTopRef = useRef<HTMLDivElement>(null);
  /** When set, resolver validates this step (used when navigating via stepper nav). */
  const stepValidationTargetRef = useRef<number | null>(null);

  const stepResolver: Resolver<T> = useCallback(
    async (values, context, options) => {
      const stepIndex = stepValidationTargetRef.current ?? currentStep;
      const stepConfig = steps[stepIndex];
      const schema = stepConfig?.schema;
      if (!schema) return { values, errors: {} } as ReturnType<Resolver<T>>;
      const resolve = zodResolver(
        schema as Parameters<typeof zodResolver>[0]
      ) as Resolver<T>;
      const result = await resolve(values, context, options);
      // Keep full form values; only report errors for this step's fields so only current step can block Next
      const errors = pickStepErrors(
        result.errors as FieldErrors<T>,
        stepConfig.stepFields
      );
      return { values, errors } as ReturnType<Resolver<T>>;
    },
    [currentStep, steps]
  );

  const form = useForm<T>({
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: stepResolver,
  });

  const { handleSubmit, formState } = form;
  const { isSubmitting } = formState;
  const isProcessing = isStepSubmitting || isSubmitting;

  const runStepSubmitIfNeeded = useCallback(
    async (stepIndex: number, data: T): Promise<boolean> => {
      const stepConfig = steps[stepIndex];
      if (!stepConfig?.onStepSubmit) return true;
      setIsStepSubmitting(true);
      try {
        const result = await stepConfig.onStepSubmit(
          data,
          form as UseFormReturn<T, unknown, T>
        );
        if (result === false) return false;
        return true;
      } finally {
        setIsStepSubmitting(false);
      }
    },
    [steps, form]
  );

  const goToPrevStep = useCallback(() => {
    if (currentStep <= 0) return;
    setCurrentStep((s) => s - 1);
    formTopRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [currentStep]);

  const handleNext = useCallback(
    async (data: T) => {
      const success = await runStepSubmitIfNeeded(currentStep, data);
      if (!success) return;
      setCurrentStep((s) => s + 1);
      formTopRef.current?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    },
    [currentStep, runStepSubmitIfNeeded]
  );

  const handleStepChange = useCallback(
    (newStep: number) => {
      if (newStep <= currentStep) {
        setCurrentStep(newStep);
        formTopRef.current?.scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
        return;
      }

      // Moving forward: validate each step in order via handleSubmit, then advance
      const runSteps = async () => {
        for (let s = currentStep; s < newStep; s++) {
          stepValidationTargetRef.current = s;
          const success = await new Promise<boolean>((resolvePromise) => {
            form.handleSubmit(
              async (data) => {
                stepValidationTargetRef.current = null;
                const success = await runStepSubmitIfNeeded(s, data);
                if (!success) {
                  resolvePromise(false);
                  return;
                }
                setCurrentStep(s + 1);
                resolvePromise(true);
              },
              () => {
                stepValidationTargetRef.current = null;
                resolvePromise(false);
              }
            )();
          });
          if (!success) return;
        }
        setCurrentStep(newStep);
        formTopRef.current?.scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
      };
      runSteps();
    },
    [currentStep, form, runStepSubmitIfNeeded]
  );

  const isLastStep = currentStep === steps.length - 1;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(isLastStep ? onSubmit : handleNext)}
        className={cn("relative", isStepSubmitting && "pointer-events-none")}
      >
        <div ref={formTopRef} aria-hidden />

        {isStepSubmitting && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 dark:bg-black/20">
            <Spinner className="text-primary size-10" />
          </div>
        )}

        <Stepper
          value={currentStep}
          onValueChange={handleStepChange}
          indicators={{
            completed: <RiCheckLine className="size-3.5" />,
            loading: <Spinner className="size-3.5" />,
          }}
          className="relative space-y-4"
        >
          <StepperNav className="gap-3">
            {steps.map((step, index) => (
              <StepperItem
                key={step.id ?? `${index}-${step.title}`}
                step={index}
                className="relative items-start"
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

          <StepperPanel className="text-sm">
            {steps.map((step, index) => (
              <StepperContent
                key={step.id ?? `${index}-${step.title}`}
                value={index}
              >
                {step.fields(form as UseFormReturn<T, unknown, T>, index)}
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
                  disabled={isProcessing}
                  onClick={goToPrevStep}
                >
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isProcessing}
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
              <Button type="submit" disabled={isProcessing} className="ml-auto">
                {isSubmitting && <Spinner />} Submit
              </Button>
            ) : (
              <Button type="submit" disabled={isProcessing} className="ml-auto">
                Next
                <RiArrowRightLine />
              </Button>
            )}
          </div>
        </Stepper>
      </form>
    </FormProvider>
  );
}

export default SimpleMultiStepForm;
