import { DocumentVO } from "@/shared";
import useSWR from "swr";

interface Resp {
  data: DocumentVO[];
}

export function useRecycleList() {
  return useSWR(
    "/api/recycle",
    (uri) => fetch(uri).then<Resp>((ret) => ret.json()),
    {
      revalidateOnFocus: false,
    }
  );
}
