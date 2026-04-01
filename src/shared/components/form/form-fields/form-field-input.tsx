import type { ComponentProps } from "react";
import { Input } from "../../ui/input";
import { FormFieldBase, type FormControlFunction } from "./form-field-base";

const FormFieldInput: FormControlFunction<ComponentProps<typeof Input>> = (
  props
) => {
  return (
    <FormFieldBase {...props}>
      {(field) => <Input {...field} {...props} id={field.name} />}
    </FormFieldBase>
  );
};

export default FormFieldInput;
