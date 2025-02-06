import { Editor, NodeViewWrapper } from "@tiptap/react";
import { useCallback } from "react";
import { ImageUploader } from "./image-uploader";

export const ImageUpload = ({
  getPos,
  editor,
}: {
  getPos: () => number;
  editor: Editor;
}) => {
  const onUpload = useCallback(
    (url: string, loading: boolean) => {
      if (url) {
        editor
          .chain()
          .focus()
          .deleteRange({ from: getPos(), to: getPos() })
          .setImageBlock({ src: url, loading })
          .run();
      }
    },
    [getPos, editor]
  );

  return (
    <NodeViewWrapper>
      <div className="m-0 p-0" data-drag-handle>
        <ImageUploader onUpload={onUpload} />
      </div>
    </NodeViewWrapper>
  );
};

export default ImageUpload;
