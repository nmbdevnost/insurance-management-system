/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckLine,
} from "@remixicon/react";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
  type Path,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import { z, ZodObject, type ZodRawShape } from "zod";
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

const get = (obj: any, path: string) =>
  path.split(".").reduce((acc, key) => acc?.[key], obj);

/**
 * A step configuration.
 * @template T - The shape of the whole form data.
 */
export type StepConfig<T extends FieldValues> = {
  title: string;
  schema?: ZodObject<ZodRawShape>;
  icon?: React.ReactNode;
  /**
   * Render fields for this step.
   * Accepts the full typed form instance.
   */
  fields: (form: UseFormReturn<T>, step: number) => React.ReactNode;
  /**
   * Optional API call when leaving this step (moving forward).
   * Receives current form data and should return true on success.
   * If it returns false or throws, navigation will be blocked.
   * ⚠️ This will run ONLY if at least one field in the step has been changed
   *    since the last successful submission (or initial load).
   */
  onStepSubmit?: (data: T, form: UseFormReturn<T>) => Promise<boolean>;
};

type MultiStepFormProps<T extends FieldValues> = {
  defaultValues?: DefaultValues<T>;
  steps: StepConfig<T>[];
  onSubmit: SubmitHandler<T>;
  footerClassName?: string;
  stickyFooter?: boolean;
};

