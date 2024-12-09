"use client";
import React, { useEffect, useState } from "react";
import CreateFormHeader from "./CreateFormHeader";
import { Loader2, Plus } from "lucide-react";
import QuestionsDropdown from "../QuestionsDropdown";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import CreateFormFooter from "./CreateFormFooter";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formSchema } from "@/lib/zod";
import { Field, Form } from "@/lib/types";
import { toast } from "react-toastify";
import PreviewModal from "../PreviewModal";
import QuestionsList from "./QuestionsList";
import SubmitSuccessModal from "../SubmitSuccessModal";
import { customAlphabet } from "nanoid";
import { kebabCase } from "@/lib/converToKebab";

export default function CreateForm() {
  const [isQuestionsDropdownOpen, setIsQuestionsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldsLoading, setFieldsLoading] = useState(true);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isSubmitSuccessModalOpen, setIsSubmitSuccessModalOpen] =
    useState(false);
  const [createdForm, setCreaedForm] = useState<Form | null>(null);

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      fields: [],
    },
  });

  const { handleSubmit, watch, setValue, getValues } = methods;

  const fields = watch("fields");

  const addNewField = (type: string) => {
    const newField: Field = {
      id: Date.now().toString(),
      type,
      label: "",
      description: "",
      options: type === "single-select" ? ["", ""] : undefined,
    };
    setValue("fields", [...getValues("fields"), newField]);
  };

  const handleSelectQuestionType = (type: string) => {
    addNewField(type);
    setIsQuestionsDropdownOpen(false);
  };

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 5);

    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formId: `${kebabCase(value.title)}-${nanoid()}`,
          ...value,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setCreaedForm(data);
        setIsSubmitSuccessModalOpen(true);

        toast.success("Form published successfully");
      } else {
        toast.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFieldsLoading(true);
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      const formData = JSON.parse(savedData);
      methods.reset(formData);
    }
    setFieldsLoading(false);
  }, []);

  //   useEffect(() => {
  //     if (isDraftSaved) {
  //       const formData = getValues();
  //       localStorage.setItem("formData", JSON.stringify(formData));
  //       console.log("Draft saved successfully!");
  //     }
  //   }, [fields, title]);

  const handleSaveAsDraft = () => {
    const formData = getValues();
    localStorage.setItem("formData", JSON.stringify(formData));
    toast.success("Draft saved successfully!");
  };

  return (
    <div className="border-x border-primaryBorder flex-1 flex flex-col">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col"
        >
          <CreateFormHeader
            fields={fields}
            setIsPreviewModalOpen={setIsPreviewModalOpen}
          />
          <div className="sm:p-6 py-4 px-2 space-y-6 flex-1">
            <QuestionsList fields={fields} />
            <div className="flex justify-center">
              {fieldsLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <DropdownMenu.Root
                  open={isQuestionsDropdownOpen}
                  onOpenChange={setIsQuestionsDropdownOpen}
                >
                  <DropdownMenu.Trigger asChild>
                    <button
                      onClick={() =>
                        setIsQuestionsDropdownOpen(!isQuestionsDropdownOpen)
                      }
                      type="button"
                      className="outline-none flex items-center font-semibold border transition-all ease-in duration-75 whitespace-nowrap text-center select-none disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed gap-x-1 active:shadow-none text-sm leading-5 rounded-xl py-1.5 h-8 px-4 text-gray-1k bg-gray-00 border-gray-200 shadow-5 hover:shadow-10"
                    >
                      <Plus className="size-4" />
                      Add Question
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content className="mt-2 z-50">
                      <QuestionsDropdown
                        onSelectQuestionType={handleSelectQuestionType}
                      />
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              )}
            </div>
          </div>
          <CreateFormFooter
            fields={fields}
            isLoading={isLoading}
            onSaveAsDraft={handleSaveAsDraft}
          />
        </form>
        <PreviewModal
          isOpen={isPreviewModalOpen}
          setIsOpen={setIsPreviewModalOpen}
          fields={fields}
        />
      </FormProvider>
      <SubmitSuccessModal
        isOpen={isSubmitSuccessModalOpen}
        setIsOpen={setIsSubmitSuccessModalOpen}
        formId={createdForm?.formId}
      />
    </div>
  );
}
