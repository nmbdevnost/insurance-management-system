import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Checkbox } from "../../ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../../ui/field";

type FormFieldCheckboxProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  description?: string;
  control?: Control<T>;
} & React.ComponentProps<typeof Checkbox>;

const FormFieldCheckbox = <T extends FieldValues>({
  name,
  label,
  description,
  control,
  ...props
}: FormFieldCheckboxProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} orientation={"horizontal"}>
          <Checkbox
            {...field}
            checked={!!field.value}
            onCheckedChange={(checked) => field.onChange(checked === true)}
            id={field.name}
            aria-invalid={fieldState.invalid}
            {...props}
          />
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default FormFieldCheckbox;
