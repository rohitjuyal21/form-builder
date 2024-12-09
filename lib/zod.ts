import { z } from "zod";

export const fieldSchema = z
  .object({
    id: z.string(),
    type: z.string(),
    label: z.string().min(1, "This field is required"),
    description: z.string().optional(),
    options: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      // Ensure that if options are provided, none of them are empty
      if (data.options) {
        return data.options.every((opt) => opt.trim() !== "");
      }
      return true; // No error if options are absent
    },
    {
      message: "Options cannot be empty when provided",
      path: ["options"],
    }
  );

export const formSchema = z.object({
  title: z.string().min(1, "This field is required"),
  fields: z.array(fieldSchema),
});

const fieldValidation = (type: string) => {
  switch (type) {
    case "short-answer":
      return z.string().min(1, "This field is required");
    case "long-answer":
      return z.string().min(1, "This field is required");
    case "url":
      return z.string().url("Please enter a valid URL");
    case "number":
      return z.string().regex(/^\d+$/, "Please enter a valid number");
    case "single-select":
      return z.string().min(1, "Please select an option");
    default:
      return z.string();
  }
};

export const sharedFormSchema = z.object({
  fields: z.array(
    z
      .object({
        id: z.string().optional(),
        label: z.string(),
        type: z.string(),
        value: z
          .union([z.string(), z.number(), z.array(z.string())])
          .optional(),
        description: z.string().optional(),
        options: z.array(z.string()).optional(),
      })
      .refine((data) => {
        if (data.value && data.type) {
          const validation = fieldValidation(data.type);
          try {
            validation.parse(data.value);
          } catch (error) {
            return error;
          }
        }
        return true;
      }, "Invalid value for the field type")
  ),
});
