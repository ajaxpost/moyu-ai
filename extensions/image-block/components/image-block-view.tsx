/* eslint-disable @next/next/no-img-element */
import { Spinner } from "@/components/ui/spiner";
import { cn } from "@/lib/utils";
import { Node } from "@tiptap/pm/model";
import { Editor, NodeViewWrapper } from "@tiptap/react";
import { useCallback, useMemo, useRef } from "react";
import { PhotoProvider, PhotoView } from "react-image-previewer";
import { SlideToolbar, CloseButton } from "react-image-previewer/ui";

interface ImageBlockViewProps {
  editor: Editor;
  getPos: () => number;
  node: Node;
  updateAttributes: (attrs: Record<string, string>) => void;
  selected: boolean;
}

export const ImageBlockView = (props: ImageBlockViewProps) => {
  const { editor, getPos, node, selected } = props as ImageBlockViewProps & {
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

  const getAllImages = useCallback(() => {
    const images: Node[] = [];
    editor.state.doc.descendants((node) => {
      if (node.type.name === "imageBlock") {
        images.push(node);
      }
    });
    return images;
  }, [editor.state.doc]);

  const images = useMemo(() => getAllImages(), [getAllImages]);

  return (
    <NodeViewWrapper>
      <div
        className={cn(`${wrapperClassName} relative`, {
          "cursor-zoom-in": selected,
        })}
        style={{ width: node.attrs.width }}
      >
        <div contentEditable={false} ref={imageWrapperRef}>
          {selected ? (
            <PhotoProvider
              overlayRender={(props) => {
                const { onClose } = props;
                return (
                  <>
                    <SlideToolbar {...props} />
                    <CloseButton onClick={onClose} />
                  </>
                );
              }}
            >
              {images.map((item, index) => {
                const viewSrc = item.attrs.src;
                return (
                  <PhotoView key={index} src={viewSrc}>
                    {viewSrc === src ? (
                      <img
                        className={cn("block", {
                          "opacity-[0.2]": loading,
                        })}
                        src={viewSrc}
                        alt=""
                        onClick={onClick}
                      />
                    ) : undefined}
                  </PhotoView>
                );
              })}
            </PhotoProvider>
          ) : (
            <img
              className={cn("block", {
                "opacity-[0.2]": loading,
              })}
              src={src}
              alt=""
              onClick={onClick}
            />
          )}
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
