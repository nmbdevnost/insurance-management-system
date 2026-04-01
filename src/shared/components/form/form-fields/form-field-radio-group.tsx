import { cn } from "@/shared/lib/utils";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "../../ui/field";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { FormFieldBase, type FormControlFunction } from "./form-field-base";
import type { RemixiconComponentType } from "@remixicon/react";

type RadioOption = {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
  icon?: RemixiconComponentType;
};

type ExtraProps = {
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
  <div className="flex items-start gap-2">
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
    className={cn(
      "dark:bg-input/30",
      option.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
    )}
  >
    <Field orientation="horizontal">
      <FieldContent>
        <FieldTitle>
          {option.icon && <option.icon className="size-4" />} {option.label}
        </FieldTitle>
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

const FormFieldRadioGroup: FormControlFunction<ExtraProps> = ({
  options,
  orientation = "vertical",
  variant = "default",
  ...props
}) => (
  <FormFieldBase {...props}>
    {({ onChange, onBlur, value, ref, "aria-invalid": ariaInvalid, id }) => (
      <RadioGroup
        value={value}
        onValueChange={onChange}
        onBlur={onBlur}
        ref={ref}
        aria-invalid={ariaInvalid}
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
              fieldName={id}
            />
          ) : (
            <DefaultOption key={option.value} option={option} fieldName={id} />
          )
        )}
      </RadioGroup>
    )}
  </FormFieldBase>
);

export default FormFieldRadioGroup;
