/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import {
  FC,
  PropsWithChildren,
  MouseEvent,
  use,
  Children,
  ReactNode,
  useMemo,
} from "react";
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
import { MenuContext } from "@/context";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/store/menu";
import clsx from "clsx";
import { DocumentVO, isHomeId } from "@/shared";

interface IProps {
  id: string;
  title: string;
  level: number;
  actived: boolean;
  uid?: string;
  permission?: DocumentVO["permission"];
  badge?: ReactNode;
  onSelect: (key: string) => void;
}

const SubMenu: FC<PropsWithChildren<IProps>> = ({
  id,
  title,
  level,
  children,
  actived,
  uid,
  permission,
  badge,
  onSelect,
}) => {
  const { setSelectedKeys, onDelDoc, onAddDoc } = use(MenuContext);
  const { id: _id } = useParams();
  const activeItem = useStore((state) => state.activeItem);
  const isNotFound = useStore((state) => state.isNotFound);
  const router = useRouter();

  const usabled = useMemo(() => Boolean(uid), [uid]);

  // @ts-ignore
  const getDelIDs = (data: ReactNode) => {
    // @ts-ignore
    return Children.map(data, (child) => {
      let ids = [];
      // @ts-ignore
      if (child.props.children) {
        // @ts-ignore
        ids = getDelIDs(child.props.children);
      }
      // @ts-ignore
      return ids.concat(child.props.id);
    });
  };

  const handlerDel = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const ids = getDelIDs(children) ?? [];
    onDelDoc(ids.concat(id));
  };
  const handlerAdd = async (e: MouseEvent<HTMLDivElement>) => {
    if (uid) {
      e.stopPropagation();
      setSelectedKeys((o) => [...o, id]);
      onAddDoc(id);
    }
  };

  const handlerClick = () => {
    if (usabled) {
      const item = {
        id,
        title: title || "",
        uid,
        permission,
      };
      useStore.setState({
        activeItem: item,
      });
      if (isNotFound || activeItem?.id === isHomeId) {
        useStore.setState((o) => ({
          ...o,
          isNotFound: false,
        }));
        router.push(`/work/${id}`);
      } else {
        window.history.pushState(item, "", `/work/${id}`);
      }
    }
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
      >
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
        <div
          onClick={handlerClick}
          className="cursor-pointer flex-auto overflow-hidden py-1.5 px-0.5 flex items-center"
        >
          <span className="truncate flex-auto">
            {badge}
            {title || "<无标题>"}
          </span>
        </div>
        {usabled && (
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
                    onClick={handlerDel}
                    className="text-destructive cursor-pointer"
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

      {actived && <div>{children}</div>}
    </div>
  );
};

export default SubMenu;
