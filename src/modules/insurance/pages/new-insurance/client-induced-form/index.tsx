import React from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PolicyDetailsStep from "./steps/policy-details-step";
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
} from "@/shared/components/ui/stepper";
import { RiCheckLine, RiEye2Line, RiUser2Line } from "@remixicon/react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  ClientInducedSchema,
  defaultClientInducedValues,
  type ClientInducedFormData,
} from "@/modules/insurance/lib/schemas/client-induced-schema";

const steps = [
  { title: "Policy Details", icon: RiUser2Line },
  { title: "Review & Submit", icon: RiEye2Line },
];
const ClientInducedForm = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const isValid = true;
  const methods = useForm<ClientInducedFormData>({
    resolver: zodResolver(ClientInducedSchema),
    defaultValues: defaultClientInducedValues,
  });

  const formSubmitHandler: SubmitHandler<ClientInducedFormData> = (data) => {
    console.log(data);
  };
  return (
    <div className="mx-auto w-full max-w-4xl">
      <h1 className="page-heading">Client-Induced Insurance</h1>
      <p className="text-muted-foreground mb-4">
        Record insurance policy details submitted by the client.
      </p>
      <Stepper
        value={currentStep}
        onValueChange={isValid ? setCurrentStep : undefined}
        indicators={{
          completed: <RiCheckLine />,
        }}
        className="space-y-8"
      >
        <StepperNav className="mb-5 gap-3">
          {steps.map((step, index) => {
            return (
              <StepperItem
                key={index}
                step={index + 1}
                className="relative flex-1 items-start"
              >
                <StepperTrigger
                  onClick={async (e) => {
                    e.preventDefault();

                    const targetStep = index + 1;

                    if (targetStep > currentStep) {
                      const isValid = await methods.trigger();
                      if (isValid) {
                        setCurrentStep(targetStep);
                      }
                    } else if (targetStep < currentStep) {
                      setCurrentStep(targetStep);
                    }
                  }}
                  className="flex grow flex-col items-start justify-center gap-2.5"
                >
                  <StepperIndicator className="data-[state=inactive]:border-border data-[state=inactive]:text-muted-foreground size-10 border-2 data-[state=completed]:bg-emerald-600 data-[state=completed]:text-white data-[state=inactive]:bg-transparent">
                    <step.icon className="size-5" />
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
                        variant="default"
                        className="hidden group-data-[state=active]/step:inline-flex"
                      >
                        In Progress
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="hidden bg-emerald-600 text-white group-data-[state=completed]/step:inline-flex"
                      >
                        Completed
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="text-muted-foreground hidden group-data-[state=inactive]/step:inline-flex"
                      >
                        Pending
                      </Badge>
                    </div>
                  </div>
                </StepperTrigger>
                {steps.length > index + 1 && (
                  <StepperSeparator className="absolute inset-x-0 start-12 top-4 m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-3rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none group-data-[state=completed]/step:bg-emerald-600" />
                )}
              </StepperItem>
            );
          })}
        </StepperNav>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
            <StepperPanel className="text-sm">
              <StepperContent value={1}>
                <PolicyDetailsStep />
              </StepperContent>
              <StepperContent value={2}>
                <PolicyDetailsStep mode="view" />
              </StepperContent>
            </StepperPanel>
            {currentStep === 1 && (
              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button
                  onClick={async () => {
                    // Trigger validation for all fields
                    const isValid = await methods.trigger();

                    // Only proceed to next step if validation passes
                    if (isValid) {
                      setCurrentStep((prev) => prev + 1);
                    }
                  }}
                  variant="default"
                  type="button"
                >
                  Continue to Review
                </Button>
              </div>
            )}
            {currentStep === 2 && (
              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                >
                  Back to Edit
                </Button>
                <Button type="submit" variant="default">
                  Submit Insurance Details
                </Button>
              </div>
            )}
          </form>
        </FormProvider>
      </Stepper>
    </div>
  );
};

export default ClientInducedForm;
