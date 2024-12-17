"use client";

import { ChangeEvent, useEffect, useRef, KeyboardEvent } from "react";
import { useBlockEditor } from "@/hooks/useBlockEditor";
import { EditorContent } from "@tiptap/react";
import { EventEnum, emitter } from "@/shared/utils/event";
import { updateTitle } from "@/actions/menu";
import { useParams } from "next/navigation";
import { useStore } from "@/store/menu";
import { useStore as useEditorStore } from "@/store/editor";
import { TiptapCollabProvider } from "@hocuspocus/provider";
import { Doc as YDoc } from "yjs";
import { Session } from "next-auth";
import "./editor.css";
import { isEnter } from "@/shared/hotkey";

interface IProps {
  provider: TiptapCollabProvider;
  ydoc: YDoc;
  session: Session;
}

export default function Editor({ ydoc, provider, session }: IProps) {
  const { id } = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const title = useStore((state) => state.activeItem?.title);
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

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      emitter.emit(EventEnum.MENU_UPDATE_TITLE, {
        title: value,
        id,
        callback: () => {
          // editor?.chain().focus().run();
          updateTitle(Number(id), value);
        },
      });
    }
  };

  const handlerKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isEnter(e)) {
      e.preventDefault();
      editor?.chain().focus().run();
    }
  };

  if (!editor || !users || !session) {
    return null;
  }

  return (
    <div
      className="flex overflow-auto"
      style={{
        height: "calc(100vh - 50px)",
      }}
    >
      <div className="mx-auto mb-20 mt-8 w-[880px]">
        <div className="mx-10 mb-6">
          <input
            ref={inputRef}
            defaultValue={title}
            className="border-input placeholder:text-muted-foreground flex h-10 w-full rounded-md border border-none bg-background p-0 text-4xl font-bold ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-transparent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="请输入标题..."
            maxLength={100}
            onChange={handlerChange}
            onKeyDown={handlerKeyDown}
          />
        </div>
        <EditorContent editor={editor} className="focus:outline-none" />
      </div>
    </div>
  );
}
