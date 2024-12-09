import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Field } from "@/lib/types";
import { InteractiveField } from "./InteractiveField";

interface PreviewModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  fields: Field[];
}

export default function PreviewModal({
  isOpen,
  setIsOpen,
  fields,
}: PreviewModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-1k/80 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-screen-sm modal-scale-in-content border border-gray-200 text-gray-1k rounded-2xl z-50 bg-gray-00 p-6 outline-none max-h-[90vh] overflow-y-auto">
          <Dialog.Title className="text font-bold text-gray-1k pb-4">
            Form Preview
          </Dialog.Title>
          <Dialog.Description></Dialog.Description>
          <div className="space-y-8">
            {fields.map((field, index) => (
              <div key={index}>
                <div className="flex flex-col gap-1 mb-1">
                  <label
                    htmlFor=""
                    className="text-sm font-semibold text-gray-1k"
                  >
                    {field.label}
                  </label>
                  {field.description && (
                    <p className="text-xs text-gray-1k">{field.description}</p>
                  )}
                </div>
                <InteractiveField field={field} />
              </div>
            ))}
            <div className="flex justify-end mt-10">
              <button
                type="submit"
                disabled
                className="flex items-center font-semibold border transition-all ease-in duration-75 whitespace-nowrap text-center select-none disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed gap-x-1 active:shadow-none text-sm leading-5 rounded-xl py-1.5 h-8 px-4 bg-green-300 text-white border-green-500 hover:border-green-600 disabled:bg-green-400 disabled:border-green-400 shadow-10 hover:shadow-15"
              >
                Submit
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
