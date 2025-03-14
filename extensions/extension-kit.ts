import { ReactNodeViewRenderer } from "@tiptap/react";
import { all, createLowlight } from "lowlight";
import {
  CodeBlockLowlight,
  Highlight,
  HorizontalRule,
  ImageBlock,
  ImageUpload,
  Placeholder,
  SlashCommand,
  StarterKit,
  TextAlign,
  Typography,
  CharacterCount,
  TaskItem,
  TaskList,
  Underline,
  Color,
  TextStyle,
  Subscript,
  Superscript,
  Link,
  FileHandler,
  Focus,
  TrailingNode,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  UniqueID,
  TableOfContents,
  Heading,
  HeadingAutoConvert,
} from ".";
import CodeBlockComponent from "./code-block-component";
import { uploadImage } from "@/actions/oss";
import { isChangeOrigin } from "@tiptap/extension-collaboration";
import {
  getHierarchicalIndexes,
  TableOfContentData,
} from "@tiptap-pro/extension-table-of-contents";

const lowlight = createLowlight(all);

interface IProps {
  setToc: (toc: TableOfContentData) => void;
}

export const ExtensionKit = ({ setToc }: IProps) => [
  StarterKit.configure({
    codeBlock: false,
    horizontalRule: false,
    history: false,
    heading: false,
  }),
  CodeBlockLowlight.configure({
    lowlight,
    defaultLanguage: "javascript",
  }).extend({
    addNodeView() {
      return ReactNodeViewRenderer(CodeBlockComponent);
    },
  }),
  Highlight.configure({ multicolor: true }),
  Typography,
  TextAlign.extend({
    addKeyboardShortcuts() {
      return {};
    },
  }).configure({
    types: ["heading", "paragraph"],
  }),
  ImageBlock,
  ImageUpload,
  Placeholder.configure({
    showOnlyCurrent: true,
    includeChildren: false,
    placeholder: "输入 / 设置格式",
  }),
  HorizontalRule,
  SlashCommand,
  CharacterCount.configure({
    limit: 50000,
  }),
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Underline,
  Color,
  TextStyle,
  Subscript,
  Superscript,
  Link.configure({
    openOnClick: false,
    autolink: true,
  }),
  FileHandler.configure({
    allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
    onDrop: (currentEditor, files, pos) => {
      files.forEach(async (file) => {
        const blob = new Blob([file]);
        const temporaryUrl = URL.createObjectURL(blob);
        setTimeout(() => {
          currentEditor
            .chain()
            .focus()
            .deleteRange({ from: pos, to: pos })
            .setImageBlock({ src: temporaryUrl, loading: true })
            .run();
        }, 0);

        const result = await uploadImage(file);
        const url = result?.url;
        if (url) {
          currentEditor
            .chain()
            .focus()
            .deleteRange({ from: pos, to: pos })
            .setImageBlock({ src: url, loading: false })
            .run();
        }
      });
    },
    onPaste: (currentEditor, files) => {
      files.forEach(async (file) => {
        const blob = new Blob([file]);
        const temporaryUrl = URL.createObjectURL(blob);
        const { $anchor, $from } = currentEditor.state.selection;
        setTimeout(() => {
          currentEditor
            .chain()
            .focus()
            .deleteRange({ from: $from.pos, to: $anchor.pos })
            .setImageBlock({
              src: temporaryUrl,
              loading: true,
            })
            .run();
        }, 0);
        const result = await uploadImage(file, true);
        const url = result?.url;
        if (url) {
          return currentEditor
            .chain()
            .focus()
            .deleteRange({ from: $from.pos, to: $anchor.pos })
            .setImageBlock({
              src: url,
              loading: false,
            })
            .run();
        } else {
          alert("找不到图片地址，请稍后重试，谢谢配合");
        }
      });
    },
  }),
  Focus,
  TrailingNode,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  UniqueID.configure({
    types: ["paragraph", "heading", "blockquote", "codeBlock", "table"],
    filterTransaction: (transaction) => !isChangeOrigin(transaction),
  }),
  TableOfContents.configure({
    getIndex: getHierarchicalIndexes,
    onUpdate(content) {
      setToc(content);
    },
    scrollParent: () => {
      return document.getElementById("scroll-wrap")! || window;
    },
  }),
  Heading,
  HeadingAutoConvert,
];
