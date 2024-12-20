import { FC } from "react";
import { Editor } from "@tiptap/core";
import { BubbleMenu } from "@tiptap/react";

interface IProps {
  editor: Editor | null;
}

const ImageBlockMenu: FC<IProps> = ({ editor }) => {
  const shouldShow = ({ editor }: { editor: Editor }) => {
    const isActive = editor.isActive("imageBlock");
    return isActive;
  };

  // TODO
  return (
    <BubbleMenu
      editor={editor}
      pluginKey="image-block-menu"
      updateDelay={0}
      shouldShow={shouldShow}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        // sticky: "popper",
      }}
    >
      ImageBlockMenu
    </BubbleMenu>
  );
};

export default ImageBlockMenu;
