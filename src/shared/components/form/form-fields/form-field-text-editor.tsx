import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import TextEditor from "../../text-editor";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../../ui/field";

type FormFieldTextEditorProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  control?: Control<T>;
} & React.ComponentProps<typeof TextEditor>;

const FormFieldTextEditor = <T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  control,
  ...props
}: FormFieldTextEditorProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
          <TextEditor
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

export default FormFieldTextEditor;
