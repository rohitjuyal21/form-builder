"use client";
import React, { useCallback, useEffect, useState } from "react";
import SharedFormHeader from "./SharedFormHeader";
import AppLayout from "../Layout/AppLayout";
import { Field, Form } from "@/lib/types";
import FormSection from "./FormSection";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sharedFormSchema } from "@/lib/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function SharedForm({ formId }: { formId: string }) {
  const [form, setForm] = useState<Form | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const methods = useForm<z.infer<typeof sharedFormSchema>>({
    resolver: zodResolver(sharedFormSchema),
    defaultValues: { fields: form?.fields || [] },
  });

  const fetchForm = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/form/${formId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setForm(data);
        methods.reset({
          fields: data.fields.map((field: Field) => ({
            id: field.id || "",
            label: field.label || "",
            type: field.type || "",
            value: field.value || "",
            description: field.description || "",
            options: field.options || [],
          })),
        });
      }
    } catch (error) {
      console.log(`Error fetching form: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }, [formId]);

  useEffect(() => {
    fetchForm();
  }, [fetchForm]);

  const onSubmit = async (value: z.infer<typeof sharedFormSchema>) => {
    setIsSubmitLoading(true);
    try {
      const response = await fetch(`/api/response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formId: form?._id,
          fields: value.fields,
        }),
      });
      if (response.ok) {
        methods.reset();
        toast.success("Form submitted successfully!");
      }
    } catch (error) {
      console.log(`Error submitting form: ${error}`);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const fieldValues = useWatch({ control: methods.control, name: "fields" });

  const calculateCompleteness = () => {
    if (!form) return 0;
    const totalFields = form.fields.length;
    const completedFields = fieldValues?.filter(
      (field) =>
        field?.value !== undefined &&
        field?.value !== null &&
        field?.value !== ""
    ).length;

    return Math.round((completedFields / totalFields) * 100);
  };

  const completeness = calculateCompleteness();
  console.log();

  return (
    <AppLayout>
      {isLoading ? (
        <div className="flex items-center justify-center flex-1 ">
          <Loader2 className="animate-spin text-gray-500" />
        </div>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <SharedFormHeader form={form} completeness={completeness} />
            <div className="sm:p-6 px-2 py-4">
              <FormSection form={form} />
              <div className="flex justify-end mt-10">
                <button
                  type="submit"
                  disabled={completeness < 100 || isSubmitLoading}
                  className="flex items-center font-semibold border transition-all ease-in duration-75 whitespace-nowrap text-center select-none disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed gap-x-1 active:shadow-none text-sm leading-5 rounded-xl py-1.5 h-8 px-4 bg-green-300 text-white border-green-500 hover:border-green-600 disabled:bg-green-400 disabled:border-green-400 shadow-10 hover:shadow-15"
                >
                  {isSubmitLoading ? (
                    <Loader2 className="animate-spin text-white" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      )}
    </AppLayout>
  );
}
