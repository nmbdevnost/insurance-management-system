import z from "zod";

export const templateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Body is required"),
});

export type TemplateForm = z.infer<typeof templateSchema>;

export const templateSchemaDefaultValues: TemplateForm = {
  name: "",
  category: "",
  description: "",
  subject: "",
  body: "",
};
