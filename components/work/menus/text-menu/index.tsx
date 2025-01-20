import { FC } from "react";
import { BubbleMenu, Editor } from "@tiptap/react";
import { useTextmenuStates } from "./hooks/useTextmenuStates";
import { Toolbar } from "@/components/ui/toolbar";
import ContextTypePicker from "./components/content-type-picker";
import { useTextmenuContentTypes } from "./hooks/useTextmenuContentTypes";
import { Icon } from "@/components/ui/icon";
import { useTextmenuCommands } from "./hooks/useTextmenuCommands";
import * as Popover from "@radix-ui/react-popover";
import { Surface } from "@/components/ui/surface";
import { ColorPicker } from "@/components/panels";
import { EditLinkPopover } from "./components/edit-link-popover";

interface IProps {
  editor: Editor;
}

const TextMenu: FC<IProps> = ({ editor }) => {
  const commands = useTextmenuCommands(editor);
  const states = useTextmenuStates(editor);
  const blockOptions = useTextmenuContentTypes(editor);

  return (
    <BubbleMenu
      tippyOptions={{
        popperOptions: {
          placement: "top-start",
          modifiers: [
            {
              name: "preventOverflow",
              options: {
                boundary: "viewport",
                padding: 8,
              },
            },
            {
              name: "flip",
              options: {
                fallbackPlacements: ["bottom-start", "top-end", "bottom-end"],
              },
            },
          ],
        },
        maxWidth: "calc(100vw - 16px)",
      }}
      editor={editor}
      pluginKey="textMenu"
      shouldShow={states.shouldShow}
      updateDelay={100}
    >
      <Toolbar.Wrapper>
        <ContextTypePicker options={blockOptions} />
        <Toolbar.Divider />
        <Toolbar.Button
          tooltip="加粗"
          tooltipShortcut={["Mod", "B"]}
          onClick={commands.onBold}
          active={states.isBold}
        >
          <Icon name="Bold" />
        </Toolbar.Button>
        <Toolbar.Button
          tooltip="斜体"
          tooltipShortcut={["Mod", "I"]}
          onClick={commands.onItalic}
          active={states.isItalic}
        >
          <Icon name="Italic" />
        </Toolbar.Button>
        <Toolbar.Button
          tooltip="下划线"
          tooltipShortcut={["Mod", "U"]}
          onClick={commands.onUnderline}
          active={states.isUnderline}
        >
          <Icon name="Underline" />
        </Toolbar.Button>
        <Toolbar.Button
          tooltip="删除线"
          tooltipShortcut={["Mod", "Shift", "S"]}
          onClick={commands.onStrike}
          active={states.isStrike}
        >
          <Icon name="Strikethrough" />
        </Toolbar.Button>
        <Toolbar.Button
          tooltip="行内代码"
          tooltipShortcut={["Mod", "E"]}
          onClick={commands.onCode}
          active={states.isCode}
        >
          <Icon name="Code" />
        </Toolbar.Button>
        <Toolbar.Button tooltip="代码块" onClick={commands.onCodeBlock}>
          <Icon name="FileCode" />
        </Toolbar.Button>
        <EditLinkPopover onSetLink={commands.onLink} />
        <Popover.Root>
          <Popover.Trigger asChild>
            <Toolbar.Button
              active={!!states.currentHighlight}
              tooltip="背景颜色"
            >
              <Icon name="Highlighter" />
            </Toolbar.Button>
          </Popover.Trigger>
          <Popover.Content side="top" sideOffset={8} asChild>
            <Surface className="p-1">
              <ColorPicker
                color={states.currentHighlight}
                onChange={commands.onChangeHighlight}
                onClear={commands.onClearHighlight}
              />
            </Surface>
          </Popover.Content>
        </Popover.Root>
        <Popover.Root>
          <Popover.Trigger asChild>
            <Toolbar.Button active={!!states.currentColor} tooltip="字体颜色">
              <Icon name="Palette" />
            </Toolbar.Button>
          </Popover.Trigger>
          <Popover.Content side="top" sideOffset={8} asChild>
            <Surface className="p-1">
              <ColorPicker
                color={states.currentColor}
                onChange={commands.onChangeColor}
                onClear={commands.onClearColor}
              />
            </Surface>
          </Popover.Content>
        </Popover.Root>
        <Popover.Root>
          <Popover.Trigger asChild>
            <Toolbar.Button tooltip="更多选项">
              <Icon name="EllipsisVertical" />
            </Toolbar.Button>
          </Popover.Trigger>
          <Popover.Content side="top" asChild>
            <Toolbar.Wrapper>
              <Toolbar.Button
                tooltip="下标"
                tooltipShortcut={["Mod", "."]}
                onClick={commands.onSubscript}
                active={states.isSubscript}
              >
                <Icon name="Subscript" />
              </Toolbar.Button>
              <Toolbar.Button
                tooltip="上标"
                tooltipShortcut={["Mod", ","]}
                onClick={commands.onSuperscript}
                active={states.isSuperscript}
              >
                <Icon name="Superscript" />
              </Toolbar.Button>
              <Toolbar.Divider />
              <Toolbar.Button
                tooltip="Align left"
                tooltipShortcut={["Shift", "Mod", "L"]}
                onClick={commands.onAlignLeft}
                active={states.isAlignLeft}
              >
                <Icon name="AlignLeft" />
              </Toolbar.Button>
              <Toolbar.Button
                tooltip="Align center"
                tooltipShortcut={["Shift", "Mod", "E"]}
                onClick={commands.onAlignCenter}
                active={states.isAlignCenter}
              >
                <Icon name="AlignCenter" />
              </Toolbar.Button>
              <Toolbar.Button
                tooltip="Align right"
                tooltipShortcut={["Shift", "Mod", "R"]}
                onClick={commands.onAlignRight}
                active={states.isAlignRight}
              >
                <Icon name="AlignRight" />
              </Toolbar.Button>
              <Toolbar.Button
                tooltip="Justify"
                tooltipShortcut={["Shift", "Mod", "J"]}
                onClick={commands.onAlignJustify}
                active={states.isAlignJustify}
              >
                <Icon name="AlignJustify" />
              </Toolbar.Button>
            </Toolbar.Wrapper>
          </Popover.Content>
        </Popover.Root>
      </Toolbar.Wrapper>
    </BubbleMenu>
  );
};

export default TextMenu;
