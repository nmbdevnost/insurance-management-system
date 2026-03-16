import { FormFieldInput } from "@/shared/components/form/form-fields";
import { useFormContext } from "react-hook-form";
import type { InsuranceCompanyFormValues } from "../../lib/schemas/insurance-company-schema";
import {
  FieldGroup,
  FieldLegend,
  FieldSeparator,
} from "@/shared/components/ui/field";

const InsuranceCompanyForm = () => {
  const form = useFormContext<InsuranceCompanyFormValues>();

  return (
    <>
      <FieldGroup>
        <FieldLegend>Company Details</FieldLegend>

        <div className="grid gap-4 md:grid-cols-2">
          <FormFieldInput
            control={form.control}
            name="companyName"
            label="Company Name"
            placeholder="Enter company name"
          />

          <FormFieldInput
            control={form.control}
            name="accountNumber"
            label="Account Number"
            placeholder="Enter company account number"
          />

          <FormFieldInput
            control={form.control}
            name="address"
            label="Address"
            placeholder="Enter company address"
          />
        </div>
      </FieldGroup>

      <FieldSeparator />

      <FieldGroup>
        <FieldLegend>Contact Details</FieldLegend>

        <div className="grid gap-4 md:grid-cols-2">
          <FormFieldInput
            control={form.control}
            name="phoneNumber"
            label="Phone Number"
            placeholder="Enter company phone number"
          />

          <FormFieldInput
            control={form.control}
            name="contactPersonOne"
            label="Contact Person One"
            placeholder="Enter contact person one"
          />

          <FormFieldInput
            control={form.control}
            name="contactPersonTwo"
            label="Contact Person Two"
            placeholder="Enter contact person two"
          />
        </div>
      </FieldGroup>
    </>
  );
};

export default InsuranceCompanyForm;
