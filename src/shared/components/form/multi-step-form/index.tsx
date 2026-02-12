/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckLine,
} from "@remixicon/react";
import { useCallback, useState } from "react";
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

/**
 * A step configuration.
 * @template T - The shape of the whole form data.
 */
type StepConfig<T extends FieldValues> = {
  id: string;
  title: string;
  schema: ZodObject<ZodRawShape>;
  icon?: React.ReactNode;
  /**
   * Render fields for this step.
   * Accepts the full typed form instance.
   */
  fields: (form: UseFormReturn<T>, step: number) => React.ReactNode;
};

type MultiStepFormProps<T extends FieldValues> = {
  defaultValues?: DefaultValues<T>;
  steps: StepConfig<T>[];
  onSubmit: SubmitHandler<T>;
};

const MultiStepForm = <T extends FieldValues>({
  defaultValues,
  steps,
  onSubmit,
}: MultiStepFormProps<T>) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Merge all step schemas into one for full form validation
  const fullSchema = steps.reduce(
    (acc, step) => acc.and(step.schema) as any,
    z.object({})
  );

  const form = useForm<T>({
    resolver: zodResolver(fullSchema) as any,
    defaultValues,
  });

  const {
    handleSubmit,
    trigger,
    formState: { isValid, isSubmitting },
  } = form;

  // Validate only fields belonging to a specific step
  const validateStep = useCallback(
    async (step: number) => {
      const schema = steps[step]?.schema;
      if (!schema) return true;
      const fieldsToValidate = Object.keys(schema.shape);
      return await trigger(fieldsToValidate as Path<T>[]);
    },
    [steps, trigger]
  );

  /**
   * Navigate to a target step with proper validation.
   * Returns true if navigation was successful, false otherwise.
   */
  const goToStep = async (targetStep: number): Promise<boolean> => {
    if (targetStep === currentStep) return true;

    // Going backwards – always allowed
    if (targetStep < currentStep) {
      setCurrentStep(targetStep);
      return true;
    }

    // Going forwards – validate every intermediate step sequentially
    for (let step = currentStep + 1; step <= targetStep; step++) {
      const isValidStep = await validateStep(step - 1); // validate the step *before* moving to it
      if (!isValidStep) {
        setCurrentStep(step - 1);
        return false;
      }
    }

    // All intermediate steps are valid
    setCurrentStep(targetStep);
    return true;
  };

  const nextStep = async () => {
    if (currentStep < steps.length - 1) {
      await goToStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle stepper value change (triggered by clicking on a step)
  const handleStepChange = async (step: number) => {
    await goToStep(step);
  };

  // Form submission – only allowed on the last step
  const onFormSubmit: SubmitHandler<T> = async (data) => {
    if (currentStep === steps.length - 1) {
      try {
        await onSubmit(data);
      } catch (error) {
        console.error("Form submission failed:", error);
        // Optionally show error toast/notification
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Stepper
          value={currentStep}
          onValueChange={handleStepChange}
          indicators={{
            completed: <RiCheckLine className="size-3.5" />,
            loading: <Spinner className="size-3.5" />,
          }}
          className="space-y-4"
        >
          <StepperNav className="gap-3">
            {steps.map((step, index) => (
              <StepperItem
                key={step.id}
                step={index}
                className="relative flex-1 items-start"
              >
                <StepperTrigger className="flex grow flex-col items-start justify-center gap-2.5 outline-none">
                  <StepperIndicator className="data-[state=inactive]:border-border data-[state=inactive]:text-muted-foreground data-[state=completed]:bg-success size-8 border-2 data-[state=completed]:text-white data-[state=inactive]:bg-transparent">
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

                <StepperSeparator className="group-data-[state=completed]/step:bg-success absolute inset-x-0 start-9 top-4 m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" />
                {steps.length === index + 1 && (
                  <StepperTrigger asChild>
                    <StepperIndicator className="data-[state=inactive]:bg-background data-[state=inactive]:border-border data-[state=inactive]:text-muted-foreground data-[state=completed]:bg-success size-8 border-2 data-[state=completed]:text-white">
                      <RiCheckLine />
                    </StepperIndicator>
                  </StepperTrigger>
                )}
              </StepperItem>
            ))}
          </StepperNav>

          <StepperPanel className="text-sm">
            {steps.map((step, index) => (
              <StepperContent
                key={step.id}
                value={index}
                className="flex items-center justify-center"
              >
                {step.fields(form, index)}
              </StepperContent>
            ))}
          </StepperPanel>

          <div className="flex flex-1 justify-between gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <RiArrowLeftLine />
              Previous
            </Button>
            {currentStep === steps.length - 1 ? (
              <Button type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            ) : (
              <Button type="button" onClick={nextStep}>
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
