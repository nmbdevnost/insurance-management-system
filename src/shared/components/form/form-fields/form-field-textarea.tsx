import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../../ui/field";
import { Textarea } from "../../ui/textarea";

type FormFieldTextareaProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  control?: Control<T>;
} & React.ComponentProps<typeof Textarea>;

const FormFieldTextarea = <T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  control,
  ...props
}: FormFieldTextareaProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
          <Textarea
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            {...props}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default FormFieldTextarea;
