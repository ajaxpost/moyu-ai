import Link from "next/link";
import { useStore } from "@/store/editor";
import { useStore as useMenuStore } from "@/store/menu";
import { useShallow } from "zustand/react/shallow";
import { EditorUser } from "@/hooks/useBlockEditor";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TooltipV2 from "../ui/tooltip-v2";
import { cn } from "@/lib/utils";
import { WebSocketStatus } from "@hocuspocus/provider";
import { ModeToggle } from "../mode-toggle";
import Image from "next/image";
import { LockKeyhole, LockKeyholeOpen } from "lucide-react";
import { Button } from "../ui/button";
import { PermissionEnum } from "@/shared/enum";
import { useEffect, useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDocUpdatePermission } from "@/hooks/doc/use-doc-action";
import { useParams } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { PERMISSION_OPTION } from "@/shared";
import Share from "./share/share";

interface IProps {
  permission?: PermissionEnum;
  isAdmin: boolean;
}

export default function Header({
  permission = PermissionEnum.PRIVATE,
  isAdmin,
}: IProps) {
  const { id: _id } = useParams();
  const [_permission, $permission] = useState(String(permission));
  const { users, collabState, characters } = useStore(
    useShallow((state) => ({
      users: state.users,
      collabState: state.collabState,
      characters: state.characters,
    }))
  );

  const activeItem = useMenuStore((state) => state.activeItem);
  const id = (activeItem?.id ?? _id ?? "") as string;

  const { trigger } = useDocUpdatePermission();

  useEffect(() => {
    $permission(String(permission));
  }, [permission]);

  const isPublic = useMemo(
    () =>
      _permission === String(PermissionEnum.PUBLIC) ||
      _permission === String(PermissionEnum.PUBLIC_RW),
    [_permission]
  );

  const handlerPermissionChange = async (v: string) => {
    $permission(v);
    await trigger({
      id: id as string,
      permission: Number(v) as PermissionEnum,
    }).catch(() => {
      $permission(_permission);
    });
  };

  return (
    <header className="flex text-secondary-foreground my-2 mx-3 bg-ground pb-1 justify-between items-center mt-2">
      <div className="text-start inline-flex items-center">
        <Link href="/">
          <svg
            className="h-8 w-8 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </Link>
        {!users.length && collabState === WebSocketStatus.Connecting ? (
          <Skeleton className="w-[100px] h-[24px] rounded-full ml-5" />
        ) : (
          <>
            <div className="flex flex-row items-center ml-5">
              <div className="relative flex flex-row items-center">
                {users.length === 0 && (
                  <div className="-ml-3">
                    <div className="flex items-center justify-center w-7 h-7 font-bold text-xs leading-none border border-white dark:border-black bg-[#FFA2A2] rounded-full">
                      +
                    </div>
                  </div>
                )}
                {users.slice(0, 3).map((user: EditorUser) => (
                  <div key={user.clientId} className="-ml-2 relative">
                    <TooltipProvider delayDuration={300}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Image
                            className="cursor-pointer rounded-full"
                            src={user.image || ""}
                            alt={user.name}
                            width={28}
                            height={28}
                            quality={100}
                          />
                        </TooltipTrigger>
                        <TooltipContent>{user.name}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))}
                {users.length > 3 && (
                  <div className="-ml-3">
                    <div className="flex items-center justify-center w-8 h-8 font-bold text-xs leading-none border border-white dark:border-black bg-[#FFA2A2] rounded-full">
                      +{users.length - 3}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              className={cn("w-2 h-2 rounded-full ml-2", {
                "bg-yellow-500 dark:bg-yellow-400":
                  collabState === WebSocketStatus.Connecting,
                "bg-green-500 dark:bg-green-400":
                  collabState === WebSocketStatus.Connected,
                "bg-red-500 dark:bg-red-400":
                  collabState === WebSocketStatus.Disconnected,
              })}
            />
            <span className="text-muted-foreground text-sm ml-2 inline-flex items-center">
              共 {characters} 字
            </span>
          </>
        )}

        {isAdmin ? (
          <DropdownMenu>
            <TooltipV2 title={isPublic ? "公开" : "私密" + "文档"}>
              <DropdownMenuTrigger className="ml-2" asChild>
                <Button variant="ghost" size="icon">
                  {isPublic ? (
                    <LockKeyholeOpen className="w-4 h-4" />
                  ) : (
                    <LockKeyhole className="w-4 h-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
            </TooltipV2>

            <DropdownMenuContent>
              <DropdownMenuLabel>文档权限</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={String(_permission)}
                onValueChange={handlerPermissionChange}
              >
                {PERMISSION_OPTION.map((item) => {
                  return (
                    <DropdownMenuRadioItem
                      key={item.value}
                      value={String(item.value)}
                    >
                      {item.label}
                    </DropdownMenuRadioItem>
                  );
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <TooltipV2 title={isPublic ? "公开" : "私密" + "文档"}>
            <Button variant="ghost" size="icon">
              {isPublic ? (
                <LockKeyholeOpen className="w-4 h-4" />
              ) : (
                <LockKeyhole className="w-4 h-4" />
              )}
            </Button>
          </TooltipV2>
        )}
      </div>
      <div className="text-end flex gap-2">
        <Share isAdmin={isAdmin} />
        <ModeToggle />
      </div>
    </header>
  );
}
