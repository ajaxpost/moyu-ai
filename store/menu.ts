import { DocumentVO } from "@/shared";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface MenuState {
  activeItem?: Partial<
    DocumentVO & {
      pending: boolean;
    }
  >;
  isNotFound: boolean;
}

export const useStore = create<MenuState>()(
  devtools(
    () => ({
      activeItem: undefined,
      isNotFound: false,
    }),
    { name: "menu-store" }
  )
);
