"use client";
import {
  FC,
  useEffect,
  useOptimistic,
  useState,
  startTransition as st,
  useRef,
} from "react";
import { ChevronDown, Plus } from "lucide-react";
import SubMenu from "./submenu";
import MenuItem from "./menuitem";
import { DocumentVO } from "@/shared";
import {
  addMenuItem,
  findMenuItem,
  getMenuTreeData,
  removeMenuItem,
  updateTitle,
} from "@/shared/utils";
import { getMenus, createDoc } from "@/actions/menu";
import { Button } from "../ui/button";
import { MenuOptimisticEnum } from "@/shared/enum";
import { MenuContext } from "@/context";
import { useParams } from "next/navigation";
import { emitter, EventEnum } from "@/shared/utils/event";
import { useStore } from "@/store/menu";

interface IProps {
  list: DocumentVO[];
}

const Menu: FC<IProps> = ({ list }) => {
  const { id } = useParams();
  const [open] = useState<boolean>(true);
  const timeOut = useRef<NodeJS.Timeout | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<number[]>([]);
  const [menus, setMenus] = useState<DocumentVO[]>(getMenuTreeData(list));
  const [optimisticMenus, addOptimisticMenus] = useOptimistic<
    DocumentVO[],
    { type: MenuOptimisticEnum; pid: number }
  >(menus, (currentState, { type, pid }) => {
    if (type === MenuOptimisticEnum.ADD) {
      return addMenuItem(currentState, pid);
    }
    if (type === MenuOptimisticEnum.DEL)
      return removeMenuItem(currentState, pid);
    return currentState;
  });

  // useEffect(() => {
  //   const supabase = createClient();
  //   const channel = supabase
  //     .channel("room-1")
  //     .on("broadcast", { event: "test" }, (payload) => {
  //       console.log(payload);
  //     })
  //     .subscribe();
  //   return () => {
  //     supabase.removeChannel(channel);
  //   };
  // }, []);

  useEffect(() => {
    if (!id) return;
    const item = findMenuItem(menus, Number(id));
    if (!item) return;
    useStore.setState({
      activeItem: item,
    });
  }, [menus]);

  useEffect(() => {
    emitter.on(EventEnum.MENU_UPDATE_TITLE, ({ title, id, callback }) => {
      const data = updateTitle(menus, Number(id), title);
      setMenus(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      timeOut.current && clearTimeout(timeOut.current);
      timeOut.current = setTimeout(() => {
        callback();
      }, 800);
    });
    return () => {
      emitter.removeListener(EventEnum.MENU_UPDATE_TITLE);
    };
  }, [id, menus]);

  const doList = async () => {
    const res = await getMenus();
    setMenus(getMenuTreeData(res || []));
    return res;
  };

  const onSelect = (key: number) => {
    if (selectedKeys.some((k) => k === key)) {
      setSelectedKeys(selectedKeys.filter((o) => o !== key));
    } else {
      setSelectedKeys([...selectedKeys, key]);
    }
  };
  const renderMenu = (data: DocumentVO[], level: number = 0) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu
            key={item.id}
            level={level}
            id={item.id}
            title={item.title}
            child={item.children}
            actived={selectedKeys.some((o) => o === item.id)}
            onSelect={onSelect}
          >
            {renderMenu(item.children, level + 1)}
          </SubMenu>
        );
      }
      return (
        <MenuItem key={item.id} level={level} id={item.id} title={item.title} />
      );
    });
  };

  const handlerAddMenuItem = () => {
    st(async () => {
      addOptimisticMenus({ type: MenuOptimisticEnum.ADD, pid: 0 });
      const data = await createDoc(0);
      if (!data?.error) {
        doList();
      }
    });
  };

  return (
    <MenuContext
      value={{
        addOptimisticMenus,
        doList,
        setSelectedKeys,
      }}
    >
      <div className="flex-auto overflow-y-auto">
        <div className="mb-2">
          <div className="flex justify-between items-center">
            <h3 className="px-1 mt-1 mb-1 text-sm font-bold flex items-center cursor-pointer">
              <div className="hover:bg-active rounded-full p-0.5">
                <ChevronDown className="h-4 w-4" />
              </div>
              <span>我的文档</span>
            </h3>
          </div>
          {open && renderMenu(optimisticMenus)}
        </div>
        {/* 新建文档 */}
        <div>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start items-center cursor-pointer"
            onClick={handlerAddMenuItem}
          >
            <Plus />
            新建文档
          </Button>
        </div>
      </div>
    </MenuContext>
  );
};

export default Menu;
