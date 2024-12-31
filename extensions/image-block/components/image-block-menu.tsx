import { FC, useCallback } from "react";
import { Editor } from "@tiptap/core";
import { BubbleMenu, useEditorState } from "@tiptap/react";
import { Toolbar } from "@/components/ui/toolbar";
import { Icon } from "@/components/ui/icon";
import { sticky } from "tippy.js";
import { ImageBlockWidth } from "./image-block-width";

interface IProps {
  editor: Editor | null;
}

const ImageBlockMenu: FC<IProps> = ({ editor }) => {
  const shouldShow = ({ editor }: { editor: Editor }) => {
    const isActive = editor.isActive("imageBlock");
    return isActive;
  };

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isImageLeft: ctx.editor?.isActive("imageBlock", { align: "left" }),
        isImageCenter: ctx.editor?.isActive("imageBlock", {
          align: "center",
        }),
        isImageRight: ctx.editor?.isActive("imageBlock", {
          align: "right",
        }),
        width: parseInt(ctx.editor?.getAttributes("imageBlock")?.width || 0),
      };
    },
  });
  const {
    isImageLeft,
    isImageCenter,
    isImageRight,
    width = 0,
  } = editorState || {};

  const onAlignImageLeft = useCallback(() => {
    editor
      ?.chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageBlockAlign("left")
      .run();
  }, [editor]);

  const onAlignImageCenter = useCallback(() => {
    editor
      ?.chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageBlockAlign("center")
      .run();
  }, [editor]);

  const onAlignImageRight = useCallback(() => {
    editor
      ?.chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageBlockAlign("right")
      .run();
  }, [editor]);

  const onWidthChange = useCallback(
    (value: number) => {
      editor
        ?.chain()
        .focus(undefined, { scrollIntoView: false })
        .setImageBlockWidth(value)
        .run();
    },
    [editor]
  );

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="image-block-menu"
      updateDelay={0}
      shouldShow={shouldShow}
      className="bbb-m"
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        // getReferenceClientRect,
        // onCreate: (instance: Instance) => {
        //   tippyInstance.current = instance;
        // },
        // appendTo: () => {
        //   return appendTo?.current;
        // },
        plugins: [sticky],
        sticky: "popper",
      }}
    >
      <Toolbar.Wrapper>
        <Toolbar.Button
          tooltip="图像左对齐"
          active={isImageLeft}
          onClick={onAlignImageLeft}
        >
          <Icon name="AlignHorizontalDistributeStart" />
        </Toolbar.Button>
        <Toolbar.Button
          tooltip="图像居中"
          active={isImageCenter}
          onClick={onAlignImageCenter}
        >
          <Icon name="AlignHorizontalDistributeCenter" />
        </Toolbar.Button>
        <Toolbar.Button
          tooltip="图像右对齐"
          active={isImageRight}
          onClick={onAlignImageRight}
        >
          <Icon name="AlignHorizontalDistributeEnd" />
        </Toolbar.Button>
        <Toolbar.Divider />
        <ImageBlockWidth onChange={onWidthChange} value={width} />
      </Toolbar.Wrapper>
    </BubbleMenu>
  );
};

export default ImageBlockMenu;
