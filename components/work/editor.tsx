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
import { Skeleton } from "../ui/skeleton";

interface IProps {
  provider: HocuspocusProvider;
  ydoc: YDoc;
  session: Session;
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

  return collabState !== WebSocketStatus.Connected ? (
    <>
      <Skeleton className="w-full h-[20px] rounded-md mb-2 mx-10" />
      <Skeleton className="w-full h-[20px] rounded-md mb-2 mx-10" />
      <Skeleton className="w-1/2 h-[20px] rounded-md mb-2 mx-10" />
    </>
  ) : (
    <>
      <EditorContent editor={editor} className="focus:outline-none" />
      <ImageBlockMenu editor={editor} />
    </>
  );
}
