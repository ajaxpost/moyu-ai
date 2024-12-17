import { DocumentVO } from "@/shared";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface MenuState {
  activeItem?: Partial<DocumentVO>;
}

export const useStore = create<MenuState>()(
  devtools(
    () => ({
      activeItem: undefined,
    }),
    { name: "menu-store" }
  )
);
