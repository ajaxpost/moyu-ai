import { DocumentVO } from "@/shared";
import { createContext, Dispatch, SetStateAction } from "react";

export const MenuContext = createContext<{
  doList: () => Promise<DocumentVO[] | undefined>;
  setSelectedKeys: Dispatch<SetStateAction<string[]>>;
  onDelDoc: (ids: string[]) => void;
  onAddDoc: (pid?: string) => void;
}>({
  doList: async () => {
    return undefined;
  },
  setSelectedKeys: () => {},
  onDelDoc: () => {},
  onAddDoc: () => {},
});
