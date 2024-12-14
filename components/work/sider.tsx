import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import Menu from "./menu";
import { LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { auth, signOut } from "@/auth";

export default async function Sider() {
  const session = await auth();
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
      <Menu />
      <Separator className="shrink-0 bg-border h-[1px] w-full my-2" />
      <div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start items-center cursor-pointer"
            >
              <LogOut />
              退出
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>是否退出登录?</AlertDialogTitle>
              <AlertDialogDescription></AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  "use server";
                  await signOut();
                }}
              >
                确认
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
