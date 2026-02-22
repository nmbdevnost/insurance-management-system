import {
  ClientInducedSchema,
  defaultClientInducedValues,
  type ClientInducedFormData,
} from "@/modules/insurance/lib/schemas/client-induced-schema";
import MultiStepForm from "@/shared/components/form/multi-step-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiEye2Line, RiUser2Line } from "@remixicon/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import PolicyDetailsStep from "./steps/policy-details-step";
import { Typography } from "@/shared/components/ui/typography";

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
  const form = useForm<ClientInducedFormData>({
    resolver: zodResolver(ClientInducedSchema),
    defaultValues: defaultClientInducedValues,
  });

  const onSubmitPolicyDetails = async () => {
    const success = Math.random() > 0.3;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!success) {
      toast.error("An unexpected error occurred. Please try again.");
      return;
    }

    return {
      losId: "LOS-ID-API123",
    };
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
        steps={steps}
        form={form}
        schemas={[ClientInducedSchema]}
        onComplete={async (data) => {
          console.log("🚀 ~ BankInducedForm ~ data:", data);
        }}
        onStepComplete={async (step) => {
          console.log("🚀 ~ ClientInducedPage ~ step:", step);
          const result = await onSubmitPolicyDetails();

          if (!result) return false;

          return true;
        }}
        footerClassName="-mx-4 px-4"
      />
    </div>
  );
};

export default ClientInducedPage;
