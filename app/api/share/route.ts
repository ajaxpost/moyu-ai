import { getShares } from "@/actions/share";
import { NextRequest } from "next/server";

// get shares
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const did = searchParams.get("did");
  const doc = await getShares(did as string);
  return Response.json(doc);
}
