import dbConnect from "@/lib/dbConnect";
import { Response as ResponseModel } from "@/models/response";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const response = await ResponseModel.create({ ...body });

    if (!response) {
      return Response.json({ error: "Response not found" }, { status: 404 });
    }

    return Response.json(response, { status: 201 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
