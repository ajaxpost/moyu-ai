'use client';

import { useBlockEditor } from '@/hooks/useBlockEditor';
import { EditorContent } from '@tiptap/react';
import './index.css';

export default function Editor() {
  const { editor } = useBlockEditor();

  return (
    <div className="mx-auto mb-20 mt-8 w-[880px]">
      <div className="mx-10 mb-6">
        <input
          className="border-input placeholder:text-muted-foreground flex h-10 w-full rounded-md border border-none bg-background p-0 text-4xl font-bold ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-transparent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="请输入标题..."
          autoFocus
          maxLength={100}
        />
      </div>
      <EditorContent editor={editor} className="focus:outline-none" />
    </div>
  );
}
