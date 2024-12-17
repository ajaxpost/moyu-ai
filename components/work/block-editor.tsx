"use client";
import { FC } from "react";
import Editor from "@/components/work/editor";
import { TiptapCollabProvider } from "@hocuspocus/provider";
import { useParams } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Doc as YDoc } from "yjs";
import { useSession } from "next-auth/react";
import Header from "./header";

const BlockEditor: FC = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState<TiptapCollabProvider | undefined>();
  const [collabToken, setCollabToken] = useState<string | null | undefined>();
  const session = useSession();
  const ydoc = useMemo(() => new YDoc(), []);

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

  if (!provider || collabToken === undefined || !session.data) {
    return (
      <div className="relative flex flex-col flex-1 h-full overflow-hidden">
        <Header />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col flex-1 h-full overflow-hidden">
      <Header />
      <Editor ydoc={ydoc} provider={provider} session={session.data} />
    </div>
  );
};

export default BlockEditor;
