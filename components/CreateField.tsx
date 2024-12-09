import { Plus, Trash2 } from "lucide-react";

import { useFormContext } from "react-hook-form";
import { formSchema } from "@/lib/zod";
import { z } from "zod";
import { Field } from "@/lib/types";

interface FieldRendererProps {
  field: Field;
  error?: string;
  handleOptionChange?: (index: number, value: string) => void;
  addOption?: () => void;
  deleteOption?: (index: number) => void;
  index?: number;
}

export const FieldRenderer = ({
  field,
  handleOptionChange,
  addOption,
  deleteOption,
  index,
}: FieldRendererProps) => {
  const {
    formState: { errors },
  } = useFormContext<z.infer<typeof formSchema>>();

  switch (field.type) {
    case "short-answer":
      return (
        <input
          disabled
          className="w-full outline-none bg-transparent text-gray-1k text-sm rounded-lg px-2 py-1.5 h-8 border border-primaryBorder disabled:bg-gray-100"
          type="text"
        />
      );
    case "long-answer":
      return (
        <textarea
          disabled
          className="w-full outline-none bg-transparent text-gray-1k text-sm rounded-lg px-2 py-1.5 h-20 border border-primaryBorder disabled:bg-gray-100 resize-none"
        />
      );
    case "url":
      return (
        <input
          disabled
          className="w-full outline-none bg-transparent text-gray-1k text-sm rounded-lg px-2 py-1.5 h-8 border border-primaryBorder disabled:bg-gray-100"
          type="url"
        />
      );
    case "number":
      return (
        <input
          disabled
          className="w-full outline-none bg-transparent text-gray-1k text-sm rounded-lg px-2 py-1.5 h-8 border border-primaryBorder disabled:bg-gray-100"
          type="number"
        />
      );
    case "single-select":
      return (
        <div className="space-y-2">
          {field.options?.map((option, i) => {
            const error = errors.fields?.[index ?? 0]?.options;
            return (
              <div key={i}>
                <div className="flex items-center gap-2 relative">
                  <label
                    htmlFor={`option-${index}-${i}`}
                    className="flex items-center relative"
                  >
                    <input
                      type="radio"
                      name={`option-${index}`}
                      id={`option-${index}-${i}`}
                      className="hidden peer"
                      disabled
                    />
                    <div
                      className="
              w-4 h-4 
              border-[1.5px] border-gray-500 
              rounded-full 
              flex items-center justify-center 
              peer-checked:border-green-500 
              transition-all
            "
                    ></div>
                    <div
                      className="
              w-[6.75px] h-[6.75px] 
              rounded-full 
              bg-transparent 
              peer-checked:bg-green-300 
              transition-transform absolute top-1/2 left-1/2
              -translate-x-1/2 -translate-y-1/2
            "
                    />
                  </label>

                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      handleOptionChange?.(i, e.target.value);
                    }}
                    placeholder={`Option ${i + 1}`}
                    className={`w-full outline-none bg-transparent text-gray-1k text-sm rounded-lg px-2 py-1.5 h-8 border ${
                      error && option === ""
                        ? "border-red-500"
                        : "border-primaryBorder"
                    } disabled:bg-gray-100`}
                  />

                  <div className="flex items-center gap-2">
                    {field.options && field.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => {
                          deleteOption?.(i);
                        }}
                        className="justify-center shrink-0 flex items-center font-semibold border transition-all ease-in duration-75 whitespace-nowrap text-center select-none disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed gap-x-1 active:shadow-none text-sm leading-5 rounded-xl py-1.5 h-8 w-8 text-gray-1k border-transparent disabled:bg-gray-100 disabled:hover:border-transparent hover:bg-red-00 "
                      >
                        <Trash2 className="size-4" stroke="#EB5757" />
                      </button>
                    )}

                    {field.options &&
                      i === field.options.length - 1 &&
                      field.options.length < 4 && (
                        <button
                          type="button"
                          onClick={addOption}
                          className="!bg-transparent justify-center shrink-0 flex items-center font-semibold border transition-all ease-in duration-75 whitespace-nowrap text-center select-none disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed gap-x-1 active:shadow-none text-sm leading-5 rounded-xl py-1.5 h-8 w-8 text-gray-1k border-transparent hover:border-gray-200 disabled:bg-gray-100 disabled:hover:border-transparent"
                        >
                          <Plus className="size-4" />
                        </button>
                      )}
                  </div>
                </div>

                {error && option === "" && (
                  <p className="text-red-300 text-xs mt-1 pl-6">
                    Option can't be empty
                  </p>
                )}
              </div>
            );
          })}
        </div>
      );
  }
};
