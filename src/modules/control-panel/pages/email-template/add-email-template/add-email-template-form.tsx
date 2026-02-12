import type { TemplateForm } from "@/modules/control-panel/lib/schemas/template-schema";
import FormFieldCombobox from "@/shared/components/form/form-fields/form-field-combobox";
import FormFieldInput from "@/shared/components/form/form-fields/form-field-input";
import FormFieldTextEditor from "@/shared/components/form/form-fields/form-field-text-editor";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
} from "@/shared/components/ui/field";
import { useFormContext } from "react-hook-form";

const CATEGORY_OPTIONS = [
  {
    label: "Reminder",
    value: "reminder",
  },
  {
    label: "Notification",
    value: "notification",
  },
  {
    label: "Confirmation",
    value: "confirmation",
  },
];

const AddEmailTemplateForm = () => {
  const form = useFormContext<TemplateForm>();

  return (
    <>
      <div>
        <FieldLegend>Template Details</FieldLegend>
        <FieldDescription>
          Basic template details for organization and identification.
        </FieldDescription>
      </div>

      <FieldGroup className="grid grid-cols-2 gap-4">
        <FormFieldInput
          control={form.control}
          name="name"
          label="Template Name"
          placeholder="eg. Initial Reminder"
        />

        <FormFieldCombobox
          control={form.control}
          name="category"
          label="Category"
          placeholder="Select a category"
          options={CATEGORY_OPTIONS}
        />

        <div className="col-span-2">
          <FormFieldInput
            control={form.control}
            name="description"
            label="Description"
            placeholder="Brief description of when this template is used"
          />
        </div>
      </FieldGroup>

      <FieldSeparator className="-mx-4" />

      <div>
        <FieldLegend>Template Content</FieldLegend>
        <FieldDescription>
          Compose the email subject and body content.
        </FieldDescription>
      </div>

      <FieldGroup>
        <FormFieldInput
          control={form.control}
          name="subject"
          label="Subject"
          placeholder="You may use variables like {{customer_name}}"
          className="font-medium"
        />

        <FormFieldTextEditor
          control={form.control}
          name="body"
          label="Body"
          placeholder="Compose your email template here. Use variables in {{double_braces}} format."
          className="min-h-48 resize-none"
          contentClassName="prose-sm! p-2"
          placeholderClassName="top-2.5 left-2"
        />
      </FieldGroup>
    </>
  );
};

export default AddEmailTemplateForm;
