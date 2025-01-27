import { DocumentVO } from "@/shared";
import { devtools } from "zustand/middleware";
import { createSelectors } from "./utils";
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/vanilla/shallow";
import { immer } from "zustand/middleware/immer";

interface MenuState {
  activeItem?: Partial<DocumentVO>;
  isNotFound: boolean;
}

export const useStore = createSelectors(
  createWithEqualityFn<MenuState>()(
    devtools(
      immer((set) => ({
        activeItem: undefined,
        isNotFound: false,
      })),
      { name: "menu-store" }
    ),
    shallow // 默认是 Object.is
  )
);
// 默认情况下，set函数执行浅合并。如果需要将状态完全替换为新状态，请使用replace设置为true
