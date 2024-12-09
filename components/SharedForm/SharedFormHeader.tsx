import React from "react";
import AppHeader from "../Layout/AppHeader";
import { Form } from "@/lib/types";

interface SharedFormHeaderProps {
  form: Form | null;
  completeness: number;
}

export default function SharedFormHeader({
  form,
  completeness,
}: SharedFormHeaderProps) {
  return (
    <AppHeader>
      <div className="flex items-center justify-between w-full">
        <h4 className="font-semibold text-gray-1k">{form?.title}</h4>
        <div className="flex gap-2 flex-col items-end">
          <div className="text-sm text-gray-1k">
            Form Completeness — {completeness}%
          </div>
          <div className="h-1 w-[240px] sm:w-[300px] rounded bg-gray-200 relative">
            <div
              className="absolute inset-y-0 bg-green-300 left-0 top-0 rounded transition-all ease-linear duration-300"
              style={{ width: `${completeness}%` }}
            ></div>
          </div>
        </div>
      </div>
    </AppHeader>
  );
}
