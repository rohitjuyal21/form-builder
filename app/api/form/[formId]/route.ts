import dbConnect from "@/lib/dbConnect";
import { Form } from "@/models/form";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ formId: string }> }
) {
  try {
    await dbConnect();
    const { formId } = await params;

    const form = await Form.findOne({ formId });
    if (!form) {
      return Response.json({ error: "Form not found" }, { status: 404 });
    }
    return Response.json(form, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
