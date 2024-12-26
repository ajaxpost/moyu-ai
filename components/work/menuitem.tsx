"use client";
import { FC, startTransition, use, MouseEvent } from "react";
import { Ellipsis, Plus, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { MenuContext } from "@/context";
import { MenuOptimisticEnum } from "@/shared/enum";
import { createDoc } from "@/actions/menu";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/store/menu";
import { nanoid } from "nanoid";
import { useDocDel } from "@/hooks/doc/use-doc-action";

interface IProps {
  id: string;
  title: string;
  level: number;
}

const MenuItem: FC<IProps> = ({ id, title, level }) => {
  const { id: _id } = useParams();
  const router = useRouter();
  const { addOptimisticMenus, doList, setSelectedKeys, onDelDoc } =
    use(MenuContext);
  const activeItem = useStore((state) => state.activeItem);
  const { trigger } = useDocDel();

  const handlerClick = (_id?: string) => {
    useStore.setState({
      activeItem: {
        id: _id || id,
        title,
      },
    });
    router.push("/work/" + (_id || id));
  };

  const handlerDel = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onDelDoc(id, () => {
      trigger({ ids: [id] });
      router.push("/work/0");
    });
  };

  const handlerAdd = async (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setSelectedKeys((o) => [...o, id]);
    startTransition(async () => {
      const nid = nanoid();
      addOptimisticMenus({ type: MenuOptimisticEnum.ADD, id: nid, pid: id });
      const data = await createDoc(nid, id);
      if (!data?.error) {
        doList();
      }
    });
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
        onClick={() => handlerClick()}
      >
        <div className="cursor-pointer flex-auto overflow-hidden py-1.5 px-0.5 flex items-center">
          <span
            className="truncate flex-auto"
            style={{
              marginLeft: (level || 1) * 16,
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
      </div>
    </div>
  );
};

export default MenuItem;
