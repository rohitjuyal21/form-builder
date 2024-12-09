import { Field } from "@/lib/types";
import mongoose, { Document, model, models } from "mongoose";

interface IForm extends Document {
  formId: string;
  title: string;
  fields: Field[];
}

const formSchema = new mongoose.Schema<IForm>(
  {
    formId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    fields: [
      {
        id: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        label: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
        options: {
          type: [String],
        },
      },
    ],
  },
  { timestamps: true }
);

export const Form = models?.Form || model<IForm>("Form", formSchema);
