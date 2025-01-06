"use client";

import { useEffect } from "react";
import { useBlockEditor } from "@/hooks/useBlockEditor";
import { EditorContent } from "@tiptap/react";
import { useStore as useEditorStore } from "@/store/editor";
import { WebSocketStatus, HocuspocusProvider } from "@hocuspocus/provider";
import { Doc as YDoc } from "yjs";
import { Session } from "next-auth";
import ImageBlockMenu from "@/extensions/image-block/components/image-block-menu";
import "./editor.css";

interface IProps {
  provider?: HocuspocusProvider;
  ydoc: YDoc;
  session: Session | null;
  collabState: WebSocketStatus;
  isReadonly: boolean;
}

export default function Editor({
  ydoc,
  provider,
  session,
  collabState,
  isReadonly,
}: IProps) {
  const { editor, users, characters } = useBlockEditor({
    provider,
    ydoc,
    user: session?.user || {
      name: "anonymous",
      image: "",
      email: "",
      id: "anonymous",
    },
    isReadonly,
  });

  useEffect(() => {
    if (users?.length) {
      useEditorStore.setState({
        users,
        collabState,
        characters,
      });
    }
  }, [users, collabState, characters]);

  return (
    <div>
      <ImageBlockMenu editor={editor} />
      <EditorContent editor={editor} className="focus:outline-none" />
    </div>
  );
}
