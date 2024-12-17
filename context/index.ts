import { DocumentVO } from "@/shared";
import { MenuOptimisticEnum } from "@/shared/enum";
import { createContext, Dispatch, SetStateAction } from "react";

export const MenuContext = createContext<{
  addOptimisticMenus: (action: {
    type: MenuOptimisticEnum;
    pid: number;
  }) => void;
  doList: () => Promise<DocumentVO[] | undefined>;
  setSelectedKeys: Dispatch<SetStateAction<number[]>>;
}>({
  addOptimisticMenus: () => {},
  doList: async () => {
    return undefined;
  },
  setSelectedKeys: () => {},
});
