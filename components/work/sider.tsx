import { Separator } from "../ui/separator";
import Menu from "./menu";
import { auth } from "@/auth";
import { getMenus, getShareMenus } from "@/actions/menu";
import Out from "./sider-nav/out";
import HomeComponent from "./sider-nav/home";
import RecycleBin from "./recycle-bin";
import UserSetting from "./user-setting";

export default async function Sider() {
  const session = await auth();
  const list = await getMenus();
  const shareList = await getShareMenus();

  return (
    <div className="flex flex-col h-screen bg-muted text-muted-foreground p-2">
      <UserSetting session={session} />
      <HomeComponent />
      <Separator className="shrink-0 bg-border h-[1px] w-full my-2" />
      <Menu list={list || []} shareList={shareList || []} session={session} />
      <Separator className="shrink-0 bg-border h-[1px] w-full my-2" />
      <RecycleBin />
      <Out />
    </div>
  );
}
