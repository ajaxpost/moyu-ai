import { JSONContent } from "@tiptap/react";
import { PermissionEnum, PowerEnum } from "../enum";

export const PERMISSION_OPTION = [
  {
    label: "私有",
    value: PermissionEnum.PRIVATE,
  },
  {
    label: "公开「只读」",
    value: PermissionEnum.PUBLIC,
  },
  {
    label: "公开「读写」",
    value: PermissionEnum.PUBLIC_RW,
  },
];

export const POWER_OPTION = [
  {
    label: "可阅读",
    value: PowerEnum.READ,
  },
  {
    label: "可编辑",
    value: PowerEnum.EDIT,
  },
];

export const EDITOR_TEMPLATE: Record<string, JSONContent[]> = {
  programmer: [
    {
      type: "heading",
      attrs: {
        id: "5bf0a997-6ed1-43d0-96e8-95e174116dc3",
        textAlign: null,
        "data-toc-id": "5bf0a997-6ed1-43d0-96e8-95e174116dc3",
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "张三，高级前端工程师",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "ffd2f016-1346-465e-9eac-9c0cd9ca6fd6",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "☎️ 电话 18600001111 ，📧 邮箱 ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "mailto:xxx@163.com",
                target: "_blank",
                rel: "noopener noreferrer nofollow",
                class: null,
              },
            },
          ],
          text: "xxx@163.com",
        },
        {
          type: "text",
          text: " ，👤 个人主页/博客 ",
        },
        {
          type: "text",
          marks: [
            {
              type: "underline",
            },
          ],
          text: "Link",
        },
        {
          type: "text",
          text: "（可选）",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        id: "b99e5747-04bd-49e0-90e0-d2634f4ec20a",
        textAlign: null,
        "data-toc-id": "b99e5747-04bd-49e0-90e0-d2634f4ec20a",
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "个人介绍（可选）",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "44af6432-e1f5-4a0b-b255-d1fcad2f5b8b",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "（使用 1-2 句话介绍自己的绝对优势，留下第一印象，如找不到明显优势，这部分可不写）",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "63f57171-b6ee-4227-a9e8-e545e9ee4075",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "例如，在 xxx 大厂工作，负责过 xxx 大新项目，开源项目 xxx Stars，博客 xxx 流量和粉丝，精通全栈开发...",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "bafa7cdc-27a1-4a3e-a7ed-28c58f1228e4",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "（先写出内容，再让 AI 帮你优化书写格式）",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        id: "2fd467a1-9aa9-45c3-ba3d-7705848b776d",
        textAlign: null,
        "data-toc-id": "2fd467a1-9aa9-45c3-ba3d-7705848b776d",
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "教育经历",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "ce62f4f6-d2ed-4157-b2b6-e8ad29da0288",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "xxx 学校， xxx 专业，本科",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "2be818ec-38b7-4a1b-b767-3184be80ddcd",
        textAlign: "right",
      },
      content: [
        {
          type: "text",
          text: "2016.09 - 2020.07",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "20b454ed-c5ce-4219-babf-8752b93721a7",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "（如果专业或学历不是优势，可以把教育经历放在最后）",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        id: "20272a69-7fde-4111-b50c-690a0c533a11",
        textAlign: null,
        "data-toc-id": "20272a69-7fde-4111-b50c-690a0c533a11",
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "专业技能",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "d5da66f4-18dc-4433-a499-3b97c1744adb",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "（根据个人情况添加和删减）",
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "53d2fc93-cd23-4ebd-9741-9d9a127e5dcd",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "熟悉常见的数据结构和算法，熟悉常见的设计模式",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "172ee497-8a14-42ac-9cfb-a8b7f5808440",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "熟悉前端基础 HTML CSS ES6+ JS TS 语法，熟悉 HTTP 协议",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "91795d60-fa98-4e7e-82fb-df61dce412af",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "熟悉 Vue2 Vue3 全家桶，熟悉 ElementPlus VantUI ，熟悉 Vue 原理和源码",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "021ba723-e4c2-482a-a1de-f5332cf46f98",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "熟悉 React 和 Hooks 语法，熟悉 AntD ，熟悉 React 原理",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "7e9a6167-d7c1-4b4b-95e9-2b7a649413e5",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "熟悉 Next.js 服务端框架，熟悉 RSC ，用过 Mongodb MySQL Redis",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "4eba83dc-3721-4ff8-b3f0-59a8d71c46ec",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "熟悉微信小程序开发，熟悉 uni-app 和 taro 框架",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "e63208c2-02df-4288-8972-27e7cfc17372",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "熟悉 Webpack 和 Vite 配置，熟悉常见插件，熟悉性能优化相关配置",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "caf67775-a9b2-4082-abab-2c7b39bd09c5",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "熟悉前端单元测试框架 Vitest 和 Jest ，熟悉 E2E 测试",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "1150eb9e-4fea-40e3-ac70-db39429e022c",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "熟悉前端 CI/CD 配置，熟悉 Gitlab CI 和 GitHub actions 常见配置",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "84e4d1f0-4fb4-4496-a6d4-918c88e69199",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "熟悉 Nodejs 服务端开发，熟悉 Express Koa Nestjs 框架",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "df7e78e8-84ee-459c-a7f1-d64b707d00f5",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "继续补充.......",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        id: "b720757f-b9df-4e07-8be7-b642a3c94e13",
        textAlign: null,
        "data-toc-id": "b720757f-b9df-4e07-8be7-b642a3c94e13",
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "工作经历",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "cc50dc2e-b69d-4a63-9643-1a79136a5a96",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "xxx 公司",
        },
        {
          type: "text",
          text: "，部门（可选），高级前端工程师",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "acdf2c11-b357-4343-8ae9-51d5999338cc",
        textAlign: "right",
      },
      content: [
        {
          type: "text",
          text: "2022.10 - 至今",
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "12666220-3c96-47bb-b511-4264d869e175",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "职责和成绩1，例如完成了 xxx 项目的上线，负责 xxx 模块的开发，主导 xxx 项目的重构...",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "9b5a85b6-77e7-42d1-b24e-5e25b2807039",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "职责和成绩2",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "53395e1e-e180-411e-905f-06fb963780a7",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "xxx 公司",
        },
        {
          type: "text",
          text: "，部门（可选），前端工程师",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "94f56866-5749-40c9-a9ed-fec43a5e362b",
        textAlign: "right",
      },
      content: [
        {
          type: "text",
          text: "2020.07 - 2022.10",
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "058aa755-e091-40ac-b1b3-d5cd73bc54b5",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "职责和成绩1 （时间太久的工作经历，这里可不用写）",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "20f233f4-a7f9-4f03-af7f-41528a950ade",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "职责和成绩2",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        id: "8dada7ab-51e8-4ecc-82e8-fa017ecb01f3",
        textAlign: null,
        "data-toc-id": "8dada7ab-51e8-4ecc-82e8-fa017ecb01f3",
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "项目经验",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "179f9b57-2355-487e-ac2c-a9b36f889db3",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "（根据个人工作时间长短，写 2-5 个项目）",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        id: "0a907dd1-bbb9-48ff-a837-1ebcb6f49761",
        textAlign: null,
        "data-toc-id": "0a907dd1-bbb9-48ff-a837-1ebcb6f49761",
        level: 3,
      },
      content: [
        {
          type: "text",
          text: "项目名称1",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "e9080437-2e17-44fc-94e9-0f84366bbcb8",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "项目描述：这是一个 xxx 项目，服务于 xxx 。它主要包含 a b c 功能。我主要负责 x y z 模块。",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "79bc65ec-1b11-41d8-b2a7-9c0b3a85e935",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "技术栈：TS + Nextjs + React + ShadcnUI + Auth.js + Prisma + PostgreSQL + Tiptap",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "4f2ecbeb-965e-4fd7-8f8c-52570c5de281",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "项目职责：",
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "3d097cb3-4557-4a8f-aecf-2d792e9139d5",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "作为项目前端负责人，负责需求评审、技术选型、系统设计、代码走查、项目管理等工作",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "c742a92e-24be-426c-a63c-c55ba54c121b",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "基于 Tiptap 二次开发富文本编辑器，如悬浮菜单、slash command、表格、上传图片到 OSS 等",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "015982f2-1ec7-4f5d-9288-8d59b09a6312",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "集成 ChatGPT AI 功能到富文本编辑器，实现 AI 写作、AI 优化文本等功能，并保障 AI 接口稳定",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "171901d0-0e57-4798-8135-e64171ed7643",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "基于 Tiptap 开源的 Hocuspocus Server 二次开发协同编辑功能，实现 Tiptap 多人协同编辑",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "a73c03fd-f53f-4a98-b8c1-7fed4f624db3",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "使用 GitHub Actions 配置 CI/CD 流程，使用 Docker 部署测试环境，使用阿里云 Serverless 上线",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "8c6fc627-3307-4832-a5dd-45ae58776ec1",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "继续补充...  （写 4-7 条）",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        id: "8d32c8a2-baec-43b7-813c-a1d45ed709e8",
        textAlign: null,
        "data-toc-id": "8d32c8a2-baec-43b7-813c-a1d45ed709e8",
        level: 3,
      },
      content: [
        {
          type: "text",
          text: "项目名称2",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "8e93d2ff-8d05-4692-909b-9c5fae58dc52",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "项目描述：xxx",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "bd306a5b-2f6e-4c05-b5eb-fa2e6a883200",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "技术栈：xxx",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "aa7ddd34-f971-46fb-a6d7-42051d742aa6",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "项目职责：",
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "cf72c199-e609-4578-b08c-eff69b81411c",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "a",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "a9e5147c-6f00-4d1c-b1d6-43e724e187e0",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "b",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "f4e29eec-1aa9-488f-9252-5b1c07ce2b12",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "c",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        id: "3c08f9ee-b53b-45c2-8052-7f4c6e1f2cde",
        textAlign: null,
        "data-toc-id": "3c08f9ee-b53b-45c2-8052-7f4c6e1f2cde",
        level: 3,
      },
      content: [
        {
          type: "text",
          text: "项目名称3",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "537e6944-b9f5-4e39-ba27-bc33a02d5220",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "项目描述：xxx",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "84d61a51-edcd-42be-a527-5f277c05d637",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "技术栈：xxx",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "da365de9-47da-40c9-95ec-9a97c6f1d1ef",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "项目职责：",
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "5ac5c762-c84e-4959-b1e9-87171a4c010b",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "a",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "055f6f88-4e49-44f0-9f69-beed4bfe7e6e",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "b",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "7963825b-2171-42e9-8f3f-047e708aa4b5",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "c",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "ac502b8b-2936-4264-a322-df6a22e676a8",
        textAlign: null,
      },
    },
    {
      type: "paragraph",
      attrs: {
        id: "285f721e-383b-4bcb-bda3-aefe85c24510",
        textAlign: null,
      },
    },
  ],
  project_highlights: [
    {
      type: "paragraph",
      attrs: {
        id: "e4c2e019-02e7-4c7e-a976-343e3fd46fa0",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "在面试中表达项目亮点，推荐使用 ",
        },
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "STAR",
        },
        {
          type: "text",
          text: " 模式：",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        id: "22d55672-56f2-45ad-bedd-68cf414345ef",
        textAlign: null,
        "data-toc-id": "22d55672-56f2-45ad-bedd-68cf414345ef",
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "Situation 背景",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "81fb3953-5c26-4568-a0e2-27c2099825dd",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "这是一个 xxx 项目，当前遇到了 xxx 需求，基于 xxx 背景...",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        id: "29ed862d-03b6-4410-840f-7874ea70c331",
        textAlign: null,
        "data-toc-id": "29ed862d-03b6-4410-840f-7874ea70c331",
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "Task 任务",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "049bb7f9-8899-451f-8fb4-f5d77265c8e3",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "我需要设计开发 xxx 功能，或解决 xxx 问题，难点有什么...",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        id: "d8162343-c2cf-4732-ad1d-0554681ac1e3",
        textAlign: null,
        "data-toc-id": "d8162343-c2cf-4732-ad1d-0554681ac1e3",
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "Action 行动",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "5f93db29-fed0-41f0-a8ff-0d7e28635a02",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "我为此做了 xxx 调研，得出 xxx 结论，使用 xxx 技术方案解决了 xxx 问题...",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        id: "0eb7f677-53e5-43ce-a069-bdb9d45feaa7",
        textAlign: null,
        "data-toc-id": "0eb7f677-53e5-43ce-a069-bdb9d45feaa7",
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "Result 结果",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "46701adc-087f-4dd7-9a18-f1cb036a567a",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "问题解决以后，项目达到了 xxx 效果，我得到了 xxx 收获...",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "680c9708-e689-4831-9367-cc9da4527c56",
        textAlign: null,
      },
    },
  ],
  todo: [
    {
      type: "paragraph",
      attrs: {
        id: "ed0e1d7f-bf95-42ba-9e49-7c3a5329520d",
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "My todos",
        },
      ],
    },
    {
      type: "taskList",
      content: [
        {
          type: "taskItem",
          attrs: {
            checked: true,
          },
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "ba36131f-fdee-44e8-8207-b44eacaa8010",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "item1",
                },
              ],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: {
            checked: false,
          },
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "584668c9-f843-48ba-b2c5-dcb38000c902",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "item2",
                },
              ],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: {
            checked: false,
          },
          content: [
            {
              type: "paragraph",
              attrs: {
                id: "baffe0c5-5e61-4af3-9df7-0b1f01f6a874",
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "item3",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        id: "eea52381-ee74-4eac-8524-a1c170f4e852",
        textAlign: null,
      },
    },
  ],
};
