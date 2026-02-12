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

  const getSelectedOption = React.useCallback(
    (value: unknown, options: DropdownOption[]) => {
      if (isMultiple) {
        return options?.filter((item) =>
          (value as string[])?.includes(item.value)
        );
      }
      return options?.find((item) => item.value === value);
    },
    [isMultiple]
  );

  const handleValueChange = React.useCallback(
    (
      option: DropdownOption | DropdownOption[] | null,
      onChange: (value: unknown) => void
    ) => {
      if (option === null) return;

      if (isMultiple) {
        const selectedOptions = option as DropdownOption[];
        const selectedValues = selectedOptions.map((opt) => opt.value);
        onChange(selectedValues);
      } else {
        const selectedOption = option as DropdownOption;
        onChange(selectedOption.value);
      }
    },
    [isMultiple]
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedOption = getSelectedOption(
          field.value,
          commandProps.options
        );

        return (
          <Field data-invalid={fieldState.invalid}>
            {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}

            <VirtualizedCombobox
              selectedOption={selectedOption}
              onValueChange={(option) =>
                handleValueChange(option, field.onChange)
              }
              invalid={fieldState.invalid}
              modal
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
