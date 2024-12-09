import React from "react";
import AppHeader from "../Layout/AppHeader";
import { ArrowUpRight } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Field } from "@/lib/types";

interface CreateFormHeaderProps {
  fields: Field[];
  setIsPreviewModalOpen: (isPreviewModalOpen: boolean) => void;
}

export default function CreateFormHeader({
  fields,
  setIsPreviewModalOpen,
}: CreateFormHeaderProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <AppHeader>
      <div className="flex items-center justify-between w-full">
        <input
          {...register("title")}
          type="text"
          placeholder="Untitled form"
          className={`border-none outline-none bg-transparent font-semibold ${
            errors.title
              ? "placeholder:text-red-300"
              : "placeholder:text-gray-400"
          }`}
        />
        <button
          type="button"
          disabled={fields.length === 0}
          onClick={() => setIsPreviewModalOpen(true)}
          className="flex items-center font-semibold border transition-all ease-in duration-75 whitespace-nowrap text-center select-none disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed gap-x-1 active:shadow-none text-sm leading-5 rounded-xl py-1.5 h-8 px-4 text-gray-1k bg-gray-00 border-gray-200 shadow-5 hover:shadow-10"
        >
          Preview
          <ArrowUpRight className="size-4" />
        </button>
      </div>
    </AppHeader>
  );
}
