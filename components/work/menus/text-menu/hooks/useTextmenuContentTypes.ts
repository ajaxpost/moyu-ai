import { Editor, useEditorState } from "@tiptap/react";
import { ContentPickerOptions } from "../components/content-type-picker";

export const useTextmenuContentTypes = (editor: Editor) => {
  return useEditorState({
    editor,
    selector: (ctx): ContentPickerOptions => [
      {
        type: "category",
        label: "类型",
        id: "hierarchy",
      },
      {
        icon: "Pilcrow",
        onClick: () =>
          ctx.editor
            .chain()
            .focus()
            .lift("taskItem")
            .liftListItem("listItem")
            .setParagraph()
            .run(),
        id: "段落",
        disabled: () => !ctx.editor.can().setParagraph(),
        isActive: () =>
          ctx.editor.isActive("paragraph") &&
          !ctx.editor.isActive("orderedList") &&
          !ctx.editor.isActive("bulletList") &&
          !ctx.editor.isActive("taskList"),
        label: "段落",
        type: "option",
      },
      {
        icon: "Heading1",
        onClick: () =>
          ctx.editor
            .chain()
            .focus()
            .lift("taskItem")
            .liftListItem("listItem")
            .setHeading({ level: 1 })
            .run(),
        id: "heading1",
        disabled: () => !ctx.editor.can().setHeading({ level: 1 }),
        isActive: () => ctx.editor.isActive("heading", { level: 1 }),
        label: "标题1",
        type: "option",
      },
      {
        icon: "Heading2",
        onClick: () =>
          ctx.editor
            .chain()
            .focus()
            .lift("taskItem")
            .liftListItem("listItem")
            .setHeading({ level: 2 })
            .run(),
        id: "heading2",
        disabled: () => !ctx.editor.can().setHeading({ level: 2 }),
        isActive: () => ctx.editor.isActive("heading", { level: 2 }),
        label: "标题2",
        type: "option",
      },
      {
        icon: "Heading3",
        onClick: () =>
          ctx.editor
            .chain()
            .focus()
            .lift("taskItem")
            .liftListItem("listItem")
            .setHeading({ level: 3 })
            .run(),
        id: "heading3",
        disabled: () => !ctx.editor.can().setHeading({ level: 3 }),
        isActive: () => ctx.editor.isActive("heading", { level: 3 }),
        label: "标题3",
        type: "option",
      },
      {
        type: "category",
        label: "列表",
        id: "lists",
      },
      {
        icon: "List",
        onClick: () => ctx.editor.chain().focus().toggleBulletList().run(),
        id: "bulletList",
        disabled: () => !ctx.editor.can().toggleBulletList(),
        isActive: () => ctx.editor.isActive("bulletList"),
        label: "无序列表",
        type: "option",
      },
      {
        icon: "ListOrdered",
        onClick: () => ctx.editor.chain().focus().toggleOrderedList().run(),
        id: "orderedList",
        disabled: () => !ctx.editor.can().toggleOrderedList(),
        isActive: () => ctx.editor.isActive("orderedList"),
        label: "有序列表",
        type: "option",
      },
      {
        icon: "ListTodo",
        onClick: () => ctx.editor.chain().focus().toggleTaskList().run(),
        id: "todoList",
        disabled: () => !ctx.editor.can().toggleTaskList(),
        isActive: () => ctx.editor.isActive("taskList"),
        label: "任务列表",
        type: "option",
      },
    ],
  });
};
