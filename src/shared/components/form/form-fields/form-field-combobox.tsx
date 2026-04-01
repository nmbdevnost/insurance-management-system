import type { DropdownOption } from "@/shared/lib/types/dropdown";
import type { ComponentProps } from "react";
import { useCallback } from "react";
import VirtualizedCombobox from "../../virtualized/virtualized-combobox";
import { FormFieldBase, type FormControlFunction } from "./form-field-base";

type ExtraProps = Omit<
  ComponentProps<typeof VirtualizedCombobox>,
  "selectedOption" | "onValueChange" | "invalid"
>;

const FormFieldCombobox: FormControlFunction<ExtraProps> = ({
  modal = false,
  ...props
}) => {
  const isMultiple = props.multiple;

  const getSelectedOption = useCallback(
    (value: unknown, options: DropdownOption[]) => {
      if (isMultiple) {
        return options.filter((item) =>
          (value as string[])?.includes(item.value)
        );
      }
      return options.find((item) => item.value === value);
    },
    [isMultiple]
  );

  const handleValueChange = useCallback(
    (
      option: DropdownOption | DropdownOption[] | null,
      onChange: (value: unknown) => void
    ) => {
      if (option === null) return;
      if (isMultiple) {
        onChange((option as DropdownOption[]).map((opt) => opt.value));
      } else {
        onChange((option as DropdownOption).value);
      }
    },
    [isMultiple]
  );

  return (
    <FormFieldBase {...props}>
      {({ onChange, value, "aria-invalid": ariaInvalid, ...field }) => (
        <VirtualizedCombobox
          {...(props as ComponentProps<typeof VirtualizedCombobox>)}
          {...field}
          selectedOption={getSelectedOption(value, props.options || [])}
          onValueChange={(option) => handleValueChange(option, onChange)}
          invalid={ariaInvalid}
          modal={modal}
        />
      )}
    </FormFieldBase>
  );
};

export default FormFieldCombobox;
