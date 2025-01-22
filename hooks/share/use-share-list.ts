import { getUri } from "@/shared";
import { ShareEntiry, UserInfo } from "@/shared/entity/share";
import useSWR from "swr";

export type ShareListResp = (ShareEntiry & { userInfo: UserInfo })[];

export function useShareList(did?: string) {
  return useSWR(
    did
      ? getUri("/api/share", {
          did,
        })
      : undefined,
    (uri) => fetch(uri).then<ShareListResp>((ret) => ret.json()),
    {
      // revalidateOnFocus: false,
    }
  );
}
