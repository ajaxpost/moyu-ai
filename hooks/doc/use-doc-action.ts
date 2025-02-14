import { PermissionEnum } from "@/shared/enum";
import useSwrMutation from "swr/mutation";
import { useToast } from "../use-toast";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

export const useDocAdd = () => {
  const { toast } = useToast();
  return useSwrMutation(
    "/api/doc/add",
    (_, { arg }: { arg: { id: string; pid?: string } }) =>
      fetch("/api/doc", {
        method: "POST",
        body: JSON.stringify(arg),
      }),
    {
      onSuccess: async (resp) => {
        const data = await resp.json();
        if (data.code === 200) {
          toast({
            title: "添加成功",
            duration: 2500,
            description: dayjs()
              .locale("zh-cn")
              .format("dddd, MMMM D, YYYY at h:mm A"),
          });
        }
      },
    }
  );
};

export const useDocDel = () => {
  const { toast } = useToast();
  return useSwrMutation(
    "/api/doc/del",
    (_, { arg }: { arg: { ids: string[] } }) =>
      fetch("/api/doc", {
        method: "DELETE",
        body: JSON.stringify(arg),
      }),
    {
      onSuccess: async (resp) => {
        const data = await resp.json();
        if (data.code === 200) {
          toast({
            title: "删除成功",
            duration: 1500,
            // description: dayjs()
            //   .locale("zh-cn")
            //   .format("dddd, MMMM D, YYYY at h:mm A"),
            description: `删除成功，放在回收站`,
          });
        }
      },
    }
  );
};

export const useDocGet = () => {
  return useSwrMutation("/api/doc/get", (_, { arg }: { arg: { id: string } }) =>
    fetch(`/api/doc?id=${arg.id}`, {
      method: "GET",
    })
  );
};

export const useDocUpdatePermission = () => {
  const { toast } = useToast();
  return useSwrMutation(
    "/api/doc/update-permission",
    (_, { arg }: { arg: { id: string; permission: PermissionEnum } }) =>
      fetch("/api/doc", {
        method: "PUT",
        body: JSON.stringify(arg),
      }),
    {
      onSuccess: async (resp) => {
        const data = await resp.json();
        if (data.code === 200) {
          toast({
            title: "权限更新成功",
            duration: 2500,
            description: dayjs()
              .locale("zh-cn")
              .format("dddd, MMMM D, YYYY at h:mm A"),
          });
        }
      },
    }
  );
};
