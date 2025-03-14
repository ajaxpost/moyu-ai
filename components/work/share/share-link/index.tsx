import { FC, useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PowerEnum } from "@/shared/enum";
import { copyToClipboard, POWER_OPTION } from "@/shared";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { shareToken } from "@/actions/share";
import { useSession } from "next-auth/react";
import { useStore } from "@/store/menu";
import { usePathname } from "next/navigation";

const ShareLink: FC = () => {
  const session = useSession();
  const pathname = usePathname();
  const [power, setPower] = useState<PowerEnum>(PowerEnum.READ);
  const [token, setToken] = useState<string>();
  const [isCopy, setIsCopy] = useState(false);
  const activeItem = useStore((state) => state.activeItem);

  useEffect(() => {
    const userId = session.data?.user.id;
    const did = activeItem?.id;
    shareToken({
      userId,
      did,
      power,
    }).then((ret) => {
      console.log(ret, "ret_token>>>");

      setToken(ret);
    });
  }, [power, activeItem?.id, session.data?.user?.id]);

  const label = useMemo(
    () => POWER_OPTION.find((o) => o.value === power)?.label,
    [power]
  );

  const url = useMemo(() => {
    if (!token) {
      return "生成链接中...";
    }
    return `${window.location.origin}/collaborator/join?source=doc_collaborator&goto=${pathname}&token=${token}`;
  }, [pathname, token]);

  const copy = () => {
    copyToClipboard({
      text: url,
      onSuccess: () => {
        setIsCopy(true);
        setTimeout(() => {
          setIsCopy(false);
        }, 1000);
      },
    });
  };

  return (
    <div className="p-5">
      <p className="mt-0 text-sm text-[#262626]">
        设置协作者权限&nbsp;
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span className="font-medium cursor-pointer">{label}</span>
            <ChevronDown
              width={18}
              height={18}
              className="inline-block relative -top-[2px] cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value={power}
              onValueChange={(v) => setPower(v as PowerEnum)}
            >
              <DropdownMenuRadioItem value={PowerEnum.READ}>
                可阅读「仅用于只读和<s>评论</s>权限」
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={PowerEnum.EDIT}>
                可编辑「拥有文档的编辑权限」
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </p>
      <div className="mt-4 flex justify-start items-center space-x-2">
        <Input disabled value={url} />
        <Button disabled={!token || isCopy} onClick={copy}>
          {isCopy ? "已复制" : "复制"}
        </Button>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        注：链接时效时间 5 分钟
      </p>
    </div>
  );
};

export default ShareLink;
