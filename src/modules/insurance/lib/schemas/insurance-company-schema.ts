import z from "zod";

export const insuranceCompanySchema = z.object({
  companyName: z.string().min(1, "Company name is required."),
  accountNumber: z.string().min(1, "Account number is required."),
  address: z.string().min(1, "Address is required."),
  email: z
    .string()
    .min(1, "Email is required.")
    .refine(
      (value) => {
        const isValid = z.safeParse(z.email(), value).success;

        return isValid;
      },
      {
        message: "Invalid email address.",
      }
    ),
  phoneNumber: z.string().min(1, "Phone number is required."),
  contactPersonOne: z
    .string()
    .min(1, "Atleast one contact person is required."),
  contactPersonTwo: z.string().optional(),
});

export type InsuranceCompanyFormValues = z.infer<typeof insuranceCompanySchema>;

export const defaultInsuranceCompanyValues: InsuranceCompanyFormValues = {
  companyName: "",
  accountNumber: "",
  address: "",
  contactPersonOne: "",
  contactPersonTwo: "",
  email: "",
  phoneNumber: "",
};
