import type { VariableForm } from "@/modules/control-panel/lib/schemas/variable-schema";
import FormFieldCombobox from "@/shared/components/form/form-fields/form-field-combobox";
import FormFieldInput from "@/shared/components/form/form-fields/form-field-input";
import { useFormContext } from "react-hook-form";

const variableCategories = [
  { label: "Customer", value: "customer" },
  { label: "Order", value: "order" },
  { label: "Product", value: "product" },
  { label: "Promotion", value: "promotion" },
  { label: "Other", value: "other" },
];

const AddVariableForm = () => {
  const form = useFormContext<VariableForm>();
  return (
    <>
      <FormFieldInput
        name="key"
        label="Key"
        control={form.control}
        placeholder="e.g. {{customer_name}}"
      />

      <FormFieldInput
        name="description"
        label="Description"
        control={form.control}
        placeholder="e.g. The name of the customer"
      />

      <FormFieldInput
        control={form.control}
        name="example"
        label="Example"
        placeholder="e.g. John Doe"
      />

      <FormFieldCombobox
        control={form.control}
        name="category"
        label="Category"
        placeholder="Select a category"
        options={variableCategories}
      />

      <FormFieldCombobox
        control={form.control}
        name="categories"
        label="Categories"
        placeholder="Select categories"
        options={variableCategories}
        multiple
      />
    </>
  );
};

export default AddVariableForm;
