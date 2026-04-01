import type { ComponentProps } from "react";
import { Textarea } from "../../ui/textarea";
import { FormFieldBase, type FormControlFunction } from "./form-field-base";

type ExtraProps = ComponentProps<typeof Textarea>;

const FormFieldTextarea: FormControlFunction<ExtraProps> = (props) => (
  <FormFieldBase {...props}>{(field) => <Textarea {...field} />}</FormFieldBase>
);

export default FormFieldTextarea;
