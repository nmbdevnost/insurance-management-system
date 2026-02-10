import type { DropdownOption } from "@/shared/lib/types/dropdown";
import React from "react";
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
import VirtualizedCombobox from "../../virtualized/virtualized-combobox";

type FormFieldComboboxProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  control?: Control<T>;
  options: DropdownOption[];
  emptyMessage?: string;
} & React.ComponentProps<typeof VirtualizedCombobox>;

const FormFieldCombobox = <T extends FieldValues>({
  name,
  label,
  description,
  control,
  ...commandProps
}: FormFieldComboboxProps<T>) => {
  const isMultiple = commandProps.multiple;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedOption = isMultiple
          ? field.value
          : commandProps.options?.find((item) => item.value === field.value);

        return (
          <Field data-invalid={fieldState.invalid}>
            {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}

            <VirtualizedCombobox
              selectedOption={selectedOption}
              onValueChange={(option) => {
                if (isMultiple) {
                  field.onChange(option as DropdownOption[]);
                } else {
                  field.onChange(option as DropdownOption);
                }
              }}
              {...commandProps}
            />

            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};

export default FormFieldCombobox;
