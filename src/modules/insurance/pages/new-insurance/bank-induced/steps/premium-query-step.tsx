import type { PremiumQueryFormData } from "@/modules/insurance/lib/schemas/bank-induced-schema";
import FormFieldCheckbox from "@/shared/components/form/form-fields/form-field-checkbox";
import FormFieldCombobox from "@/shared/components/form/form-fields/form-field-combobox";
import FormFieldInput from "@/shared/components/form/form-fields/form-field-input";
import FormFieldTextarea from "@/shared/components/form/form-fields/form-field-textarea";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/shared/components/ui/field";
import { RiInformationFill } from "@remixicon/react";
import { useFormContext } from "react-hook-form";

const PremiumQueryStep = ({ mode }: { mode?: string }) => {
  const { control } = useFormContext<PremiumQueryFormData>();
  const isViewMode = mode === "view";
  return (
    <FieldSet>
      <FieldLegend>Premium Query</FieldLegend>
      <FieldDescription>
        Review the insurance premium quote for your asset
      </FieldDescription>

      <Alert>
        <RiInformationFill />
        <AlertDescription>
          Premium calculated based on asset type, value, and location{" "}
        </AlertDescription>
      </Alert>

      <Alert>
        <RiInformationFill />
        <AlertDescription>
          Insurance Provider is selected based on Round-Robin or any algorithm
          set by bank
        </AlertDescription>
      </Alert>

      <FieldGroup>
        <div className="flex gap-4">
          <FormFieldCombobox
            control={control}
            name="policyType"
            label="Policy Type"
            placeholder="Enter Policy Type"
            options={[]}
            disabled={isViewMode}
          />
          <FormFieldCombobox
            control={control}
            name="insuranceProvider"
            label="Insurance Provider"
            placeholder="Nepal Life Insurance"
            options={[]}
            disabled={mode === "view"}
          />
        </div>
        <div className="flex gap-4">
          <FormFieldInput
            control={control}
            name="sumInsured"
            label="Sum Insured"
            placeholder="20000"
            disabled={mode === "view"}
          />
          <FormFieldInput
            control={control}
            name="insurancePremium"
            label="Insurance Premium"
            placeholder="2000"
            disabled={mode === "view"}
          />
        </div>
      </FieldGroup>

      <FieldGroup>
        <div className="flex gap-6">
          <FormFieldTextarea
            control={control}
            name="assetDetail"
            label="Asset Detail"
            placeholder="Input Asset Detail"
            disabled={mode === "view"}
          />
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
                  key={name}
                  control={control}
                  name={name as keyof PremiumQueryFormData}
                  label={label}
                />
              ))}
            </FieldGroup>
          </div>
        </div>
      </FieldGroup>
    </FieldSet>
  );
};

export default PremiumQueryStep;
