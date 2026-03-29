import { GET, POST } from "@/shared/lib/api/api";
import type { BankInducedFormData } from "../schemas/bank-induced-schema";
import type { ClientInducedFormData } from "../schemas/client-induced-schema";
import type {
  AccountBalanceBody,
  AccountBalanceResponse,
  CreateInsuranceBody,
  CreateInsuranceResponse,
} from "../types/insurances";
import { createInsuranceFormData } from "../utils/form-data";

export const getInsurances = async (tableParams?: Record<string, unknown>) => {
  const page = (tableParams?.page as number) ?? 1;
  const pageSize = (tableParams?.pageSize as number) ?? 10;

  const skip = (page - 1) * pageSize;

  const url = new URL("https://dummyjson.com/todos");
  url.searchParams.set("limit", String(pageSize));
  url.searchParams.set("skip", String(skip));
  if (tableParams?.status)
    url.searchParams.set("status", String(tableParams.status));

  const response = await GET(url.toString());

  const data = response.data;

  return data;
};

export const createBankInducedInsurance = async (data: BankInducedFormData) => {
  const uploadedFiles = {
    valuationReport: data.valuationReport
      ? (data.valuationReport[0]?.file as File)
      : undefined,
  };

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
        constructionCompletionCertificate: undefined,
        fmv: Number(data.fairMarketValue),
        lorc: "",
        nameOfBuildingOwner: data.buildingOwner,
        noOfStorey: Number(data.noOfStorey),
        riskCoverage: data.riskCoverage,
        others: "",
        ownerType: "",
        plotNumber: data.plotNumber,
        sumInsured: Number(data.sumInsured),
        valuationReport: uploadedFiles.valuationReport,
      },
      insuranceProvider: data.insuranceProvider,
      losId: data.losId,
      name: data.clientName,
      policyType: data.policyType,
      province: data.province,
      segment: data.segment,
      uploadDocuments: [],
      vehicleAssetDetails: {
        blueBook: undefined,
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
        taxInvoice: undefined,
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

  const formData = createInsuranceFormData(requestData);

  const response = await POST<FormData, CreateInsuranceResponse>(
    "/insurance/policy",
    formData
  );

  return response.data;
};

export const createClientInducedInsurance = async (
  data: ClientInducedFormData
) => {
  const requestData: CreateInsuranceBody = {
    assetDetails: {
      branchId: Number(data.branchId),
      cifId: data.customerCifId,
      contactNumber: "",
      insuranceProvider: data.insuranceCompany,
      losId: data.losId,
      name: "",
      policyType: data.policyType,
      province: data.province,
      segment: data.segment,
      uploadDocuments: [],
      additionalRemarks: data.additionalRemarks,
      address: "",
      assetDetail: data.assetDetail,
      houseAssetDetails: {
        constructionCompletionCertificate: undefined,
        fmv: 0,
        lorc: "",
        noOfStorey: 0,
        others: "",
        ownerType: "",
        plotNumber: "",
        sumInsured: 0,
        buildingLocation: "",
        buildingType: "",
        nameOfBuildingOwner: "",
        riskCoverage: "",
        valuationReport: undefined,
      },
      vehicleAssetDetails: {
        blueBook: undefined,
        chassisNumber: "",
        color: "",
        engineNumber: "",
        manufacturedYear: 0,
        manufacturerCompany: "",
        modelName: "",
        ownerType: "",
        panVat: "",
        registration: "",
        sumInsured: 0,
        vehicleRegistrationNumber: "",
        vehicleType: "",
        taxInvoice: undefined,
      },
    },
    assetType: "",
    endDate: "",
    initiationType: "client",
    loanId: 0,
    nomineeName: "",
    nomineeRelationship: "",
    planId: 0,
    startDate: "",
    userId: 0,
  };

  const formData = createInsuranceFormData(requestData);

  const response = await POST<FormData, CreateInsuranceResponse>(
    "/insurance/policy",
    formData
  );

  return response.data;
};

export const checkAccountBalances = async (
  accountNumbers: AccountBalanceBody
) => {
  const response = await POST<
    { accounts: AccountBalanceBody },
    AccountBalanceResponse[]
  >("/account-inquiry/account-available-balance-details", {
    accounts: accountNumbers,
  });

  const responseCode = Number(response.data.response.responseCode);

  if (responseCode < 200 || responseCode >= 300) {
    throw new Error(response.data.response.responseMessage);
  }

  return response.data;
};
