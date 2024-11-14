import { ReactNodeViewRenderer } from '@tiptap/react';
import { all, createLowlight } from 'lowlight';
import { CodeBlockLowlight, StarterKit } from '.';
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
];
