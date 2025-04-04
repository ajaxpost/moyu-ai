/* eslint-disable @next/next/no-img-element */
import { Spinner } from "@/components/ui/spiner";
import { cn } from "@/lib/utils";
import { Node } from "@tiptap/pm/model";
import { Editor, NodeViewWrapper } from "@tiptap/react";
import { useCallback, useRef } from "react";

interface ImageBlockViewProps {
  editor: Editor;
  getPos: () => number;
  node: Node;
  updateAttributes: (attrs: Record<string, string>) => void;
}

export const ImageBlockView = (props: ImageBlockViewProps) => {
  const { editor, getPos, node } = props as ImageBlockViewProps & {
    node: Node & {
      attrs: {
        src: string;
        loading: boolean;
      };
    };
  };
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const { src, loading } = node.attrs;

  const wrapperClassName = cn(
    node.attrs.align === "left" ? "ml-0" : "ml-auto",
    node.attrs.align === "right" ? "mr-0" : "mr-auto",
    node.attrs.align === "center" && "mx-auto"
  );

  const onClick = useCallback(() => {
    editor.commands.setNodeSelection(getPos());
  }, [getPos, editor.commands]);

  return (
    <NodeViewWrapper>
      <div
        className={`${wrapperClassName} relative`}
        style={{ width: node.attrs.width }}
      >
        <div contentEditable={false} ref={imageWrapperRef}>
          <img
            className={cn("block", {
              "opacity-[0.2]": loading,
            })}
            src={src}
            alt=""
            onClick={onClick}
          />
        </div>
        {loading && (
          <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Spinner className="text-neutral-500" size={1.5} />
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};

export default ImageBlockView;
