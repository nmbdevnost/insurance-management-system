import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/shared/components/ui/field";
import { type ReactNode } from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

export type FormControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = {
  name: TName;
  label: ReactNode;
  description?: ReactNode;
  control: ControllerProps<TFieldValues, TName, TTransformedValues>["control"];
};

export type FormFieldBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = FormControlProps<TFieldValues, TName, TTransformedValues> & {
  horizontal?: boolean;
  controlFirst?: boolean;
  children: (
    field: Parameters<
      ControllerProps<TFieldValues, TName, TTransformedValues>["render"]
    >[0]["field"] & {
      "aria-invalid": boolean;
      id: string;
    }
  ) => ReactNode;
};

export type FormControlFunction<
  ExtraProps extends object = Record<never, never>,
> = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(
  props: FormControlProps<TFieldValues, TName, TTransformedValues> & ExtraProps
) => ReactNode;

type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = {
  name: TName;
  control: ControllerProps<TFieldValues, TName, TTransformedValues>["control"];
  render: ControllerProps<TFieldValues, TName, TTransformedValues>["render"];
};

export const FormFieldBase = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  children,
  control,
  label,
  name,
  description,
  horizontal,
  controlFirst,
}: FormFieldBaseProps<TFieldValues, TName, TTransformedValues>): ReactNode => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => {
      const control = children({
        ...field,
        id: field.name,
        "aria-invalid": fieldState.invalid,
      });

      const labelElement = label && (
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      );
      const descriptionElement = description && (
        <FieldDescription>{description}</FieldDescription>
      );
      const errorElement = fieldState.invalid && (
        <FieldError errors={[fieldState.error]} />
      );

      return (
        <Field
          data-invalid={fieldState.invalid}
          orientation={horizontal ? "horizontal" : undefined}
        >
          {controlFirst ? (
            <>
              {control}
              <FieldContent>
                {labelElement}
                {descriptionElement}
                {errorElement}
              </FieldContent>
            </>
          ) : (
            <>
              <FieldContent>{labelElement}</FieldContent>
              {control}
              <FieldContent>
                {descriptionElement}
                {errorElement}
              </FieldContent>
            </>
          )}
        </Field>

        // <Field
        //   data-invalid={fieldState.invalid}
        //   // orientation={horizontal ? "horizontal" : undefined}
        // >
        //   {controlFirst ? (
        //     <>
        //       {control}
        //       <FieldContent>
        //         {labelElement}
        //         {errorElem}
        //       </FieldContent>
        //     </>
        //   ) : (
        //     <>
        //       <FieldContent>{labelElement}</FieldContent>
        //       {control}
        //       {errorElem}
        //     </>
        //   )}
        // </Field>
      );
    }}
  />
);

/**
 * Low-level form field that exposes the raw `Controller` render prop API.
 * Use this when the pre-built `FormInput`, `FormSelect`, etc. don't cover your use case.
 */
export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  name,
  control,
  render,
}: FormFieldProps<TFieldValues, TName, TTransformedValues>): ReactNode => (
  <Controller control={control} name={name} render={render} />
);
