"use client";

import { useEffect, KeyboardEvent } from "react";
import { useBlockEditor } from "@/hooks/useBlockEditor";
import { EditorContent } from "@tiptap/react";
import { useStore as useEditorStore } from "@/store/editor";
import { WebSocketStatus, HocuspocusProvider } from "@hocuspocus/provider";
import { Session } from "next-auth";
import ImageBlockMenu from "@/extensions/image-block/components/image-block-menu";
import "./editor.css";
import { Skeleton } from "../ui/skeleton";
import { isSave } from "@/shared/hotkey";

interface IProps {
  provider?: HocuspocusProvider;
  session: Session | null;
  collabState: WebSocketStatus;
  isReadonly: boolean;
}

export default function Editor({
  provider,
  session,
  collabState,
  isReadonly,
}: IProps) {
  const { editor, users, characters } = useBlockEditor({
    provider,
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

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (isSave(e)) {
      e.preventDefault();
    }
  };

  return collabState !== WebSocketStatus.Connected || !provider ? (
    <>
      <Skeleton className="w-full h-[20px] rounded-md mb-2 mx-10" />
      <Skeleton className="w-full h-[20px] rounded-md mb-2 mx-10" />
      <Skeleton className="w-1/2 h-[20px] rounded-md mb-2 mx-10" />
    </>
  ) : (
    <div>
      <ImageBlockMenu editor={editor} />
      <EditorContent
        editor={editor}
        onKeyDown={onKeyDown}
        className="focus:outline-none"
      />
    </div>
  );
}
