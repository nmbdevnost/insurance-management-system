import {
  defaultCombinedValues,
  PremiumQuerySchema,
  type CombinedFormData,
} from "@/modules/insurance/lib/schemas/bank-induced-schema";
import SimpleMultiStepForm from "@/shared/components/form/multi-step-form/simple-multi-step-form";
import { RiBankCard2Fill, RiCashLine, RiCommunityLine } from "@remixicon/react";
import { type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import AssetsDetailsStep from "./steps/assets-details-step";
import PaymentPolicyStep from "./steps/payment-policy-step";
import PremiumQueryStep from "./steps/premium-query-step";

const BankInducedForm = () => {
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

  const onSubmit: SubmitHandler<CombinedFormData> = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full">
      <h1 className="page-heading">Bank-Induced Insurance</h1>
      <p className="text-muted-foreground mb-4">
        Create and manage insurance policies provided by the bank
      </p>

      <SimpleMultiStepForm
        onSubmit={onSubmit}
        steps={[
          {
            title: "Asset Information",
            icon: <RiCommunityLine />,
            // schema: AssetDetailSchema,
            fields: () => <AssetsDetailsStep />,
            onStepSubmit: async (_data, form) => {
              const response = await onSubmitPolicyDetails();

              if (!response) return false;

              form.setValue("losId", response.losId);

              return true;
            },
          },
          {
            title: "Premium Query",
            icon: <RiCashLine />,
            schema: PremiumQuerySchema,
            fields: () => <PremiumQueryStep mode="" />,
          },
          {
            title: "Payment & Policy",
            icon: <RiBankCard2Fill />,
            fields: () => <PaymentPolicyStep />,
          },
        ]}
        defaultValues={defaultCombinedValues}
        footerClassName="-mb-4"
      />
    </div>
  );
};

export default BankInducedForm;
