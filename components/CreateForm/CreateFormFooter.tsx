import React from "react";
import AppFooter from "../Layout/AppFooter";
import { Check, FilePen, LoaderCircle } from "lucide-react";
import { Field } from "@/lib/types";

interface CreateFormFooterProps {
  fields: Field[];
  isLoading: boolean;
  onSaveAsDraft: () => void;
}

export default function CreateFormFooter({
  fields,
  isLoading,
  onSaveAsDraft,
}: CreateFormFooterProps) {
  return (
    <AppFooter>
      <div className="flex items-center justify-between w-full">
        <button
          type="button"
          disabled={fields.length === 0}
          onClick={onSaveAsDraft}
          className="flex items-center font-semibold border transition-all ease-in duration-75 whitespace-nowrap text-center select-none disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed gap-x-1 active:shadow-none text-sm leading-5 rounded-xl py-1.5 h-8 px-4 text-gray-1k bg-gray-00 border-gray-200 shadow-5 hover:shadow-10"
        >
          <FilePen className="size-4" />
          Save as Draft
        </button>
        <button
          type="submit"
          disabled={fields.length === 0 || isLoading}
          className="flex items-center font-semibold border transition-all ease-in duration-75 whitespace-nowrap text-center select-none disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed gap-x-1 active:shadow-none text-sm leading-5 rounded-xl py-1.5 h-8 px-4 bg-green-300 text-white border-green-500 hover:border-green-600 disabled:bg-green-400 disabled:border-green-400 shadow-10 hover:shadow-15"
        >
          {isLoading ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <>
              <Check className="size-4" />
              Publish form
            </>
          )}
        </button>
      </div>
    </AppFooter>
  );
}
