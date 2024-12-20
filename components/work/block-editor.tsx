"use client";
import { ChangeEvent, FC, useRef, KeyboardEvent } from "react";
import Editor from "@/components/work/editor";
import { TiptapCollabProvider } from "@hocuspocus/provider";
import { useParams } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Doc as YDoc } from "yjs";
import { useSession } from "next-auth/react";
import Header from "./header";
import { useStore } from "@/store/menu";
import { emitter, EventEnum } from "@/shared/utils/event";
import { updateTitle } from "@/actions/menu";
import { isEnter } from "@/shared/hotkey";

const BlockEditor: FC = () => {
  const { id } = useParams();

  const inputRef = useRef<HTMLInputElement>(null);
  const [provider, setProvider] = useState<TiptapCollabProvider | undefined>();
  const [collabToken, setCollabToken] = useState<string | null | undefined>();
  const session = useSession();
  const ydoc = useMemo(() => new YDoc(), []);
  const title = useStore((state) => state.activeItem?.title);

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      try {
        const response = await fetch("/api/collaboration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            "No collaboration token provided, please set TIPTAP_COLLAB_SECRET in your environment"
          );
        }
        const data = await response.json();

        const { token } = data;

        // set state when the data received
        setCollabToken(token);
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message);
        }
        setCollabToken(null);
        return;
      }
    };

    dataFetch();
  }, []);

  useLayoutEffect(() => {
    if (collabToken) {
      setProvider(
        new TiptapCollabProvider({
          name: `doc${id}`,
          appId: process.env.NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID ?? "",
          token: collabToken,
          document: ydoc,
        })
      );
    }
  }, [id, ydoc, collabToken]);

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      emitter.emit(EventEnum.MENU_UPDATE_TITLE, {
        title: value,
        id,
        callback: () => {
          // editor?.chain().focus().run();
          updateTitle(String(id), value);
        },
      });
    }
  };

  const handlerKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isEnter(e)) {
      e.preventDefault();
      // TODO:focus of editor
      // editor?.chain().focus().run();
    }
  };

  return (
    <div className="relative flex flex-col flex-1 h-full overflow-hidden">
      <Header />
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
          {provider && collabToken && session.data && (
            <Editor ydoc={ydoc} provider={provider} session={session.data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockEditor;
