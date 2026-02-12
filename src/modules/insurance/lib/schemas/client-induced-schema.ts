import { z } from "zod";

export const ClientInducedSchema = z
  .object({
    branchId: z.string().nonempty("Branch ID is required"),
    segment: z.string().nonempty("Segment is required"),

    province: z.string().nonempty("Province is required"),

    losId: z
      .string()
      .nonempty("LOS ID is required")
      .regex(/^\d+$/, "LOS ID must be a valid number"),

    customerCifId: z.string().nonempty("Customer CIF ID is required"),

    policyNumber: z
      .string()
      .nonempty("Policy Number is required")
      .regex(/^\d+$/, "Policy Number must contain only numbers")
      .min(7, "Policy Number must be at least 7 digits"),

    insuranceCompany: z.string().nonempty("Insurance Company is required"),

    policyType: z.string().nonempty("Policy Type is required"),

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

    coverageAmount: z
      .string()
      .nonempty("Coverage Amount is required")
      .regex(/^\d+(\.\d{1,2})?$/, "Coverage Amount must be a valid number")
      .refine((val) => Number(val) > 0, {
        message: "Coverage Amount must be greater than 0",
      }),

    assetDetail: z.string().optional(),

    additionalRemarks: z.string().optional(),

    claimSupport: z.boolean().optional(),

    comprehensive: z.boolean().optional(),

    naturalDisasterDeath: z.boolean().optional(),

    theftProtection: z.boolean().optional(),
  })
  .refine(
    (data) => new Date(data.maturityEndDate) > new Date(data.riskStartDate),
    {
      message: "Maturity date must be after Risk Start Date",
      path: ["maturityEndDate"],
    }
  );

export type ClientInducedFormData = z.infer<typeof ClientInducedSchema>;

export const defaultClientInducedValues: ClientInducedFormData = {
  branchId: "",
  segment: "",
  province: "",
  losId: "",
  customerCifId: "",
  policyNumber: "",
  insuranceCompany: "",
  policyType: "",
  riskStartDate: "",
  maturityEndDate: "",
  coverageAmount: "",
  assetDetail: "",
  additionalRemarks: "",
  claimSupport: false,
  comprehensive: false,
  naturalDisasterDeath: false,
  theftProtection: false,
};
