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
  Highlight,
  Typography,
  TextAlign,
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
];
