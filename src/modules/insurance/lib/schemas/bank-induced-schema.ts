import { type FileWithPreview } from "@/shared/hooks/use-file-upload";
import { z } from "zod";

export const AssetDetailSchema = z.object({
  branchId: z.string().nonempty("Branch ID is required"),
  segment: z.string().nonempty("Segment is required"),
  province: z.string().nonempty("Province is required"),
  customerCifId: z.string().nonempty("Customer CIF ID is required"),
  losId: z
    .string()
    .nonempty("LOS ID is required")
    .regex(/^\d+$/, "LOS ID must be a valid number"),
  clientName: z.string().nonempty("Name is required"),
  policyType: z.string().nonempty("Policy Type is required"),
  contactNumber: z
    .string()
    .nonempty("Contact number is required")
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  address: z.string().optional(),
  plotNumber: z
    .string()
    .nonempty("Plot Number is required")
    .regex(/^\d+$/, "Plot Number must contain only numbers")
    .min(7, "Plot Number must be at least 7 digits"),
  buildingLocation: z.string().optional(),
  buildingOwner: z.string().optional(),
  noOfStorey: z
    .string()
    .optional()
    .refine((val) => !isNaN(Number(val)), {
      message: "No of Storey must contain only numbers",
    }),
  riskCoverage: z.string().optional(),
  buildingType: z.string().optional(),
  fairMarketValue: z.string().nonempty("Fair market value is required"),
  assetDetail: z.string().optional(),
  ownerType: z.enum(["individual", "company"]),
  additionalRemarks: z.string().optional(),
  valuationReport: z.custom<FileWithPreview[]>(),
  constructionCompletionCertificate: z.custom<FileWithPreview[]>(),
  lorc: z.custom<FileWithPreview[]>(),
  citizenship: z.custom<FileWithPreview[]>(),
});
export type AssetDetailFormData = z.infer<typeof AssetDetailSchema>;
export const defaultAssetDetailValues: AssetDetailFormData = {
  branchId: "",
  segment: "",
  province: "",
  customerCifId: "",
  losId: "",
  clientName: "",
  contactNumber: "",
  fairMarketValue: "",
  plotNumber: "",
  policyType: "",
  additionalRemarks: "",
  address: "",
  assetDetail: "",
  buildingLocation: "",
  buildingOwner: "",
  buildingType: "",
  noOfStorey: "",
  riskCoverage: "",
  valuationReport: [],
  ownerType: "individual",
  constructionCompletionCertificate: [],
  citizenship: [],
  lorc: [],
};

export const PremiumQuerySchema = z.object({
  policyType: z.string().nonempty("Policy Type is required"),
  insuranceProvider: z.string().nonempty("Insurance Provider is required"),
  sumInsured: z
    .string()
    .nonempty("Sum Insured is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Value must contain only number",
    }),
  insurancePremium: z
    .string()
    .nonempty("Insurance Premium is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Value must be in number",
    }),
  riskStartDate: z
    .string()
    .nonempty("Risk Start Date is required")
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid Risk Start Date",
    }),
  maturityEndDate: z
    .string()
    .nonempty("Maturity End Date is required")
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid Maturity End Date",
    }),
  assetDetail: z.string().optional(),
  claimSupport: z.boolean().optional(),
  comprehensive: z.boolean().optional(),
  naturalDisasterDeath: z.boolean().optional(),
  theftProtection: z.boolean().optional(),
  premiumAmount: z.number().optional(),
});

export type PremiumQueryFormData = z.infer<typeof PremiumQuerySchema>;
export const defaultPremiumQueryValues: PremiumQueryFormData = {
  insurancePremium: "",
  insuranceProvider: "",
  policyType: "",
  sumInsured: "",
  assetDetail: "",
  maturityEndDate: "",
  riskStartDate: "",
  claimSupport: false,
  comprehensive: false,
  naturalDisasterDeath: false,
  theftProtection: false,
};

export const bankInducedSchema = z.object({
  ...AssetDetailSchema.shape,
  ...PremiumQuerySchema.shape,
});

export type BankInducedFormData = z.infer<typeof bankInducedSchema>;

export const defaultBankInducedValues: BankInducedFormData = {
  ...defaultAssetDetailValues,
  ...defaultPremiumQueryValues,
};
