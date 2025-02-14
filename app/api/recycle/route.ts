import { getRecycleBinMenus, RestoreDoc } from "@/actions/menu";

export async function GET() {
  const data = await getRecycleBinMenus();

  return Response.json({
    data,
  });
}

export async function PUT(request: Request) {
  const json = await request.json();
  const data = await RestoreDoc(json.ids as string[]);
  return Response.json({
    data,
    code: data?.error ? 500 : 200,
  });
}
