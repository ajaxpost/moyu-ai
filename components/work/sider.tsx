import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import Menu from "./menu";

export default function Sider() {
  return (
    <div className="flex flex-col h-screen bg-muted text-muted-foreground p-2">
      <div>
        <Button
          variant="ghost"
          className="h-10 w-full justify-start items-center cursor-pointer"
        >
          <Avatar className="h-7 w-7">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          &nbsp;用户/设置
        </Button>
      </div>

      <Separator className="shrink-0 bg-border h-[1px] w-full my-2" />
      <Menu />
    </div>
  );
}
