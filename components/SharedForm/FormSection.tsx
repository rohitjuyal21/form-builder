import { Form } from "@/lib/types";
import React from "react";
import { InteractiveField } from "../InteractiveField";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { sharedFormSchema } from "@/lib/zod";

interface FormSectionProps {
  form: Form | null;
}

export default function FormSection({ form }: FormSectionProps) {
  const { register } = useFormContext<z.infer<typeof sharedFormSchema>>();

  return (
    <div className="space-y-8">
      {form?.fields.map((field, index) => (
        <div key={index}>
          <div className="flex flex-col gap-1 mb-1">
            <label htmlFor="" className="text-sm font-semibold text-gray-1k">
              {field.label}
            </label>
            {field.description && (
              <p className="text-xs text-gray-1k">{field.description}</p>
            )}
          </div>
          <InteractiveField field={field} register={register} index={index} />
        </div>
      ))}
    </div>
  );
}
