"use client";
import { ChangeEvent, FC, useRef, KeyboardEvent, useLayoutEffect } from "react";
import Editor from "@/components/work/editor";
import { HocuspocusProvider, WebSocketStatus } from "@hocuspocus/provider";
import { useEffect, useMemo, useState } from "react";
import { Doc as YDoc } from "yjs";
import { useSession } from "next-auth/react";
import Header from "./header";
import { emitter, EventEnum } from "@/shared/utils/event";
import { updateTitle } from "@/actions/menu";
import { isEnter } from "@/shared/hotkey";
import { PermissionEnum } from "@/shared/enum";
import { useStore } from "@/store/menu";
import { DocumentVO, isHomeId } from "@/shared";
import { isEmpty, omit } from "lodash-es";
import { notFound } from "next/navigation";

interface IProps {
  doc: DocumentVO & {
    permission: PermissionEnum;
  };
}

const BlockEditor: FC<IProps> = ({ doc }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [provider, setProvider] = useState<HocuspocusProvider | undefined>(
    undefined
  );
  const [collabState, setCollabState] = useState<WebSocketStatus>(
    provider ? WebSocketStatus.Connecting : WebSocketStatus.Disconnected
  );
  const [isReadonly, setIsReadonly] = useState(true);
  const session = useSession();
  const activeItem = useStore((state) => state.activeItem);

  const id = activeItem?.id === isHomeId ? undefined : activeItem?.id;

  const userId = activeItem?.uid ?? doc?.uid;
  const permission = doc?.permission;

  const isAdmin = useMemo(
    () => userId === session.data?.user.id,
    [userId, session.data?.user.id]
  );

  const ydoc = useMemo(() => new YDoc(), [id]);

  useLayoutEffect(() => {
    if (isEmpty(omit(doc, "permission"))) {
      useStore.setState((o) => ({
        ...o,
        isNotFound: true,
      }));
      notFound();
    }
    const controller = new AbortController();
    // 监听 popstate 事件
    window.addEventListener(
      "popstate",
      function (event) {
        const regex = /\/work\/([^\/]+)/;
        const pathname = location.pathname;
        const match = pathname.match(regex);
        if (match) {
          const id = match[1];
          const { title } = event.state;
          useStore.setState({
            activeItem: {
              id,
              title,
            },
          });
        }
      },
      {
        signal: controller.signal,
      }
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("doc_title", activeItem?.title ?? doc?.title ?? "");
  }, [activeItem?.title, doc?.title]);

  useEffect(() => {
    if (!userId || !id) return;
    const token: string = isAdmin ? userId : "readonly";
    const provider = new HocuspocusProvider({
      url: "ws://112.126.23.48:9090",
      name: `doc_${id}`,
      document: ydoc,
      token,
      // awareness: new Awareness(), // 感知
      onStatus: (status) => {
        setCollabState(status.status);
      },
      onAuthenticated() {
        if (token === "readonly") {
          setIsReadonly(true);
        } else {
          setIsReadonly(false);
        }
      },
    });
    setProvider(provider);
    return () => {
      provider.disconnect();
      provider.destroy();
    };
  }, [ydoc, isAdmin, userId, id]);

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    useStore.setState({
      activeItem: {
        ...activeItem,
        title: value,
      },
    });
    emitter.emit(EventEnum.MENU_UPDATE_TITLE, {
      title: value,
      id,
      callback: () => {
        // editor?.chain().focus().run();
        updateTitle(String(id), value);
      },
    });
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
      <Header permission={permission} isAdmin={isAdmin} />
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
              value={activeItem?.title ?? doc?.title ?? ""}
              className="border-input placeholder:text-muted-foreground flex h-10 w-full rounded-md border border-none bg-background p-0 text-4xl font-bold ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-transparent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="请输入标题..."
              maxLength={100}
              onChange={handlerChange}
              onKeyDown={handlerKeyDown}
              readOnly={isReadonly}
            />
          </div>
          <Editor
            ydoc={ydoc}
            provider={provider}
            collabState={collabState}
            session={session.data}
            isReadonly={isReadonly}
          />
        </div>
      </div>
    </div>
  );
};

export default BlockEditor;
