import Link from "next/link";
import { useStore } from "@/store/editor";
import { useShallow } from "zustand/react/shallow";
import { EditorUser } from "@/hooks/useBlockEditor";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { WebSocketStatus } from "@hocuspocus/provider";
import { Skeleton } from "@/components/ui/skeleton";
import { ModeToggle } from "../mode-toggle";
import Image from "next/image";

export default function Header() {
  const { users, collabState, characters } = useStore(
    useShallow((state) => ({
      users: state.users,
      collabState: state.collabState,
      characters: state.characters,
    }))
  );

  return (
    <header className="flex text-secondary-foreground my-2 mx-3 bg-ground pb-1">
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
                  <div key={user.clientId} className="-ml-3">
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
      </div>
      <div className="flex-1 text-end">
        <ModeToggle />
      </div>
    </header>
  );
}
