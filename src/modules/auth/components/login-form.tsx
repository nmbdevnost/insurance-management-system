import {
  Field,
  FieldError,
  FieldGroup,
  FieldSet,
} from "@/shared/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/components/ui/input-group";
import { RiAtLine } from "@remixicon/react";
import { Controller, useFormContext } from "react-hook-form";
import type { LoginFormValues } from "../lib/schemas/login-schema";
import PasswordInput from "./password-input";

const LoginForm = () => {
  const form = useFormContext<LoginFormValues>();

  return (
    <FieldSet>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <InputGroup className="h-9">
                <InputGroupAddon>
                  <RiAtLine />
                </InputGroupAddon>

                <InputGroupInput
                  aria-invalid={fieldState.invalid}
                  placeholder="Email Address"
                  {...field}
                />
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <PasswordInput
                className="h-9"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </FieldSet>
  );
};

export default LoginForm;
