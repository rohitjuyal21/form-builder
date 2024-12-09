import { Field } from "@/lib/types";
import { sharedFormSchema } from "@/lib/zod";
import { UseFormRegister } from "react-hook-form";
import { z } from "zod";

interface InteractiveFieldProps {
  field: Field;
  register?: UseFormRegister<z.infer<typeof sharedFormSchema>>;
  index?: number;
}

export const InteractiveField = ({
  field,
  index,
  register,
}: InteractiveFieldProps) => {
  const registerName =
    index !== undefined ? (`fields.${index}.value` as const) : undefined;
  switch (field.type) {
    case "short-answer":
      return (
        <input
          {...(register && registerName ? register(registerName) : {})}
          className="w-full outline-none bg-transparent text-gray-1k text-sm rounded-lg px-2 py-1.5 h-8 border border-primaryBorder disabled:bg-gray-100"
          type="text"
        />
      );
    case "long-answer":
      return (
        <textarea
          {...(register && registerName ? register(registerName) : {})}
          className="w-full outline-none bg-transparent text-gray-1k text-sm rounded-lg px-2 py-1.5 h-20 border border-primaryBorder disabled:bg-gray-100 resize-none"
        />
      );
    case "url":
      return (
        <input
          {...(register && registerName ? register(registerName) : {})}
          className="w-full outline-none bg-transparent text-gray-1k text-sm rounded-lg px-2 py-1.5 h-8 border border-primaryBorder disabled:bg-gray-100"
          type="url"
        />
      );
    case "number":
      return (
        <input
          {...(register && registerName ? register(registerName) : {})}
          className="w-full outline-none bg-transparent text-gray-1k text-sm rounded-lg px-2 py-1.5 h-8 border border-primaryBorder disabled:bg-gray-100"
          type="number"
        />
      );
    case "single-select":
      return (
        <div className="space-y-4 mt-4">
          {field.options?.map((option, i) => {
            return (
              <div key={i}>
                <div className="flex items-center gap-1 relative">
                  <label
                    htmlFor={`option-${index}-${i}`}
                    className="flex items-center relative gap-1 cursor-pointer w-full"
                  >
                    <input
                      type="radio"
                      id={`option-${index}-${i}`}
                      className="hidden peer"
                      value={option}
                      {...(register && registerName
                        ? register(registerName)
                        : {})}
                    />
                    <div className="w-4 h-4 border-[1.5px] border-gray-500 rounded-full flex items-center justify-center peer-checked:border-green-500 transition-all" />
                    <div className="w-[6.75px] h-[6.75px] rounded-full bg-transparent peer-checked:bg-green-300 transition-transform absolute top-1/2 left-[8px] -translate-x-1/2 -translate-y-1/2" />
                    <span className="text-sm font-medium">{option}</span>
                  </label>
                </div>
              </div>
            );
          })}{" "}
        </div>
      );
  }
};
