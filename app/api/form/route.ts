import dbConnect from "@/lib/dbConnect";
import { Form } from "@/models/form";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const form = await Form.create({ ...body });

    return Response.json(form, { status: 201 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    const forms = await Form.find();
    return Response.json(forms, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
