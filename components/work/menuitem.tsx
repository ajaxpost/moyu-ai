"use client";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { Ellipsis, Plus, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { useRouter } from "next/navigation";

interface IProps {
  id: number;
  title: string;
  level: number;
  activeId: number;
  setActiveId: Dispatch<SetStateAction<number>>;
}

const MenuItem: FC<IProps> = ({ id, title, level, activeId, setActiveId }) => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(`/work/${id}`);
  }, [id]);
  return (
    <div>
      <div
        className={clsx(
          "text-sm flex justify-between items-center w-full hover:text-secondary-foreground hover:bg-active rounded-sm group mb-0.5 px-1 pl-3",
          {
            "bg-active": id === Number(activeId),
            "font-bold": id === Number(activeId),
            "text-secondary-foreground": id === Number(activeId),
          }
        )}
        onClick={() => {
          setActiveId(id);
          window.history.replaceState(null, "", String(id));
        }}
      >
        <div className="cursor-pointer flex-auto overflow-hidden py-1.5 px-0.5 flex items-center">
          <span
            className="truncate flex-auto"
            style={{
              marginLeft: (level || 1) * 12,
            }}
          >
            {title || "<无标题>"}
          </span>
        </div>
        <div className="inline-flex items-center invisible group-hover:visible ml-1 w-6 pr-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer rounded-full p-1 hover:bg-active">
                <Ellipsis className="h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="text-destructive cursor-pointer">
                <Trash2 className="h-4 w-4" />
                删除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="cursor-pointer rounded-full p-1 hover:bg-active invisible group-hover:visible">
          <Plus className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
