import { FC, MouseEvent } from "react";
import { css } from "@emotion/css";
import {
  TableOfContentData,
  TableOfContentDataItem,
} from "@tiptap-pro/extension-table-of-contents";
import { Editor } from "@tiptap/core";
import { TextSelection } from "@tiptap/pm/state";

interface TocItemProps {
  item: TableOfContentDataItem;
  onItemClick: (e: MouseEvent<HTMLAnchorElement>, id: string) => void;
  isVisible: boolean;
}

interface ToCProps {
  items: TableOfContentData;
  editor: Editor;
  isVisible: boolean;
}

export const ToCItem: FC<TocItemProps> = ({ item, onItemClick, isVisible }) => {
  return (
    <div
      className={`${item.isActive ? "is-active" : ""} ${
        item.isScrolledOver ? "is-scrolled-over" : ""
      } px-[25px] pb-[6px] last:pb-0 ${
        isVisible ? "border-l-2 border-solid" : ""
      }`}
    >
      <div
        style={{
          paddingLeft: (item.level - 1) * 14,
        }}
        className={`relative rounded-sm text-sm ${
          isVisible ? "hover:bg-[rgba(61,37,20,.08)]" : ""
        } ${
          !isVisible
            ? css`
                &::before {
                  content: " ";
                  display: block;
                  height: 2px;
                  width: ${24 - (item.level - 1) * 8}px;
                  position: absolute;
                  right: 0;
                  top: 10px;
                  background: #d8dad9;
                }
              `
            : ""
        } h-[22px]`}
      >
        <a
          href={`#${item.id}`}
          onClick={(e) => onItemClick(e, item.id)}
          data-item-index={item.itemIndex}
          className={`${isVisible ? "block" : "hidden"}`}
        >
          {item.textContent}
        </a>
      </div>
    </div>
  );
};

export const ToCEmptyState = () => {
  return <div className="empty-state"></div>;
};

export const ToC: FC<ToCProps> = ({ items = [], editor, isVisible }) => {
  if (items.length === 0) {
    return <ToCEmptyState />;
  }

  const onItemClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    if (editor) {
      const element = editor.view.dom.querySelector(`[data-toc-id="${id}"`);
      if (!element) return;
      const pos = editor.view.posAtDOM(element, 0);

      // set focus
      const tr = editor.view.state.tr;

      tr.setSelection(new TextSelection(tr.doc.resolve(pos)));

      editor.view.dispatch(tr);

      editor.view.focus();

      const wrap = document.getElementById("scroll-wrap") as HTMLDivElement;

      if (wrap) {
        wrap.scrollTo({
          top: element.getBoundingClientRect().top + wrap.scrollTop - 60,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <>
      {items.map((item) => (
        <ToCItem
          onItemClick={onItemClick}
          isVisible={isVisible}
          key={item.id}
          item={item}
        />
      ))}
    </>
  );
};
