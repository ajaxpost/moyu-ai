"use client";
import { ChangeEvent, FC, useRef, KeyboardEvent, useLayoutEffect } from "react";
import Editor from "@/components/work/editor";
import { HocuspocusProvider, WebSocketStatus } from "@hocuspocus/provider";
import { useEffect, useMemo, useState } from "react";
import { Doc as YDoc } from "yjs";
import Header from "./header";
import { emitter, EventEnum } from "@/shared/utils/event";
import { updateTitle } from "@/actions/menu";
import { isEnter } from "@/shared/hotkey";
import { useStore } from "@/store/menu";
import { useStore as useEditorStore } from "@/store/editor";
import { DocumentVO, isHomeId, WS_Provider_URL } from "@/shared";
import { isEmpty } from "lodash-es";
import { Session } from "next-auth";
import { PermissionEnum, PowerEnum } from "@/shared/enum";
import { LoadingPage } from "../loading";
import Home from "./home";
import NotFound from "./not-found";
import EditorFooter from "./editor-footer";

interface IProps {
  doc: DocumentVO | undefined | null;
  session: Session | null;
}
// 不使用 next router 进行跳转，因为会导致 page 重新渲染，这里我们采用 软链接
const BlockEditor: FC<IProps> = ({ doc, session }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [provider, setProvider] = useState<HocuspocusProvider | undefined>(
    undefined
  );
  const [collabState, setCollabState] = useState<WebSocketStatus>(
    provider ? WebSocketStatus.Connecting : WebSocketStatus.Disconnected
  );
  const [isReadonly, setIsReadonly] = useState(true);
  const [footerShow, setFooterShow] = useState(false);
  const activeItem = useStore((state) => state.activeItem);

  const id = activeItem?.id === isHomeId ? undefined : activeItem?.id;

  const userId = activeItem?.uid ?? doc?.uid;
  const permission =
    activeItem?.permission?.permission ?? doc?.permission?.permission;
  const sharePower =
    activeItem?.currentShare?.power ?? doc?.currentShare?.power;
  const isNotFound = useStore((state) => state.isNotFound);
  const characters = useEditorStore.use.characters();

  const isAdmin = useMemo(
    () => userId === session?.user.id,
    [userId, session?.user.id]
  );

  const ydoc = useMemo(() => new YDoc(), [id]);

  useLayoutEffect(() => {
    if (isEmpty(doc)) {
      useStore.setState((o) => ({
        ...o,
        isNotFound: true,
      }));
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
          const item = event.state;
          useStore.setState({
            activeItem: {
              ...item,
              id,
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
    setFooterShow(false);
    setCollabState(WebSocketStatus.Connecting);
    const timer = setTimeout(() => {
      setFooterShow(true);
    }, 800);
    return () => {
      clearTimeout(timer);
    };
  }, [id]);

  useEffect(() => {
    if (!userId || !id) return;
    let token: string = isAdmin ? userId : "readonly";
    if (
      !isAdmin &&
      (permission === PermissionEnum.PUBLIC_RW || sharePower === PowerEnum.EDIT)
    ) {
      token = userId;
    }
    const provider = new HocuspocusProvider({
      url: WS_Provider_URL,
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
      provider?.disconnect();
      provider?.destroy();
    };
  }, [ydoc, userId]);

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

  if (!activeItem)
    return <LoadingPage message="Please wait while we load your content..." />;

  if (activeItem?.id === isHomeId) {
    return <Home />;
  }

  if (isNotFound) {
    return <NotFound />;
  }

  return (
    <div className="relative flex flex-col flex-1 h-full overflow-hidden">
      <Header permission={permission} isAdmin={isAdmin} />
      <div
        className="flex overflow-auto relative z-10"
        style={{
          height: "calc(100vh - 50px)",
        }}
        id="scroll-wrap"
      >
        <div className="mx-auto mb-20 mt-8 w-[880px]" id="editor-wrap">
          <div className="mx-10 mb-6">
            <input
              ref={inputRef}
              value={activeItem?.title ?? doc?.title ?? ""}
              className="border-input placeholder:text-muted-foreground flex h-10 w-full rounded-md border border-none bg-background p-0 text-4xl font-bold ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-transparent focus-visible:ring-offset-2 disabled:cursor-not-allowed"
              placeholder="请输入标题..."
              maxLength={100}
              onChange={handlerChange}
              onKeyDown={handlerKeyDown}
              readOnly={isReadonly}
              disabled={!!activeItem?.currentShare}
            />
          </div>
          {isReadonly && collabState === WebSocketStatus.Connected && (
            <p className="mx-10 my-6 text-sm text-muted-foreground">
              只读文档，你不能编辑
            </p>
          )}
          <Editor
            provider={provider}
            collabState={collabState}
            session={session}
            isReadonly={isReadonly}
          />
        </div>
        {footerShow &&
          collabState === WebSocketStatus.Connected &&
          characters === 0 && <EditorFooter />}
      </div>
    </div>
  );
};

export default BlockEditor;
