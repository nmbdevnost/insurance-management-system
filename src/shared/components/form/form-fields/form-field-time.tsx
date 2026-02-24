import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { TimePicker } from "../../time-picker";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../../ui/field";

type FormFieldTimeProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  description?: string;
  control?: Control<T>;
} & React.ComponentProps<typeof TimePicker>;

const FormFieldTime = <T extends FieldValues>({
  name,
  label,
  description,
  control,
  ...props
}: FormFieldTimeProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}

          <TimePicker
            id={field.name}
            value={field.value}
            onChange={field.onChange}
            aria-invalid={fieldState.invalid}
            {...props}
          />

          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default FormFieldTime;
