import { createDoc, delDoc, updatePermission } from "@/actions/menu";

// add
export async function POST(request: Request) {
  const data = await request.json();
  await createDoc(data.id, data.pid);
  return Response.json({ data });
}

// del
export async function DELETE(request: Request) {
  const data = await request.json();
  await delDoc(data.ids);
  return Response.json({ data: "delete" });
}

// update 权限
export async function PUT(request: Request) {
  const data = await request.json();
  const resp = await updatePermission(data.id, data.permission);

  return Response.json({ data: "update", code: resp?.error ? 500 : 200 });
}
