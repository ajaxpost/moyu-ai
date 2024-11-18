import { ReactNodeViewRenderer } from '@tiptap/react';
import { all, createLowlight } from 'lowlight';
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
} from '.';
import CodeBlockComponent from './code-block-component';

const lowlight = createLowlight(all);

export const ExtensionKit = () => [
  StarterKit.configure({
    codeBlock: false,
  }),
  CodeBlockLowlight.configure({
    lowlight,
    defaultLanguage: 'javascript',
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
    includeChildren: true,
    placeholder: '输入 / 设置格式',
  }),
  HorizontalRule,
  SlashCommand,
];
