import {
  AssetDetailSchema,
  bankInducedSchema,
  defaultBankInducedValues,
  PremiumQuerySchema,
} from "@/modules/insurance/lib/schemas/bank-induced-schema";
import MultiStepForm from "@/shared/components/form/multi-step-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RiBuilding2Line,
  RiCalculatorLine,
  RiVipCrownLine,
} from "@remixicon/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AssetsDetailsStep from "./steps/assets-details-step";
import PaymentPolicyStep from "./steps/payment-policy-step";
import PremiumQueryStep from "./steps/premium-query-step";
import { Typography } from "@/shared/components/ui/typography";

const steps = [
  {
    id: "asset-detail",
    title: "Asset Detail",
    icon: <RiBuilding2Line />,
    content: <AssetsDetailsStep />,
  },
  {
    id: "premium-query",
    title: "Premium Query",
    icon: <RiVipCrownLine />,
    content: <PremiumQueryStep />,
  },
  {
    id: "premium-calculation",
    title: "Premium Calculation",
    icon: <RiCalculatorLine />,
    content: <PaymentPolicyStep />,
  },
];

const BankInducedPage = () => {
  const form = useForm({
    resolver: zodResolver(bankInducedSchema),
    defaultValues: defaultBankInducedValues,
  });

  const onSubmitPolicyDetails = async (failRate: number = 0.3) => {
    const success = Math.random() > failRate;

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
    <div className="-mb-4 w-full space-y-4">
      <div>
        <Typography variant="h3" as="h1">
          Bank-Induced Insurance
        </Typography>
        <Typography muted>
          Create and manage insurance policies provided by the bank
        </Typography>
      </div>

      <MultiStepForm
        steps={steps}
        form={form}
        schemas={[AssetDetailSchema, PremiumQuerySchema]}
        onComplete={async (data) => {
          console.log("🚀 ~ BankInducedPage ~ data:", data);
        }}
        onStepComplete={async (step) => {
          const result = await onSubmitPolicyDetails(step === 0 ? 0 : 0);

          if (!result) return false;

          return true;
        }}
        footerClassName="-mx-4 px-4"
      />
    </div>
  );
};

export default BankInducedPage;
