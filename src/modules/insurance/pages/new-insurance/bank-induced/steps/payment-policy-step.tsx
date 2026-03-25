import type { BankInducedFormData } from "@/modules/insurance/lib/schemas/bank-induced-schema";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { FieldDescription, FieldLegend } from "@/shared/components/ui/field";
import { insuranceProviderOptions } from "@/shared/lib/constants/options";
import { RiInformationFill } from "@remixicon/react";
import { useFormContext } from "react-hook-form";

const PaymentPolicyStep = () => {
  const form = useFormContext<BankInducedFormData>();

  const customerName = form.getValues("clientName");
  const customerCifId = form.getValues("customerCifId");
  const premiumAmount = form.getValues("insurancePremium");
  const insuranceProviderId = form.getValues("insuranceProvider");

  const insuranceProvider = insuranceProviderOptions?.find(
    (provider) => provider.value === insuranceProviderId
  )?.label;

  return (
    <div className="space-y-4">
      <FieldLegend>Payment & Policy Creation</FieldLegend>
      <FieldDescription>
        Process premium payment and creation insurance policy
      </FieldDescription>

      <Alert>
        <RiInformationFill />
        <AlertDescription>
          Premium will be debited from customer account and credited to
          insurance provider
        </AlertDescription>
      </Alert>

      <Card className="gap-2">
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/3">Customer Name:</div>
            <div>{customerName}</div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/3">Customer CIF ID:</div>
            <div className="font-mono">{customerCifId}</div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/3">Premium Amount:</div>
            <div>{premiumAmount}</div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/3">Insurance Provider:</div>
            <div>{insuranceProvider}</div>
          </div>
        </CardContent>
      </Card>

      <Card className="gap-2">
        <CardHeader>
          <CardTitle>Before Processing Payment</CardTitle>
        </CardHeader>

        <CardContent>
          <ul className="list-inside list-disc">
            <li>Customer account balance will be verified</li>
            <li>Premium amount will be debited from customer account</li>
            <li>Insurance provider account will be credited</li>
            <li>
              Customer KYC, Assets details and documents will be provided to
              insurance provider
            </li>
            <li>Policy number will be generated and stored</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPolicyStep;
