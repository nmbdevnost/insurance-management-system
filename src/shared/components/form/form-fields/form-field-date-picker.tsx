import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import DatePicker from "../../date-picker";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../../ui/field";

type FormFieldDatePickerProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  description?: string;
  control?: Control<T>;
} & React.ComponentProps<typeof DatePicker>;

const FormFieldDatePicker = <T extends FieldValues>({
  name,
  label,
  description,
  control,
  ...props
}: FormFieldDatePickerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const dateString = field.value;

        const date = dateString ? new Date(dateString) : undefined;

        return (
          <Field data-invalid={fieldState.invalid}>
            {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
            <DatePicker
              date={date}
              onDateChange={(date) => {
                const dateString = date ? date.toISOString() : undefined;
                field.onChange(dateString);
              }}
              invalid={fieldState.invalid}
              {...props}
            />
            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};

export default FormFieldDatePicker;
