import React from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import AssetsDetailsStep from "./steps/assets-details-step";
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
import { Button } from "@/shared/components/ui/button";
import {
  RiBankCard2Fill,
  RiCashLine,
  RiCheckLine,
  RiCommunityLine,
} from "@remixicon/react";
import { Badge } from "@/shared/components/ui/badge";
import PremiumQueryStep from "./steps/premium-query-step";
import {
  CombinedSchema,
  defaultCombinedValues,
  type CombinedFormData,
} from "@/modules/insurance/lib/schemas/bank-induced-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import PaymentPolicyStep from "./steps/payment-policy-step";

const steps = [
  {
    title: "Assets Details",
    icon: RiCommunityLine,
  },
  {
    title: "Premium Query",
    icon: RiCashLine,
  },
  {
    title: "Payment & Policy",
    icon: RiBankCard2Fill,
  },
];
const BankInducedForm = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const methods = useForm<CombinedFormData>({
    resolver: zodResolver(CombinedSchema),
    defaultValues: defaultCombinedValues,
    mode: "onChange",
  });
  const isValid = true;

  const formSubmitHandler: SubmitHandler<CombinedFormData> = (data) => {
    console.log(data);
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <h1 className="page-heading">Bank-Induced Insurance</h1>
      <p className="text-muted-foreground mb-4">
        Create and manage insurance policies provided by the bank
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
                className="relative items-start"
              >
                <StepperTrigger className="flex grow flex-col items-start justify-center gap-2.5">
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
                <AssetsDetailsStep />
              </StepperContent>
              <StepperContent value={2}>
                <PremiumQueryStep mode="" />
              </StepperContent>
              <StepperContent value={3}>
                <PaymentPolicyStep />
              </StepperContent>
            </StepperPanel>

            {currentStep === 1 && (
              <div className="my-5 flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button variant="default">Get Premium Quote</Button>
              </div>
            )}
            {currentStep === 2 && (
              <div className="my-5 flex justify-end gap-4">
                <Button variant="outline">Back to Edit</Button>
                <Button variant="outline">Send to Customer</Button>
                <Button variant="default">Proceed to Payment</Button>
              </div>
            )}
          </form>
        </FormProvider>
      </Stepper>
    </div>
  );
};

export default BankInducedForm;