const MultiStepForm = <T extends FieldValues>({
  defaultValues,
  steps,
  onSubmit,
  footerClassName,
  stickyFooter = true,
}: MultiStepFormProps<T>) => {
  const [mode, setMode] = useState<
    "onSubmit" | "onBlur" | "onChange" | "onTouched" | "all" | undefined
  >("onSubmit");

  const [currentStep, setCurrentStep] = useState(0);
  const [isStepSubmitting, setIsStepSubmitting] = useState(false);

  const formTopRef = useRef<HTMLDivElement>(null);

  // Merge all step schemas into one for full form validation
  const fullSchema = useMemo(() => {
    // Collect all schemas that actually exist
    const schemas = steps
      .map((step) => step.schema)
      .filter(Boolean) as ZodObject<ZodRawShape>[];

    if (schemas.length === 0) {
      return z.object({}); // fallback empty schema
    }

    // Merge all shapes into one
    const mergedShape = schemas.reduce<ZodRawShape>(
      (acc, schema) => ({ ...acc, ...schema.shape }),
      {}
    );

    return z.object(mergedShape);
  }, [steps]);

  const form = useForm({
    resolver: zodResolver(fullSchema as any),
    defaultValues,
    mode,
  });

  const {
    handleSubmit,
    trigger,
    getValues,
    formState: { isValid, isSubmitting, dirtyFields },
    resetField,
  } = form;

  // Memoise field names for each step (derived from step.schema)
  const stepFields = steps.map((step) =>
    step.schema ? Object.keys(step.schema.shape) : []
  );

  // Validate only fields belonging to a specific step
  const validateStep = useCallback(
    async (step: number) => {
      const schema = steps[step]?.schema;
      if (!schema) return true;

      const fieldsToValidate = Object.keys(schema.shape);
      const isValid = await trigger(fieldsToValidate as Path<T>[]);
      if (isValid) {
        // Do something here
        setMode("onSubmit"); // Change validation mode to onSubmit(To Default one)
      } else {
        setMode("onChange"); // If not valid change the mode to onChange
      }
      return isValid;
    },
    [steps, trigger]
  );

  // Helper: check if a specific field (including nested) is dirty
  const isFieldDirty = useCallback(
    (field: string): boolean => {
      const dirtyValue = get(dirtyFields, field);
      if (typeof dirtyValue === "boolean") return dirtyValue;
      // If it's an object, it means at least one nested field is dirty
      if (dirtyValue && typeof dirtyValue === "object") {
        return Object.keys(dirtyValue).length > 0;
      }
      return false;
    },
    [dirtyFields]
  );

  /**
   * Execute onStepSubmit only if the step has any dirty field.
   * After successful submission, reset dirty state for all fields of this step.
   */
  const executeStepSubmit = useCallback(
    async (step: number): Promise<boolean> => {
      const stepConfig = steps[step];
      if (!stepConfig?.onStepSubmit) return true;

      const fields = stepFields[step];
      const isStepDirty = fields.some(isFieldDirty);

      // No changes → skip the API call entirely
      if (!isStepDirty) return true;

      setIsStepSubmitting(true);

      try {
        const currentData = getValues();
        const isSuccess = await stepConfig.onStepSubmit(currentData, form);

        // On success, reset dirty state for all fields of this step
        if (isSuccess) {
          fields.forEach((field) => {
            resetField(field as Path<T>, {
              defaultValue: getValues(field as Path<T>),
            });
          });
        }
        return isSuccess;
      } finally {
        setIsStepSubmitting(false);
      }
    },
    [steps, stepFields, getValues, form, resetField, isFieldDirty]
  );

  /**
   * Navigate to a target step with proper validation.
   * Returns true if navigation was successful, false otherwise.
   */
  const goToStep = useCallback(
    async (targetStep: number): Promise<boolean> => {
      if (targetStep === currentStep) return true;

      if (targetStep < currentStep) {
        setCurrentStep(targetStep);
        return true;
      }

      for (let step = currentStep; step < targetStep; step++) {
        // Validate current step before moving forward
        console.log("validating step :", step);
        const isValidStep = await validateStep(step);

        if (!isValidStep) {
          return false;
        }

        const fields = stepFields[step];
        form.clearErrors(fields);

        // Execute step submission if defined (skipped if no changes)
        const stepSubmitted = await executeStepSubmit(step);
        if (!stepSubmitted) {
          return false;
        }
      }

      // Smooth scroll to top of form after successful step transition
      if (formTopRef.current) {
        formTopRef.current.scrollIntoView({
          block: "center",
          inline: "start",
        });
      }

      setCurrentStep(targetStep);
      return true;
    },
    [currentStep, validateStep, executeStepSubmit, form, stepFields]
  );

  const handleStepChange = async (step: number) => {
    await goToStep(step);
  };

  const onFormSubmit: SubmitHandler<T> = async (data) => {
    if (currentStep === steps.length - 1) {
      await onSubmit(data);
    }
  };

  const isProcessing = isStepSubmitting || isSubmitting;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className={cn("relative", isStepSubmitting && "pointer-events-none")}
      >
        <div ref={formTopRef}></div>

        {/* Processing Overlay */}
        {isStepSubmitting && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50">
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
                key={index + step.title + "-nav"}
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

                {steps.length > index + 1 && (
                  <StepperSeparator className="group-data-[state=completed]/step:bg-success absolute inset-x-0 start-12 top-4 m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-3rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" />
                )}
              </StepperItem>
            ))}
          </StepperNav>

          <StepperPanel className="text-sm">
            {steps.map((step, index) => (
              <StepperContent
                key={index + step.title + "-content"}
                value={index}
              >
                {step.fields(form, index)}
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
            {currentStep > 0 && (
              <StepperItem step={currentStep - 1} className="flex-none!">
                <StepperTrigger
                  disabled={currentStep === 0 || isProcessing}
                  type="button"
                >
                  <Button
                    type="button"
                    variant="outline"
                    disabled={currentStep === 0 || isProcessing}
                  >
                    <RiArrowLeftLine />
                    Previous
                  </Button>
                </StepperTrigger>
              </StepperItem>
            )}
            {currentStep === steps.length - 1 ? (
              <Button
                type="submit"
                disabled={!isValid || isProcessing}
                className="ml-auto"
              >
                {isSubmitting && <Spinner />} Submit
              </Button>
            ) : (
              <StepperItem step={currentStep + 1} className="ml-auto">
                <StepperTrigger disabled={isProcessing}>
                  <Button type="button" disabled={isProcessing}>
                    Next
                    <RiArrowRightLine />
                  </Button>
                </StepperTrigger>
              </StepperItem>
            )}
          </div>
        </Stepper>
      </form>
    </FormProvider>
  );
};

export default MultiStepForm;
