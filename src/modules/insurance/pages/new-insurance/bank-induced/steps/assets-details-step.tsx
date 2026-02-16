import type { AssetDetailFormData } from "@/modules/insurance/lib/schemas/bank-induced-schema";
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

const AssetsDetailsStep = ({ mode }: { mode?: string }) => {
  const { control } = useFormContext<AssetDetailFormData>();

  return (
    <FieldSet>
      <FieldLegend>Asset Information</FieldLegend>
      <FieldDescription>
        Enter the asset details for insurance coverage
      </FieldDescription>

      <FieldGroup className="grid grid-cols-2 gap-4">
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
          name="customerCifId"
          label="Customer CIF ID"
          placeholder="Select Customer CIF ID"
          disabled={mode === "view"}
        />

        <FormFieldInput
          control={control}
          name="losId"
          label="LOS ID"
          placeholder="Select LOS ID"
          disabled={mode === "view"}
        />
        <FormFieldInput
          control={control}
          name="clientName"
          label="Name"
          placeholder="Enter Name of Client"
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
        <FormFieldInput
          control={control}
          name="contactNumber"
          label="Contact Number"
          placeholder="Enter Contact Number"
          disabled={mode === "view"}
        />

        <FormFieldInput
          control={control}
          name="address"
          placeholder="Enter address of client"
          label="Address"
          disabled={mode === "view"}
        />
        <FormFieldInput
          control={control}
          name="plotNumber"
          label="Plot Number"
          placeholder="Enter Plot Number"
          disabled={mode === "view"}
        />

        <FormFieldInput
          control={control}
          name="buildingLocation"
          label="Building Location"
          placeholder="Enter Building Address"
          disabled={mode === "view"}
        />
        <FormFieldInput
          control={control}
          name="buildingOwner"
          label="Name of Building Owner"
          placeholder="Enter Name of Building Owner"
          disabled={mode === "view"}
        />

        <FormFieldInput
          control={control}
          name="noOfStorey"
          label="No.of Storey"
          placeholder="Enter No. of Storey"
          disabled={mode === "view"}
        />
        <FormFieldInput
          control={control}
          name="riskCoverage"
          label="Risk Coverage"
          placeholder="Enter Risk Coverage"
          disabled={mode === "view"}
        />

        <FormFieldInput
          control={control}
          name="sumInsured"
          label="Sum Insured"
          type="number"
          placeholder="Enter Sum Insured"
          disabled={mode === "view"}
        />
        <FormFieldCombobox
          control={control}
          name="buildingType"
          label="Building Type"
          disabled={mode === "view"}
          placeholder="Select Building Type"
          options={[]}
        />

        <FormFieldInput
          control={control}
          name="fairMarketValue"
          label="Fair Market Value"
          placeholder="Enter Fair Market Value"
          disabled={mode === "view"}
        />
        <FormFieldInput
          control={control}
          name="valuationReport"
          label="Valuation Report"
          placeholder="Input Valuation Report"
          disabled={mode === "view"}
        />

        <FormFieldTextarea
          control={control}
          name="assetDetail"
          label="Asset Detail"
          placeholder="Any Additional Information about asset detail"
          disabled={mode === "view"}
        />
        <FormFieldTextarea
          control={control}
          name="additionalRemarks"
          label="Additional Remarks"
          placeholder="Any additional information"
          readOnly={mode === "view"}
        />
      </FieldGroup>
    </FieldSet>
  );
};

export default AssetsDetailsStep;
