import { ExtensionKit } from "@/extensions/extension-kit";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { useEditor, useEditorState } from "@tiptap/react";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import type { Doc as YDoc } from "yjs";
import { randomElement } from "@/lib/utils";
import { userColors } from "@/shared";
import { User } from "next-auth";
import { uniqBy } from "lodash-es";

export type EditorUser = {
  clientId: string;
  name: string;
  color: string;
  initials?: string;
  image?: string;
};

export const useBlockEditor = ({
  provider,
  ydoc,
  user,
  isReadonly,
}: {
  provider: HocuspocusProvider | undefined;
  ydoc: YDoc;
  user: User;
  isReadonly: boolean;
}) => {
  const editor = useEditor(
    {
      extensions: [
        ...ExtensionKit(),
        provider
          ? Collaboration.configure({
              document: ydoc,
            })
          : undefined,
        provider
          ? CollaborationCursor.configure({
              provider,
              user: {
                name: user?.email,
                image: user.image,
                color: randomElement(userColors),
              },
            })
          : undefined,
      ].filter((e) => e !== undefined),
      immediatelyRender: false,
      autofocus: true,
      shouldRerenderOnTransaction: false,
      editable: !isReadonly,
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          class: "focus:outline-none prose",
          style: "padding-bottom: 200px",
        },
      },
    },
    [isReadonly]
  );

  const users = useEditorState({
    editor,
    selector: (ctx): (EditorUser & { initials: string })[] => {
      if (!ctx.editor?.storage.collaborationCursor?.users) {
        return [];
      }
      return uniqBy(
        ctx.editor.storage.collaborationCursor.users.map((user: EditorUser) => {
          const names = user.name?.split(" ");
          const firstName = names?.[0];
          const lastName = names?.[names.length - 1];
          const initials = `${firstName?.[0] || "?"}${lastName?.[0] || "?"}`;
          return { ...user, initials: initials.length ? initials : "?" };
        }),
        "name"
      ) as [];
    },
  }) as EditorUser[];

  const { characters, words } = useEditorState({
    editor,
    selector: (ctx): { characters: number; words: number } => {
      const { characters, words } = ctx.editor?.storage.characterCount || {
        characters: () => 0,
        words: () => 0,
      };
      return { characters: characters(), words: words() };
    },
  }) as {
    characters: number;
    words: number;
  };

  return {
    editor,
    users,
    characters,
    words,
  };
};
