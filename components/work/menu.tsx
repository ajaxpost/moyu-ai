"use client";
import {
  FC,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  useMemo,
} from "react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import SubMenu from "./submenu";
import MenuItem from "./menuitem";
import { DocumentVO, isHomeId, ShareEntiry, UserInfo } from "@/shared";
import {
  addMenuItem,
  findMenuItem,
  findMenuItemParentKeys,
  findShareMenuItemParentKeys,
  getMenuTreeData,
  removeMenuItem,
  updateTitle,
} from "@/shared/utils";
import { getMenus } from "@/actions/menu";
import { Button } from "../ui/button";
import { MenuContext } from "@/context";
import { useParams } from "next/navigation";
import { emitter, EventEnum } from "@/shared/utils/event";
import { useStore } from "@/store/menu";
import { nanoid } from "nanoid";
import { useDocAdd, useDocDel } from "@/hooks/doc/use-doc-action";
import { Session } from "next-auth";
import { PermissionEnum } from "@/shared/enum";
import { groupBy, isEmpty, map } from "lodash-es";
import { Badge } from "@/components/ui/badge";

export type ShareListType = (DocumentVO & {
  currentShare: ShareEntiry & {
    shareUserInfo?: UserInfo;
  };
})[];

interface IProps {
  list: DocumentVO[];
  shareList: ShareListType;
  session: Session | null;
}

const Menu: FC<IProps> = ({ list, shareList, session }) => {
  const { id } = useParams();
  const [open, setOpen] = useState<boolean>(true);
  const [shareOpen, setShareOpen] = useState<boolean>(true);
  const timeOut = useRef<NodeJS.Timeout | null>(null);
  const [menus, setMenus] = useState<DocumentVO[]>(getMenuTreeData(list));
  const [selectedKeys, setSelectedKeys] = useState<string[]>(() => {
    const keys = findShareMenuItemParentKeys(shareList, String(id));
    if (keys.length) {
      setOpen(false);
      return keys;
    }
    setShareOpen(false);

    return findMenuItemParentKeys(menus, String(id));
  });
  const group = groupBy(shareList, "uid");

  const { trigger } = useDocAdd();
  const { trigger: delTrigger } = useDocDel();

  const isHome = useMemo(() => id === isHomeId, [id]);

  useLayoutEffect(() => {
    if (!id) return;
    const item = findMenuItem(menus, String(id));
    useStore.setState({
      activeItem: isHome
        ? {
            id: isHomeId,
          }
        : item ?? {
            id: id as string,
          },
    });
  }, []);

  useEffect(() => {
    setMenus(getMenuTreeData(list));
  }, [list]);

  useEffect(() => {
    emitter.on(EventEnum.MENU_UPDATE_TITLE, ({ title, id, callback }) => {
      const data = updateTitle(menus, id, title);
      setMenus(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      timeOut.current && clearTimeout(timeOut.current);
      timeOut.current = setTimeout(() => {
        callback();
      }, 500);
    });
    emitter.on(EventEnum.ADD_DOC, () => {
      handlerAddMenuItem();
    });
    return () => {
      emitter.removeListener(EventEnum.MENU_UPDATE_TITLE);
      emitter.removeListener(EventEnum.ADD_DOC);
    };
  }, [id, menus]);

  const doList = async () => {
    const res = await getMenus();
    setMenus(getMenuTreeData(res || []));
    return res;
  };

  const onSelect = (key: string) => {
    if (selectedKeys.some((k) => k === key)) {
      setSelectedKeys(selectedKeys.filter((o) => o !== key));
    } else {
      setSelectedKeys([...selectedKeys, key]);
    }
  };
  const renderMenu = (data: DocumentVO[], level: number = 0) => {
    return data.map((item, key) => {
      if (item.children && item.children?.length) {
        return (
          <SubMenu
            key={item.id}
            level={level}
            id={item.id}
            title={item.title}
            actived={selectedKeys.some((o) => o === item.id)}
            onSelect={onSelect}
            uid={item.uid}
            permission={item.permission}
          >
            {renderMenu(item.children, level + 1)}
          </SubMenu>
        );
      }
      return (
        <MenuItem
          key={item.id + "_" + key}
          level={level}
          id={item.id}
          title={item.title}
          uid={item.uid}
          permission={item.permission}
        />
      );
    });
  };

  const renderShareMenu = (data: Record<string, ShareListType>) => {
    return map(data, (value, key) => {
      if (value.length) {
        const userInfo = value[0].currentShare?.shareUserInfo;
        return (
          <SubMenu
            key={key}
            level={0}
            id={key}
            title={userInfo?.name ?? "未知"}
            actived={selectedKeys.some((o) => o === key)}
            onSelect={onSelect}
            badge={
              <Badge className="px-1.5 mr-1 rounded-full bg-red-100 hover:bg-red-100 text-foreground">
                {value.length}
              </Badge>
            }
          >
            {value.map((item, key) => {
              return (
                <MenuItem
                  key={item.id + "_" + key}
                  level={0}
                  id={item.id}
                  title={item.title}
                  uid={item.uid}
                  permission={item.permission}
                  currentShare={item.currentShare}
                />
              );
            })}
          </SubMenu>
        );
      }
    });
  };

  const handlerAddMenuItem = async () => {
    onAddDoc();
  };

  const onDelDoc = async (ids: string[]) => {
    const newMenus = removeMenuItem(menus, ids);
    setMenus(newMenus);
    const item = {
      id: "0",
    };
    useStore.setState({
      activeItem: item,
    });
    window.history.pushState({}, "", `/work/0`);
    await delTrigger({ ids });
  };

  const onAddDoc = async (pid?: string) => {
    const id = nanoid();
    const item = {
      id: id,
      title: "",
      uid: session?.user.id,
      permission: {
        permission: PermissionEnum.PRIVATE,
      },
    };
    useStore.setState({
      activeItem: item,
      isNotFound: false,
    });
    setMenus(addMenuItem(menus, id, pid, session?.user.id));
    window.history.pushState(item, "", `/work/${id}`);
    await trigger({ id, pid });
  };

  return (
    <MenuContext
      value={{
        doList,
        setSelectedKeys,
        onDelDoc,
        onAddDoc,
      }}
    >
      <div className="flex-auto overflow-y-auto">
        {!isEmpty(group) ? (
          <div className="mb-2">
            <div className="flex justify-between items-center">
              <h3 className="px-1 mt-1 mb-1 text-sm font-bold flex items-center cursor-pointer">
                <div
                  className="hover:bg-active rounded-full p-0.5"
                  onClick={() => setShareOpen(!shareOpen)}
                >
                  {shareOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
                <span>
                  他人文档
                  <Badge className="px-1.5 ml-1 rounded-full bg-red-300 hover:bg-red-300 text-foreground">
                    {shareList.length}
                  </Badge>
                </span>
              </h3>
            </div>
            {shareOpen && renderShareMenu(group)}
          </div>
        ) : null}
        <div className="mb-2">
          <div className="flex justify-between items-center">
            <h3 className="px-1 mt-1 mb-1 text-sm font-bold flex items-center cursor-pointer">
              <div
                className="hover:bg-active rounded-full p-0.5"
                onClick={() => setOpen(!open)}
              >
                {open ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
              <span>我的文档</span>
            </h3>
          </div>
          {open && renderMenu(menus)}
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
