import Link from "next/link";
import { FC } from "react";
import { Button } from "../ui/button";
import { Zap } from "lucide-react";
import { auth } from "@/auth";

const StartUse: FC = async () => {
  const session = await auth();
  return (
    <Link href={session ? "/work" : "/api/auth/signin?callbackUrl"}>
      <Button className="h-11 rounded-md px-8 text-base">
        <Zap />
        {session ? "开始使用" : "登录/注册"}
      </Button>
    </Link>
  );
};

export default StartUse;
