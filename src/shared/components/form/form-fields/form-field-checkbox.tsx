import type { ComponentProps } from "react";
import { Checkbox } from "../../ui/checkbox";
import { FormFieldBase, type FormControlFunction } from "./form-field-base";

const FormFieldCheckbox: FormControlFunction<
  ComponentProps<typeof Checkbox> & {
    horizontal?: boolean;
    controlFirst?: boolean;
  }
> = (props) => {
  return (
    <FormFieldBase horizontal controlFirst {...props}>
      {(field) => (
        <Checkbox
          checked={!!field.value}
          onCheckedChange={(checked) => field.onChange(checked === true)}
          className="aspect-square max-w-max"
          {...field}
          {...props}
          id={field.name}
        />
      )}
    </FormFieldBase>
  );
};

export default FormFieldCheckbox;
