import type { ClientInducedFormData } from "@/modules/insurance/lib/schemas/client-induced-schema";
import FormFieldCheckbox from "@/shared/components/form/form-fields/form-field-checkbox";
import FormFieldCombobox from "@/shared/components/form/form-fields/form-field-combobox";
import FormFieldInput from "@/shared/components/form/form-fields/form-field-input";
import FormFieldTextarea from "@/shared/components/form/form-fields/form-field-textarea";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/shared/components/ui/field";
import { useFormContext } from "react-hook-form";

const PolicyDetailsStep = ({ mode }: { mode?: string }) => {
  const { control } = useFormContext<ClientInducedFormData>();

  return (
    <FieldSet>
      <FieldLegend>
        {mode === "view"
          ? "Review Insurance Details"
          : "Insurance Policy Information"}
      </FieldLegend>

      <FieldDescription>
        {mode === "view"
          ? "Please review the information before submitting the form."
          : "Enter the details from the client's insurance policy copy"}
      </FieldDescription>

      {/* --- BASIC POLICY DETAILS --- */}
      <FieldGroup>
        <div className="flex gap-4">
          <FormFieldCombobox
            control={control}
            name="branchId"
            label="Branch ID"
            placeholder="Select a branch"
            options={[]}
            disabled={mode === "view"}
          />

          <FormFieldCombobox
            control={control}
            name="segment"
            label="Segment"
            placeholder="Select a segment"
            options={[]}
            disabled={mode === "view"}
          />
        </div>

        <div className="flex gap-4">
          <FormFieldCombobox
            control={control}
            name="province"
            label="Province"
            placeholder="Select a province"
            options={[]}
            disabled={mode === "view"}
          />

          <FormFieldInput
            control={control}
            name="losId"
            label="LOS ID"
            placeholder="Select LOS ID"
            disabled={mode === "view"}
          />
        </div>

        <div className="flex gap-4">
          <FormFieldInput
            control={control}
            name="customerCifId"
            label="Customer CIF ID"
            placeholder="Select Customer CIF ID"
            disabled={mode === "view"}
          />

          <FormFieldInput
            control={control}
            name="policyNumber"
            label="Policy Number"
            type="number"
            placeholder="Enter policy number"
            readOnly={mode === "view"}
          />
        </div>

        <div className="flex gap-4">
          <FormFieldCombobox
            control={control}
            name="insuranceCompany"
            label="Insurance Company"
            placeholder="Select insurance company"
            options={[]}
            disabled={mode === "view"}
          />

          <FormFieldCombobox
            control={control}
            name="policyType"
            label="Policy Type"
            placeholder="Select policy type"
            options={[]}
            disabled={mode === "view"}
          />
        </div>

        <div className="flex gap-4">
          <FormFieldInput
            control={control}
            name="riskStartDate"
            label="Risk Start Date"
            type="date"
            readOnly={mode === "view"}
          />

          <FormFieldInput
            control={control}
            name="maturityEndDate"
            label="Maturity End Date"
            type="date"
            readOnly={mode === "view"}
          />
        </div>
      </FieldGroup>

      {/* --- AMOUNT & REMARKS --- */}
      <FieldGroup>
        <div className="flex gap-4">
          <FormFieldInput
            control={control}
            name="coverageAmount"
            label="Coverage Amount"
            placeholder="Enter coverage amount"
            readOnly={mode === "view"}
            type="number"
          />

          <FormFieldInput
            control={control}
            name="additionalRemarks"
            label="Additional Remarks"
            type="textarea"
            placeholder="Any additional information"
            readOnly={mode === "view"}
          />
        </div>
      </FieldGroup>

      {/* --- RISK COVERAGE --- */}
      <FieldGroup>
        <div className="flex gap-6">
          <div className="w-full space-y-2">
            <FieldLegend className="font-bold">
              Risk Coverage Details
            </FieldLegend>

            <FieldGroup>
              {[
                {
                  name: "naturalDisasterDeath",
                  label: "Natural Disaster Death",
                },
                { name: "theftProtection", label: "Theft Protection" },
                { name: "claimSupport", label: "24/7 Claim Support" },
                { name: "comprehensive", label: "Comprehensive" },
              ].map(({ name, label }) => (
                <FormFieldCheckbox
                  control={control}
                  key={name}
                  name={name as keyof ClientInducedFormData}
                  label={label}
                />
              ))}
            </FieldGroup>
          </div>

          <FormFieldTextarea
            control={control}
            name="assetDetail"
            label="Asset Detail"
            placeholder="Any additional information about asset"
            readOnly={mode === "view"}
          />
        </div>
      </FieldGroup>
    </FieldSet>
  );
};

export default PolicyDetailsStep;
