import {
  ClientInducedSchema,
  defaultClientInducedValues,
  type ClientInducedFormData,
} from "@/modules/insurance/lib/schemas/client-induced-schema";
import SimpleMultiStepForm from "@/shared/components/form/multi-step-form/simple-multi-step-form";
import { RiEye2Line, RiUser2Line } from "@remixicon/react";
import { type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PolicyDetailsStep from "./steps/policy-details-step";

const ClientInducedForm = () => {
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

  const onSubmit: SubmitHandler<ClientInducedFormData> = (data) => {
    console.log(data);
  };

  return (
    <>
      <div>
        <h1 className="page-heading">Client-Induced Insurance</h1>
        <p className="text-muted-foreground mb-4">
          Record insurance policy details submitted by the client.
        </p>
      </div>

      <SimpleMultiStepForm
        onSubmit={onSubmit}
        steps={[
          {
            title: "Policy Details",
            icon: <RiUser2Line />,
            schema: ClientInducedSchema,
            fields: () => <PolicyDetailsStep />,
            onStepSubmit: async (_data, form) => {
              const response = await onSubmitPolicyDetails();

              if (!response) return false;

              form.setValue("losId", response.losId);

              return true;
            },
          },
          {
            title: "Review & Submit",
            icon: <RiEye2Line />,
            schema: ClientInducedSchema,
            fields: () => <PolicyDetailsStep mode="view" />,
          },
        ]}
        defaultValues={defaultClientInducedValues}
        footerClassName="-mb-4"
      />
    </>
  );
};

export default ClientInducedForm;
