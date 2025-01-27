import { css } from "@emotion/css";
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";

export default function CodeBlockComponent({
  node: { attrs },
  updateAttributes,
  extension,
  HTMLAttributes,
}: NodeViewProps) {
  return (
    <NodeViewWrapper {...HTMLAttributes} className="relative">
      <select
        contentEditable={false}
        className={css`
          position: absolute;
          background-color: #fff;
          right: 0.5rem;
          top: 0.5rem;
          z-index: 10;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="Black" d="M7 10l5 5 5-5z"/></svg>');
          background-repeat: no-repeat;
          background-position: right 0.1rem center;
          background-size: 1.25rem 1.25rem;
          padding-right: 1.25rem;
        `}
        defaultValue={attrs.language}
        onChange={(event) => updateAttributes({ language: event.target.value })}
      >
        <option value="null">auto</option>
        <option disabled>—</option>
        {extension.options.lowlight.listLanguages().map((lang: string) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
        <option value="js">js</option>
        <option value="ts">ts</option>
      </select>
      <pre
        className={css`
          position: relative;
          tab-size: 2;
        `}
      >
        <NodeViewContent
          as="code"
          onKeyDown={(e: React.KeyboardEvent) => {
            // 处理Tab键
            if (e.key === "Tab") {
              e.preventDefault();
              const selection = window.getSelection();
              const range = selection?.getRangeAt(0);

              if (range) {
                try {
                  const tabNode = document.createTextNode("  ");
                  range.insertNode(tabNode);
                  range.setStartAfter(tabNode);
                  range.setEndAfter(tabNode);
                } catch (error) {
                  console.warn("Failed to handle tab key:", error);
                }
              }
            }
          }}
        />
      </pre>
    </NodeViewWrapper>
  );
}
