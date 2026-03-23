import { createInsurance } from "@/modules/insurance/lib/mutations/insurance-mutations";
import {
  AssetDetailSchema,
  bankInducedSchema,
  defaultBankInducedValues,
  PremiumQuerySchema,
  type BankInducedFormData,
} from "@/modules/insurance/lib/schemas/bank-induced-schema";
import type { CreateInsuranceBody } from "@/modules/insurance/lib/types/insurances";
import MultiStepForm from "@/shared/components/form/multi-step-form";
import { Typography } from "@/shared/components/ui/typography";
import { toBase64 } from "@/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RiBuilding2Line,
  RiCalculatorLine,
  RiVipCrownLine,
} from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import AssetsDetailsStep from "./steps/assets-details-step";
import PaymentPolicyStep from "./steps/payment-policy-step";
import PremiumQueryStep from "./steps/premium-query-step";

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
  const [step, setStep] = useState(0);

  const form = useForm<BankInducedFormData>({
    resolver: zodResolver(bankInducedSchema),
    defaultValues: defaultBankInducedValues,
  });

  const createInsuranceMutaion = useMutation(createInsurance);

  const handleSubmit: SubmitHandler<BankInducedFormData> = async (data) => {
    const valuationReport = data?.valuationReport[0]?.file;
    const valuationReportBase64 =
      valuationReport instanceof File
        ? await toBase64(valuationReport)
        : undefined;

    const requestData: CreateInsuranceBody = {
      assetDetails: {
        additionalRemarks: data.additionalRemarks,
        address: data.address,
        assetDetail: data.assetDetail,
        branchId: Number(data.branchId),
        cifId: data.customerCifId,
        contactNumber: data.contactNumber,
        houseAssetDetails: {
          buildingLocation: data.buildingLocation,
          buildingType: data.buildingType,
          constructionCompletionCertificate: "",
          fmv: Number(data.fairMarketValue),
          lorc: "",
          nameOfBuildingOwner: data.buildingOwner,
          noOfStorey: Number(data.noOfStorey),
          riskCoverage: data.riskCoverage,
          others: "",
          ownerType: "",
          plotNumber: data.plotNumber,
          sumInsured: Number(data.sumInsured),
          valuationReport: valuationReportBase64,
        },
        insuranceProvider: data.insuranceProvider,
        losId: data.losId,
        name: data.clientName,
        policyType: data.policyType,
        province: data.province,
        segment: data.segment,
        uploadDocuments: [],
        vehicleAssetDetails: {
          blueBook: "",
          chassisNumber: "",
          color: "",
          engineNumber: "",
          manufacturedYear: 2000,
          manufacturerCompany: "",
          modelName: "",
          ownerType: "",
          panVat: "",
          registration: "",
          sumInsured: 0,
          taxInvoice: "",
          vehicleRegistrationNumber: "",
          vehicleType: "",
        },
      },
      assetType: "",
      endDate: "",
      initiationType: "bank",
      loanId: 11,
      nomineeName: "",
      nomineeRelationship: "",
      planId: 22,
      startDate: "",
      userId: 33,
    };

    createInsuranceMutaion.mutate(requestData, {
      onSuccess: () => {
        form.reset();
        setStep(0);
      },
    });
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
        step={step}
        setStep={setStep}
        steps={steps}
        form={form}
        schemas={[AssetDetailSchema, PremiumQuerySchema]}
        isLoading={createInsuranceMutaion.isPending}
        onComplete={handleSubmit}
        footerClassName="-mx-4 px-4"
      />
    </div>
  );
};

export default BankInducedPage;
