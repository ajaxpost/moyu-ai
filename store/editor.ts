import { EditorUser } from "@/hooks/useBlockEditor";
import { WebSocketStatus } from "@hocuspocus/provider";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface EditorState {
  users: EditorUser[];
  characters: number;
  collabState: WebSocketStatus;
}

export const useStore = create<EditorState>()(
  devtools(
    () => ({
      users: [],
      characters: 0,
      collabState: WebSocketStatus.Connecting,
    }),
    { name: "editor-store" }
  )
);
