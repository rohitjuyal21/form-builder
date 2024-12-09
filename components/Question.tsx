import { ChevronDown, GripVertical, X } from "lucide-react";
import React, { useState } from "react";
import QuestionsDropdown from "./QuestionsDropdown";
import { inputTypes } from "@/lib/inputTypes";
import { FieldRenderer } from "./CreateField";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/lib/zod";
import { Field } from "@/lib/types";

interface QuestionProps {
  field: Field;
  index: number;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
}

const getIconByType = (type: string) => {
  const inputType = inputTypes.find((item) => item.value === type);
  if (inputType) return <inputType.icon className="size-5" />;
};

export default function Question({
  field,
  index,
  dragHandleProps,
}: QuestionProps) {
  const [isQuestionsDropdownOpen, setIsQuestionsDropdownOpen] = useState(false);
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<z.infer<typeof formSchema>>();

  const handleQuestionTypeChange = (type: string) => {
    setValue(`fields.${index}.type`, type);
    if (type === "single-select") {
      setValue(`fields.${index}.options`, ["", ""]);
    } else {
      setValue(`fields.${index}.options`, undefined);
    }
  };

  const handleOptionChange = (optionIndex: number, value: string) => {
    const updatedOptions = [...(field.options || [])];
    updatedOptions[optionIndex] = value;
    setValue(`fields.${index}.options`, updatedOptions);
  };

  const addOption = () => {
    if (field.options && field.options.length < 4) {
      const updatedOptions = [...(field.options || [])];
      updatedOptions.push("");
      setValue(`fields.${index}.options`, updatedOptions);
    }
  };

  const deleteOption = (optionIndex: number) => {
    const updatedOptions = [...(field.options || [])];
    updatedOptions.splice(optionIndex, 1);
    setValue(`fields.${index}.options`, updatedOptions);
  };

  const handleRemoveQuestion = () => {
    const updatedFields = [...getValues("fields")];
    updatedFields.splice(index, 1);
    setValue("fields", updatedFields);
  };

  return (
    <div className="bg-gray-00 border border-primaryBorder p-4 hover:bg-gray-50 rounded-2xl space-y-2">
      <div className="flex jutify-between items-center gap-4">
        <div className="flex flex-col gap-1 flex-1">
          <input
            type="text"
            placeholder="Write a question"
            value={field.label}
            onChange={(e) => setValue(`fields.${index}.label`, e.target.value)}
            className={`w-full text-sm font-semibold bg-transparent outline-none 
                ${
                  errors?.fields?.[index]?.label
                    ? "placeholder:text-red-500"
                    : "placeholder:text-gray-400"
                }
              `}
          />
          <input
            type="text"
            placeholder="Write a help text or caption (leave empty if not needed)."
            value={field.description}
            onChange={(e) =>
              setValue(`fields.${index}.description`, e.target.value)
            }
            className="text-xs placeholder:text-gray-400 bg-transparent border-none outline-none"
          />
        </div>
        <div className="flex items-center gap-x-1">
          <DropdownMenu.Root
            open={isQuestionsDropdownOpen}
            onOpenChange={setIsQuestionsDropdownOpen}
          >
            <DropdownMenu.Trigger asChild>
              <button
                onClick={() => setIsQuestionsDropdownOpen(true)}
                className="justify-center shrink-0 flex items-center font-semibold border transition-all ease-in duration-75 whitespace-nowrap text-center select-none disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed active:shadow-none  rounded-lg bg-gray-00 px-2 border-transparent hover:border-gray-200 hover:shadow-10 text-gray-400 hover:text-gray-1k h-8"
              >
                {getIconByType(field.type)}
                <ChevronDown className="size-4" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content align="end" className="mt-2 z-50">
                <QuestionsDropdown
                  onSelectQuestionType={handleQuestionTypeChange}
                />
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
          <button
            onClick={handleRemoveQuestion}
            className="justify-center shrink-0 flex items-center font-semibold border transition-all ease-in duration-75 whitespace-nowrap text-center select-none disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed active:shadow-none text-xs leading-4 py-1 rounded-lg bg-gray-00 px-2 border-transparent hover:border-gray-200 hover:shadow-10 text-gray-400 hover:text-gray-1k h-8 w-8 "
          >
            <X className="size-5" />
          </button>
          <button
            type="button"
            {...dragHandleProps}
            className="justify-center shrink-0 flex items-center font-semibold border transition-all ease-in duration-75 whitespace-nowrap text-center select-none disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed active:shadow-none text-xs leading-4 py-1 rounded-lg bg-gray-00 px-2 border-transparent hover:border-gray-200 hover:shadow-10 text-gray-400 hover:text-gray-1k h-8 w-8 cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="size-5" />
          </button>
        </div>
      </div>
      <div>
        <FieldRenderer
          field={field}
          handleOptionChange={handleOptionChange}
          addOption={addOption}
          deleteOption={deleteOption}
          index={index}
        />
      </div>
    </div>
  );
}
