import { css } from '@emotion/css';
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from '@tiptap/react';

export default function CodeBlockComponent({
  node: { attrs },
  updateAttributes,
  extension,
}: NodeViewProps) {
  return (
    <NodeViewWrapper className="relative">
      <select
        contentEditable={false}
        className={css`
          position: absolute;
          background-color: #fff;
          right: 0.5rem;
          top: 0.5rem;
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
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
}
