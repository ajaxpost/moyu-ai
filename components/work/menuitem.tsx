"use client";
import { FC, use, MouseEvent } from "react";
import { Ellipsis, Plus, Trash2, File } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { MenuContext } from "@/context";
import { useParams } from "next/navigation";
import { useStore } from "@/store/menu";
import { DocumentVO, isHomeId, ShareEntiry } from "@/shared";

interface IProps {
  id: string;
  title: string;
  level: number;
  uid: string;
  permission: DocumentVO["permission"];
  currentShare?: ShareEntiry;
}

const MenuItem: FC<IProps> = ({
  id,
  title,
  level,
  uid,
  permission,
  currentShare,
}) => {
  const { id: _id } = useParams();
  const { setSelectedKeys, onDelDoc, onAddDoc } = use(MenuContext);
  const activeItem = useStore((state) => state.activeItem);
  const isNotFound = useStore((state) => state.isNotFound);

  const handlerClick = (_id: string) => {
    const item = {
      id: _id,
      title: title || "",
      uid,
      permission,
      currentShare,
    };
    useStore.setState({
      activeItem: item,
    });
    if (isNotFound || activeItem?.id === isHomeId) {
      useStore.setState((o) => {
        return {
          ...o,
          isNotFound: false,
        };
      });
      // router.push(`/work/${_id}`);
      // window.history.pushState(item, "", `/work/${_id}`);
    }
    window.history.pushState(
      JSON.parse(JSON.stringify(item)),
      "",
      `/work/${_id}`
    );
  };

  const handlerDel = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onDelDoc([id]);
  };

  const handlerAdd = async (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setSelectedKeys((o) => [...o, id]);
    onAddDoc(id);
  };

  return (
    <div>
      <div
        className={clsx(
          "text-sm flex justify-between items-center w-full hover:text-secondary-foreground hover:bg-active rounded-sm group mb-0.5 px-1 pl-3",
          {
            "bg-active": id === (activeItem?.id ?? _id),
            "font-bold": id === (activeItem?.id ?? _id),
            "text-secondary-foreground": id === (activeItem?.id ?? _id),
          }
        )}
        onClick={() => handlerClick(id)}
      >
        <div className="cursor-pointer flex-auto overflow-hidden py-1.5 px-0.5 flex items-center">
          <File
            size={16}
            className="mr-1"
            style={{
              marginLeft: level * 8,
            }}
          />
          <span className="truncate flex-auto">{title || "<无标题>"}</span>
        </div>
        {!currentShare && (
          <>
            <div className="inline-flex items-center invisible group-hover:visible ml-1 w-6 pr-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer rounded-full p-1 hover:bg-active">
                    <Ellipsis className="h-4 w-4" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="text-destructive cursor-pointer"
                    onClick={handlerDel}
                  >
                    <Trash2 className="h-4 w-4" />
                    删除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div
              onClick={handlerAdd}
              className="cursor-pointer rounded-full p-1 hover:bg-active invisible group-hover:visible"
            >
              <Plus className="h-4 w-4" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
