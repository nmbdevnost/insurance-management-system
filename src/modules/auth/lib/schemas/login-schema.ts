import z, { safeParse } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .refine((val) => {
      const isValid = safeParse(z.email(), val);
      return isValid.success;
    }, "Invalid email address."),
  password: z.string().min(1, "Password is required."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const defaultLoginFormValues: LoginFormValues = {
  email: "",
  password: "",
};
