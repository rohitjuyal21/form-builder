import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Copy } from "lucide-react";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

interface SubmitSuccessModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  formId: string | undefined;
}

export default function SubmitSuccessModal({
  isOpen,
  setIsOpen,
  formId,
}: SubmitSuccessModalProps) {
  const formUrl = `${process.env.NEXT_PUBLIC_API_URL}/form/${formId}`;

  const copyToClipboard = () => {
    copy(formUrl);
    toast.success("Link copied to clipboard!");
  };
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-1k/80 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-screen-sm modal-scale-in-content border border-gray-200 text-gray-1k rounded-2xl z-50 bg-gray-00 p-6 outline-none max-h-[90vh] overflow-y-auto">
          <Dialog.Title className="text-3xl text-gray-1k pb-2 font-instrument text-center italic">
            Form published successfully 🎉!
          </Dialog.Title>
          <Dialog.Description className="text-center text-sm text-gray-500">
            Your form has been published successfully. Copy the link below and
            share it
          </Dialog.Description>
          <div className="my-4 flex flex-col gap-2 items-center">
            <p
              onClick={copyToClipboard}
              className="text-center text-gray-1k cursor-pointer font-medium"
            >
              {formUrl}
            </p>
            <button
              onClick={copyToClipboard}
              className="flex items-center font-semibold border transition-all ease-in duration-75 whitespace-nowrap text-center select-none disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed gap-x-1 active:shadow-none text-sm leading-5 rounded-xl py-1.5 h-8 px-4 bg-green-300 text-white border-green-500 hover:border-green-600 disabled:bg-green-400 disabled:border-green-400 shadow-10 hover:shadow-15"
            >
              <Copy className="size-4" />
              Copy Link
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
