import { FC } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { File, Lightbulb, ListTodo } from "lucide-react";
import { emitter, EventEnum } from "@/shared/utils/event";

const EditorFooter: FC = () => {
  const handlerClick = (type: string) => {
    emitter.emit(EventEnum.EDITOR_TEMPLATE, { type });
  };

  return (
    <div className="absolute left-1/2 w-[900px] -ml-[450px] bottom-8 bg-background">
      <div className="grid grid-cols-3 gap-4">
        <Card
          className="cursor-pointer"
          onClick={() => handlerClick("programmer")}
        >
          <CardHeader className="space-y-3.5">
            <CardTitle className="flex justify-between items-center">
              程序员简历
              <File size={16} className="text-blue-500" />
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm whitespace-nowrap text-ellipsis overflow-hidden">
              一键生成，AI 优化
            </CardDescription>
          </CardHeader>
        </Card>
        <Card
          className="cursor-pointer"
          onClick={() => handlerClick("project_highlights")}
        >
          <CardHeader className="space-y-3.5">
            <CardTitle className="flex justify-between items-center">
              面试：项目亮点
              <Lightbulb size={16} className="text-yellow-500" />
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm whitespace-nowrap text-ellipsis overflow-hidden">
              使用 START 模式，凸显个人价值
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="cursor-pointer" onClick={() => handlerClick("todo")}>
          <CardHeader className="space-y-3.5">
            <CardTitle className="flex justify-between items-center">
              代办事项
              <ListTodo size={16} className="text-green-500" />
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm whitespace-nowrap text-ellipsis overflow-hidden">
              工作生活事项，记录下来不遗忘
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default EditorFooter;
