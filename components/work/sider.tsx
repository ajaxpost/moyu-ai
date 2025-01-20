import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import Menu from "./menu";
import { auth } from "@/auth";
import { getMenus } from "@/actions/menu";
import Out from "./out";

export default async function Sider() {
  const session = await auth();
  const list = await getMenus();

  return (
    <div className="flex flex-col h-screen bg-muted text-muted-foreground p-2">
      <div>
        <Button
          variant="ghost"
          className="h-10 w-full justify-start items-center cursor-pointer"
        >
          <Avatar className="h-7 w-7">
            <AvatarImage src={session?.user?.image || ""} />
          </Avatar>
          &nbsp;用户/设置
        </Button>
      </div>

      <Separator className="shrink-0 bg-border h-[1px] w-full my-2" />
      <Menu list={list || []} session={session} />
      <Separator className="shrink-0 bg-border h-[1px] w-full my-2" />
      <Out />
    </div>
  );
}
