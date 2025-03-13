"use client";

import { useEffect, KeyboardEvent, useRef, useState } from "react";
import { useBlockEditor } from "@/hooks/useBlockEditor";
import { EditorContent } from "@tiptap/react";
import { useStore as useEditorStore } from "@/store/editor";
import { WebSocketStatus, HocuspocusProvider } from "@hocuspocus/provider";
import { Session } from "next-auth";
import ImageBlockMenu from "@/extensions/image-block/components/image-block-menu";
import { Skeleton } from "../ui/skeleton";
import { isSave } from "@/shared/hotkey";
import TextMenu from "./menus/text-menu";
import LinkMenu from "./menus/link-menu";
import { TableColumnMenu, TableRowMenu } from "@/extensions/table/menus";
import SidePanel from "./side-panel";
import { emitter, EventEnum } from "@/shared/utils/event";
import "./editor.scss";
import { EDITOR_TEMPLATE, isHomeId } from "@/shared";
import { useStore } from "@/store/menu";

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
  const menuContainerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const { editor, users, characters, toc } = useBlockEditor({
    provider,
    user: session?.user || {
      name: "anonymous",
      image: "",
      email: "",
      id: "anonymous",
    },
    isReadonly,
  });
  const activeItem = useStore((state) => state.activeItem);

  const id = activeItem?.id === isHomeId ? undefined : activeItem?.id;

  useEffect(() => {
    if (!editor) return;
    emitter.on(EventEnum.EDITOR_TEMPLATE, (payload) => {
      const type = payload.type;
      const content = EDITOR_TEMPLATE[type];
      editor.commands.insertContent(content);
    });

    return () => {
      emitter.off(EventEnum.EDITOR_TEMPLATE);
    };
  }, [editor]);

  useEffect(() => {
    if (users?.length) {
      useEditorStore.setState({
        users,
        collabState,
        characters,
      });
    }
  }, [users, collabState, characters]);

  useEffect(() => {
    setLoading(true);
  }, [id]);

  useEffect(() => {
    if (editor && collabState === WebSocketStatus.Connected && provider) {
      if (characters > 0) {
        setLoading(false);
      } else {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 600);
        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [collabState, provider, editor, characters]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (isSave(e)) {
      e.preventDefault();
    }
    if (e.key === "Tab") {
      // 检查当前节点是否为列表项
      const isList =
        editor?.isActive("bulletList") ||
        editor?.isActive("orderedList") ||
        editor?.isActive("taskList");

      if (!isList) {
        e.preventDefault();
        if (editor) {
          editor.commands.insertContent("\t");
        }
      } else {
        // 在列表中，需要阻止默认行为并手动处理缩进
        e.preventDefault();
        if (editor && !e.shiftKey) {
          editor.commands.sinkListItem("listItem");
        }
      }
    }
  };

  return loading || !editor ? (
    <>
      <Skeleton className="w-full h-[20px] rounded-md mb-2 mx-10" />
      <Skeleton className="w-full h-[20px] rounded-md mb-2 mx-10" />
      <Skeleton className="w-1/2 h-[20px] rounded-md mb-2 mx-10" />
    </>
  ) : (
    <div
      ref={menuContainerRef}
      className="mr-[var(--viewer-center-align-right)] relative"
    >
      <LinkMenu editor={editor} appendTo={menuContainerRef} />
      <TextMenu editor={editor} />
      <ImageBlockMenu editor={editor} />
      <TableRowMenu editor={editor} appendTo={menuContainerRef} />
      <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
      <EditorContent
        editor={editor}
        onKeyDown={onKeyDown}
        className="focus:outline-none"
      />
      {/* sidePanel */}
      <SidePanel editor={editor} toc={toc} />
    </div>
  );
}
