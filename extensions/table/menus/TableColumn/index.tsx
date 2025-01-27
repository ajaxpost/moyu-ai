import { BubbleMenu as BaseBubbleMenu } from "@tiptap/react";
import React, { JSX, useCallback } from "react";
import * as PopoverMenu from "@/components/ui/popover-menu";

import { Toolbar } from "@/components/ui/toolbar";
import { isColumnGripSelected } from "./utils";
import { Icon } from "@/components/ui/icon";
import { MenuProps, ShouldShowProps } from "@/components/work/menus/types";

export const TableColumnMenu = React.memo(
  ({ editor, appendTo }: MenuProps): JSX.Element => {
    const shouldShow = useCallback(
      ({ view, state, from }: ShouldShowProps) => {
        if (!state) {
          return false;
        }

        return isColumnGripSelected({ editor, view, state, from: from || 0 });
      },
      [editor]
    );

    const onAddColumnBefore = useCallback(() => {
      editor.chain().focus().addColumnBefore().run();
    }, [editor]);

    const onAddColumnAfter = useCallback(() => {
      editor.chain().focus().addColumnAfter().run();
    }, [editor]);

    const onDeleteColumn = useCallback(() => {
      editor.chain().focus().deleteColumn().run();
    }, [editor]);

    return (
      <BaseBubbleMenu
        editor={editor}
        pluginKey="tableColumnMenu"
        updateDelay={0}
        tippyOptions={{
          appendTo: () => {
            return appendTo?.current;
          },
          offset: [0, 15],
          popperOptions: {
            modifiers: [{ name: "flip", enabled: false }],
          },
        }}
        shouldShow={shouldShow}
      >
        <Toolbar.Wrapper isVertical>
          <PopoverMenu.Item
            iconComponent={<Icon name="ArrowLeftToLine" />}
            close={false}
            label="前面插入一列"
            onClick={onAddColumnBefore}
          />
          <PopoverMenu.Item
            iconComponent={<Icon name="ArrowRightToLine" />}
            close={false}
            label="后面插入一列"
            onClick={onAddColumnAfter}
          />
          <PopoverMenu.Item
            icon="Trash"
            close={false}
            label="删除当前列"
            onClick={onDeleteColumn}
          />
        </Toolbar.Wrapper>
      </BaseBubbleMenu>
    );
  }
);

TableColumnMenu.displayName = "TableColumnMenu";

export default TableColumnMenu;
