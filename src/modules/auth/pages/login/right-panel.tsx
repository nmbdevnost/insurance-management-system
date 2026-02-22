import { Button } from "@/shared/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldSeparator,
} from "@/shared/components/ui/field";
import { Typography } from "@/shared/components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiArrowRightLine, RiKey2Line } from "@remixicon/react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import LoginForm from "../../components/login-form";
import {
  defaultLoginFormValues,
  loginSchema,
  type LoginFormValues,
} from "../../lib/schemas/login-schema";

const LoginRightPanel = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultLoginFormValues,
  });

  const handleLogin: SubmitHandler<LoginFormValues> = (data) => {
    console.log("🚀 ~ handleLogin ~ data:", data);
  };

  return (
    <>
      <div className="mx-auto w-full max-w-sm space-y-8">
        <Typography
          variant="overline"
          as="p"
          className="max-sm:text-center sm:hidden"
        >
          Insurance Portal
        </Typography>

        {/* Header */}
        <div className="space-y-1">
          <Typography variant="h3" className="max-sm:text-center">
            Sign in
          </Typography>
          <Typography variant="body-sm" className="max-sm:text-center">
            Use your company credentials or SSO provider.
          </Typography>
        </div>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <FieldGroup>
              <LoginForm />

              <Field>
                <Button size="lg" className="w-full" type="submit">
                  Sign in <RiArrowRightLine />
                </Button>
              </Field>

              <FieldSeparator className="my-2">
                <Typography variant="overline" muted>
                  Or
                </Typography>
              </FieldSeparator>

              <Field>
                <Button size="lg" variant="outline" className="w-full">
                  <RiKey2Line /> Sign in with SSO
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </FormProvider>

        <Typography
          variant="caption"
          as="p"
          className="max-sm:text-center"
          muted
        >
          Having trouble? Contact your system administrator.
        </Typography>
      </div>
    </>
  );
};

export default LoginRightPanel;
