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
} from ".";
import CodeBlockComponent from "./code-block-component";
import { uploadImage } from "@/actions/oss";

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
  FileHandler.configure({
    allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
    onDrop: (currentEditor, files, pos) => {
      files.forEach(async (file) => {
        const result = await uploadImage(file);
        const url = result?.url;
        if (url) {
          currentEditor
            .chain()
            .setImageBlockAt({ pos, src: url })
            .focus()
            .run();
        }
      });
    },
    onPaste: (currentEditor, files) => {
      files.forEach(async (file) => {
        const result = await uploadImage(file);
        const url = result?.url;
        if (url) {
          return currentEditor
            .chain()
            .setImageBlockAt({
              pos: currentEditor.state.selection.anchor,
              src: url,
            })
            .focus()
            .run();
        } else {
          alert("找不到图片地址，请稍后重试，谢谢配合");
        }
      });
    },
  }),
  Focus,
  TrailingNode,
];
