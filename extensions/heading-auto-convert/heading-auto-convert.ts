import { Extension } from "@tiptap/core";

// 自定义扩展：监听删除操作并自动转换空标题为段落
export const HeadingAutoConvert = Extension.create({
  addKeyboardShortcuts() {
    return {
      Backspace: ({ editor }) => {
        // 1. 先执行默认的删除操作
        const { state } = editor;
        const { $from } = state.selection;
        const node = $from.node();

        // 2. 检查是否在标题节点且内容为空
        if (node.type.name === "heading" && node.textContent.length === 0) {
          editor.commands.setNode("paragraph"); // 转换为段落
          return true; // 阻止默认删除行为
        }

        // 3. 其他情况正常处理
        return false;
      },
    };
  },
});

export default HeadingAutoConvert;
