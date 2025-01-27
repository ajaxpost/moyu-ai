import { EditorUser } from "@/hooks/useBlockEditor";
import { WebSocketStatus } from "@hocuspocus/provider";
import { devtools } from "zustand/middleware";
import { createSelectors } from "./utils";
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/vanilla/shallow";
import { immer } from "zustand/middleware/immer";
import { TableOfContentData } from "@tiptap-pro/extension-table-of-contents";

interface EditorState {
  users: EditorUser[];
  characters: number;
  collabState: WebSocketStatus;
  toc: TableOfContentData;
}

export const useStore = createSelectors(
  createWithEqualityFn<EditorState>()(
    devtools(
      immer((set) => ({
        users: [],
        characters: 0,
        collabState: WebSocketStatus.Connecting,
        toc: [],
      })),
      { name: "editor-store" }
    ),
    shallow // 默认是 Object.is
  )
);
// 默认情况下，set函数执行浅合并。如果需要将状态完全替换为新状态，请使用replace设置为true
