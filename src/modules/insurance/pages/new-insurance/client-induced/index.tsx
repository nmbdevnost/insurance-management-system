import { createClientInducedInsurance } from "@/modules/insurance/lib/mutations/insurance-mutations";
import {
  ClientInducedSchema,
  defaultClientInducedValues,
  type ClientInducedFormData,
} from "@/modules/insurance/lib/schemas/client-induced-schema";
import MultiStepForm from "@/shared/components/form/multi-step-form";
import { Typography } from "@/shared/components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiEye2Line, RiUser2Line } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import PolicyDetailsStep from "./steps/policy-details-step";

const steps = [
  {
    id: "policy-details",
    title: "Policy Details",
    icon: <RiUser2Line />,
    content: <PolicyDetailsStep />,
  },
  {
    id: "review",
    title: "Review & Submit",
    icon: <RiEye2Line />,
    content: <PolicyDetailsStep mode="view" />,
  },
];

const ClientInducedPage = () => {
  const [step, setStep] = useState(0);

  const form = useForm<ClientInducedFormData>({
    resolver: zodResolver(ClientInducedSchema),
    defaultValues: defaultClientInducedValues,
  });

  const createInsuranceMutaion = useMutation(createClientInducedInsurance);

  const handleSubmit: SubmitHandler<ClientInducedFormData> = async (data) => {
    createInsuranceMutaion.mutate(data, {
      onSuccess: () => {
        form.reset();
        setStep(0);
      },
    });
  };

  return (
    <div className="-mb-4 space-y-4">
      <div>
        <Typography variant="h3" as="h1">
          Client-Induced Insurance
        </Typography>
        <Typography muted>
          Record insurance policy details submitted by the client.
        </Typography>
      </div>

      <MultiStepForm
        step={step}
        setStep={setStep}
        steps={steps}
        form={form}
        schemas={[ClientInducedSchema]}
        isLoading={createInsuranceMutaion.isPending}
        onComplete={handleSubmit}
        footerClassName="-mx-4 px-4"
      />
    </div>
  );
};

export default ClientInducedPage;
