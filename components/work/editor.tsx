"use client";

import { useEffect } from "react";
import { useBlockEditor } from "@/hooks/useBlockEditor";
import { EditorContent } from "@tiptap/react";
import { useStore as useEditorStore } from "@/store/editor";
import { TiptapCollabProvider, WebSocketStatus } from "@hocuspocus/provider";
import { Doc as YDoc } from "yjs";
import { Session } from "next-auth";
import { Skeleton } from "../ui/skeleton";
import ImageBlockMenu from "@/extensions/image-block/components/image-block-menu";
import "./editor.css";

interface IProps {
  provider: TiptapCollabProvider;
  ydoc: YDoc;
  session: Session;
}

export default function Editor({ ydoc, provider, session }: IProps) {
  const { editor, users, collabState, characters } = useBlockEditor({
    provider,
    ydoc,
    user: session.user || {
      name: "anonymous",
      image: "",
      email: "",
      id: "anonymous",
    },
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
