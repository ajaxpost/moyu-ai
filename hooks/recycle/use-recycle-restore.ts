import useSWRMutation from "swr/mutation";

export function useRecycleRestore() {
  return useSWRMutation("/api/recycle", (uri, { arg }: { arg: string[] }) =>
    fetch(uri, {
      method: "PUT",
      body: JSON.stringify({
        ids: arg,
      }),
    }).then((ret) => ret.json())
  );
}
