"use client";

import { FC, PropsWithChildren } from "react";
import {
  ChevronRight,
  ChevronDown,
  Ellipsis,
  Trash2,
  Plus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IProps {
  id: number;
  title: string;
  level: number;
  //   child: DocumentVO[];
  actived: boolean;
  onSelect: (key: number) => void;
}

const SubMenu: FC<PropsWithChildren<IProps>> = ({
  id,
  title,
  level,
  //   child,
  children,
  actived,
  onSelect,
}) => {
  return (
    <div>
      <div className="text-sm flex justify-between items-center w-full hover:text-secondary-foreground hover:bg-active rounded-sm group mb-0.5 px-1 pl-3">
        <div
          className="cursor-pointer hover:bg-active rounded-full p-0.5"
          onClick={() => onSelect(id)}
          style={{
            marginLeft: level * 8,
          }}
        >
          {actived ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </div>
        <div className="cursor-pointer flex-auto overflow-hidden py-1.5 px-0.5 flex items-center">
          <span className="truncate flex-auto">{title || "<无标题>"}</span>
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

      {actived && <div>{children}</div>}
    </div>
  );
};

export default SubMenu;