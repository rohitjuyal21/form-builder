import { inputTypes } from "@/lib/inputTypes";
import React from "react";

interface QuestionsDropdownProps {
  onSelectQuestionType?: (type: string) => void;
}

export default function QuestionsDropdown({
  onSelectQuestionType,
}: QuestionsDropdownProps) {
  return (
    <div className="rounded-2xl border border-primaryBorder shadow-15 p-1 bg-gray-00 w-[300px]">
      <h4 className="uppercase bg-gray-50 rounded-lg text-xs font-semibold text-gray-500 px-4 py-2.5">
        Input types
      </h4>
      <ul>
        {inputTypes.map((inputType) => (
          <li key={inputType.value}>
            <button
              type="button"
              onClick={() => onSelectQuestionType?.(inputType.value)}
              className="flex items-center w-full p-2 text-sm font-semibold bg-gray-00 hover:bg-gray-50 gap-2 text-gray-1k rounded-lg"
            >
              <inputType.icon className="size-5 flex-shrink-0" />
              <span className="text-sm font-medium">{inputType.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
