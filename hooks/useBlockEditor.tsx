import { ExtensionKit } from '@/extensions/extension-kit';
import { useEditor } from '@tiptap/react';

export const useBlockEditor = () => {
  const editor = useEditor({
    extensions: ExtensionKit(),
    content: `
      <p>
        This is a radically reduced version of Tiptap. It has support for a document, with paragraphs and text. That’s it. It’s probably too much for real minimalists though.
      </p>
      <p>
        The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.
      </p>
    `,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        class: 'focus:outline-none prose',
        style: 'padding-bottom: 200px',
      },
    },
  });

  return {
    editor,
  };
};
