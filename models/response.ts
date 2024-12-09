import { Field } from "@/lib/types";
import mongoose, { Document, model, models, Schema } from "mongoose";

interface IResponse extends Document {
  formId: Schema.Types.ObjectId;

  fields: Field[];
}

const responseSchema = new mongoose.Schema<IResponse>(
  {
    formId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    fields: [
      {
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
        value: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Response =
  models?.Response || model<IResponse>("Response", responseSchema);
