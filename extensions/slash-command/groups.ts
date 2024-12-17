import { Group } from './types';

export const GROUPS: Group[] = [
  {
    name: 'format',
    title: '格式',
    commands: [
      {
        name: 'Heading1',
        label: 'Heading1 标题1',
        iconName: 'Heading1',
        description: '大标题',
        aliases: ['h1', 'heading1'], // 输入 “/h1” 时的快捷指令
        action: (editor) =>
          editor.chain().focus().setHeading({ level: 1 }).run(),
      },
      {
        name: 'Heading2',
        label: 'Heading2 标题2',
        iconName: 'Heading2',
        description: '中标题',
        aliases: ['h2', 'heading2'], // 输入 “/h2” 时的快捷指令
        action: (editor) =>
          editor.chain().focus().setHeading({ level: 2 }).run(),
      },
      {
        name: 'Heading3',
        label: 'Heading3 标题3',
        iconName: 'Heading3',
        description: '小标题',
        aliases: ['h3', 'heading3'], // 输入 “/h3” 时的快捷指令
        action: (editor) =>
          editor.chain().focus().setHeading({ level: 3 }).run(),
      },
      {
        name: 'BulletList',
        label: 'BulletList 列表',
        iconName: 'List',
        description: '无序列表',
        aliases: ['ul', 'bulletlist'], // 输入 “/ul” 时的快捷指令
        action: (editor) => editor.chain().focus().toggleBulletList().run(),
      },
      {
        name: 'NumberedList',
        label: 'NumberedList 有序列表',
        iconName: 'ListOrdered',
        description: '有序列表',
        aliases: ['ol', 'numberedlist'], // 输入 “/ol” 时的快捷指令
        action: (editor) => {
          editor.chain().focus().toggleOrderedList().run();
        },
      },
      //   {
      //     name: 'taskList',
      //     label: 'Task List',
      //     iconName: 'ListTodo',
      //     description: 'Task list with todo items',
      //     aliases: ['todo'],
      //     action: (editor) => {
      //       editor.chain().focus().toggleTaskList().run();
      //     },
      //   },
      //   {
      //     name: 'toggleList',
      //     label: 'Toggle List',
      //     iconName: 'ListCollapse',
      //     description: 'Toggles can show and hide content',
      //     aliases: ['toggle'],
      //     action: (editor) => {
      //       editor.chain().focus().setDetails().run();
      //     },
      //   },
      {
        name: 'Blockquote',
        label: 'Blockquote 引用',
        iconName: 'Quote',
        description: '引用',
        action: (editor) => {
          editor.chain().focus().setBlockquote().run();
        },
      },
      {
        name: 'CodeBlock',
        label: 'CodeBlock 代码块',
        iconName: 'SquareCode',
        description: '代码块-高亮',
        shouldBeHidden: (editor) => editor.isActive('columns'), // 表示：如果在 columns 中，输入 / 后，隐藏当前 item
        action: (editor) => {
          editor.chain().focus().setCodeBlock().run();
        },
      },
    ],
  },
  {
    name: 'insert',
    title: '插入',
    commands: [
      {
        name: 'Image',
        label: 'Image 图片',
        iconName: 'Image',
        description: '插入图片',
        aliases: ['img', 'image'],
        action: (editor) => {
          editor.chain().focus().setImageUpload().run();
        },
      },
    ],
  },
];

export default GROUPS;
