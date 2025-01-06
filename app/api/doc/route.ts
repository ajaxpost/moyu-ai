import { createDoc, delDoc, getDoc, updatePermission } from "@/actions/menu";
import { NextRequest } from "next/server";

// add
export async function POST(request: Request) {
  const data = await request.json();
  const resp = await createDoc(data.id, data.pid);
  return Response.json({ data, code: resp?.error ? 500 : 200 });
}

// del
export async function DELETE(request: Request) {
  const data = await request.json();
  const resp = await delDoc(data.ids);
  return Response.json({ data: "delete", code: resp?.error ? 500 : 200 });
}

// update 权限
export async function PUT(request: Request) {
  const data = await request.json();
  const resp = await updatePermission(data.id, data.permission);

  return Response.json({ data: "update", code: resp?.error ? 500 : 200 });
}

// get doc
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const doc = await getDoc(id as string);

  return Response.json(doc);
}
