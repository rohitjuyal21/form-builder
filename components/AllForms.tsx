"use client";
import { Form } from "@/lib/types";

import React, { useEffect, useState } from "react";
import AppLayout from "./Layout/AppLayout";
import PreviewModal from "./PreviewModal";
import Link from "next/link";
import { ExternalLink, Loader2 } from "lucide-react";

export default function AllForms() {
  const [forms, setforms] = useState<Form[] | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch("/api/form", {
          method: "GET",
        });
        const data = await response.json();
        if (response.ok) {
          setforms(data);
        }
      } catch (error) {
        console.log(`Error fetching forms: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchForms();
  }, []);
  return (
    <AppLayout>
      {isLoading ? (
        <div className="flex justify-center items-center h-full flex-1">
          <Loader2 className="text-gray-500 animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col ">
          <h1 className="font-instrument text-2xl text-center my-4 w-full">
            All Forms
          </h1>
          <div className="border-t border-b border-primaryBorder divide-y-0 divide-primaryBorder">
            {forms?.map((form) => (
              <div key={form._id}>
                <div className="w-full outline-none h-full relative overflow-hidden px-4 py-4 flex items-center transition-all duration-200 hover:bg-gray-25 min-[450px]:px-6 ">
                  <div className="flex justify-between items-center w-full">
                    <h4 className="text-sm font-semibold">{form.title}</h4>
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => setIsPreviewModalOpen(true)}
                        type="button"
                        className="flex items-center font-semibold border transition-all ease-in duration-75 whitespace-nowrap text-center select-none disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed gap-x-1 active:shadow-none text-sm leading-5 rounded-xl py-1.5 h-8 px-4 text-gray-1k bg-gray-00 border-gray-200 shadow-5 hover:shadow-10"
                      >
                        Preview
                      </button>
                      <Link href={`/form/${form.formId}`} target="_blank">
                        <button className="flex items-center font-semibold border transition-all ease-in duration-75 whitespace-nowrap text-center select-none disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed gap-x-1 active:shadow-none text-sm leading-5 rounded-xl py-1.5 h-8 px-4 bg-green-300 text-white border-green-500 hover:border-green-600 disabled:bg-green-400 disabled:border-green-400 shadow-10 hover:shadow-15">
                          Open <ExternalLink className="size-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <PreviewModal
                  isOpen={isPreviewModalOpen}
                  setIsOpen={setIsPreviewModalOpen}
                  fields={form.fields}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </AppLayout>
  );
}
