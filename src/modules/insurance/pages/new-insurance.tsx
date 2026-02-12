import MultiStepForm from "@/shared/components/form/multi-step-form";
import { RiTestTubeLine } from "@remixicon/react";
import { toast } from "sonner";
import z from "zod";

const NewInsurancePage = () => {
  return (
    <div>
      <MultiStepForm
        steps={[
          {
            id: "policy-details",
            title: "Policy Details",
            icon: <RiTestTubeLine />,
            schema: z.object({}),
            fields: () => <>Policy Details</>,
          },
          {
            id: "asset-details",
            title: "Asset Details",
            icon: <RiTestTubeLine />,
            schema: z.object({}),
            fields: () => <>Asset Details</>,
          },
          {
            id: "payment-details",
            title: "Payment Details",
            icon: <RiTestTubeLine />,
            schema: z.object({
              policyNumber: z.string().min(1, "Policy number is required"),
              policyType: z.string().min(1, "Policy type is required"),
              policyStatus: z.string().min(1, "Policy status is required"),
              policyStartDate: z
                .string()
                .min(1, "Policy start date is required"),
              policyEndDate: z.string().min(1, "Policy end date is required"),
            }),
            fields: () => <>Payment Details</>,
          },
          {
            id: "test-details",
            title: "Test Details",
            icon: <RiTestTubeLine />,
            schema: z.object({}),
            fields: () => <>Payment Details</>,
          },
        ]}
        onSubmit={(data) => {
          console.log("🚀 ~ NewInsurancePage ~ data:", data);
          toast.success("Insurance created successfully");
        }}
        defaultValues={{
          "policy-details": {},
          "asset-details": {},
          "payment-details": {},
        }}
      />
    </div>
  );
};

export default NewInsurancePage;
