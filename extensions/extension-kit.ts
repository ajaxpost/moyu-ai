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
} from ".";
import CodeBlockComponent from "./code-block-component";

const lowlight = createLowlight(all);

export const ExtensionKit = () => [
  StarterKit.configure({
    codeBlock: false,
    horizontalRule: false,
    history: false,
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
];
