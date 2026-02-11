import z from "zod";

export const variableSchema = z.object({
  key: z
    .string()
    .min(2, "Key is required")
    .max(50, "Key must be less than 50 characters")
    .regex(/^\{\{[^}]+\}\}$/, "Key must be in the format {{variable_name}}."),
  description: z.string().optional(),
  example: z.string().optional(),
  category: z.string().optional(),
  categories: z.array(z.string()).optional(),
});

export type VariableForm = z.infer<typeof variableSchema>;

export const variableFormDefaultValues: VariableForm = {
  key: "",
  description: "",
  example: "",
  category: "",
  categories: [],
};
