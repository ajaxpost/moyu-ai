import { createDoc, delDoc } from "@/actions/menu";

// add
export async function POST(request: Request) {
  const data = await request.json();
  createDoc(data.id, data.pid);
  return Response.json({ data });
}

// del
export async function DELETE(request: Request) {
  const data = await request.json();
  delDoc(data.ids);
  return Response.json({ data: "delete" });
}
