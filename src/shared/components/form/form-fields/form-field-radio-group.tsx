import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldTitle,
} from "../../ui/field";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";

type RadioOption = {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
};

type FormFieldRadioGroupProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  description?: string;
  control?: Control<T>;
  options: RadioOption[];
  orientation?: "vertical" | "horizontal";
  variant?: "default" | "choice-card";
};

/** Renders a standard radio item with optional per-option description. */
const DefaultOption = ({
  option,
  fieldName,
}: {
  option: RadioOption;
  fieldName: string;
}) => (
  <div key={option.value} className="flex items-start gap-2">
    <RadioGroupItem
      value={option.value}
      id={`${fieldName}-${option.value}`}
      disabled={option.disabled}
    />
    <div className="flex flex-col">
      <Label
        htmlFor={`${fieldName}-${option.value}`}
        className={
          option.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }
      >
        {option.label}
      </Label>
      {option.description && (
        <span className="text-muted-foreground text-sm">
          {option.description}
        </span>
      )}
    </div>
  </div>
);

/** Renders a choice card radio item using Field/FieldContent layout. */
const ChoiceCardOption = ({
  option,
  fieldName,
}: {
  option: RadioOption;
  fieldName: string;
}) => (
  <FieldLabel
    htmlFor={`${fieldName}-${option.value}`}
    data-disabled={option.disabled}
    className={option.disabled ? "cursor-not-allowed opacity-50" : undefined}
  >
    <Field orientation="horizontal">
      <FieldContent>
        <FieldTitle>{option.label}</FieldTitle>
        {option.description && (
          <FieldDescription>{option.description}</FieldDescription>
        )}
      </FieldContent>
      <RadioGroupItem
        value={option.value}
        id={`${fieldName}-${option.value}`}
        disabled={option.disabled}
      />
    </Field>
  </FieldLabel>
);

const FormFieldRadioGroup = <T extends FieldValues>({
  name,
  label,
  description,
  control,
  options,
  orientation = "vertical",
  variant = "default",
}: FormFieldRadioGroupProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel>{label}</FieldLabel>}
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            onBlur={field.onBlur}
            ref={field.ref}
            aria-invalid={fieldState.invalid}
            className={
              orientation === "horizontal"
                ? "flex flex-row gap-4"
                : "flex flex-col gap-2"
            }
          >
            {options.map((option) =>
              variant === "choice-card" ? (
                <ChoiceCardOption
                  key={option.value}
                  option={option}
                  fieldName={field.name}
                />
              ) : (
                <DefaultOption
                  key={option.value}
                  option={option}
                  fieldName={field.name}
                />
              )
            )}
          </RadioGroup>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default FormFieldRadioGroup;
