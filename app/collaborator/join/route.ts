import { createShare, getShareByMore, updateShare } from "@/actions/share";
import { auth } from "@/auth";
import { PowerEnum } from "@/shared/enum";
import dayjs from "dayjs";
import jsonwebtoken, { TokenExpiredError } from "jsonwebtoken";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

const SHARE_DOC_ID = process.env.SHARE_DOC_ID!;

export async function GET(request: NextRequest) {
  const session = await auth();
  const userId = session?.user.id;
  const searchParams = request.nextUrl.searchParams;
  const source = searchParams.get("source");
  const goto = searchParams.get("goto");
  const token = searchParams.get("token");
  try {
    const coded = jsonwebtoken.verify(token!, SHARE_DOC_ID) as Record<
      string,
      string
    >;
    if (userId === coded.sharer) {
      redirect(goto!);
    } else {
      const current = await getShareByMore({
        uid: userId!,
        sharer_uid: coded.sharer,
        did: coded.did,
      });
      if (current) {
        // update
        const update_at = dayjs().format("YYYY-MM-DD HH:mm:ss.SSS");
        const resp = await updateShare({
          id: current.id,
          uid: userId!,
          sharer_uid: coded.sharer,
          did: coded.did,
          power: coded.power as PowerEnum,
          source: source!,
          update_at,
        });
        if (!resp.error) {
          redirect(goto!);
        }
      } else {
        const newShare = await createShare({
          uid: userId!,
          sharer_uid: coded.sharer,
          did: coded.did,
          power: coded.power as PowerEnum,
          source: source!,
        });
        if (!newShare.error) {
          redirect(goto!);
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof TokenExpiredError) {
      return new Response("令牌已到期");
    } else {
      const name = error?.message;
      if (name === "NEXT_REDIRECT") {
        redirect(goto!);
      }
    }
  }

  return new Response("出现错误了❌");
}
