'use client';
import {
  FC,
  useEffect,
  useOptimistic,
  useState,
  startTransition as st,
  useRef,
} from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import SubMenu from './submenu';
import MenuItem from './menuitem';
import { DocumentVO } from '@/shared';
import {
  addMenuItem,
  findMenuItem,
  getMenuTreeData,
  removeMenuItem,
  updateTitle,
} from '@/shared/utils';
import { getMenus } from '@/actions/menu';
import { Button } from '../ui/button';
import { MenuOptimisticEnum } from '@/shared/enum';
import { MenuContext } from '@/context';
import { useParams, useRouter } from 'next/navigation';
import { emitter, EventEnum } from '@/shared/utils/event';
import { useStore } from '@/store/menu';
import { nanoid } from 'nanoid';
import { useDocAdd } from '@/hooks/doc/use-doc-action';

interface IProps {
  list: DocumentVO[];
}

const Menu: FC<IProps> = ({ list }) => {
  const { id } = useParams();
  const [open] = useState<boolean>(true);
  const timeOut = useRef<NodeJS.Timeout | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [menus, setMenus] = useState<DocumentVO[]>(getMenuTreeData(list));
  const [optimisticMenus, addOptimisticMenus] = useOptimistic<
    DocumentVO[],
    { type: MenuOptimisticEnum; id?: string; pid?: string }
  >(menus, (currentState, { type, id, pid }) => {
    if (type === MenuOptimisticEnum.ADD) {
      return addMenuItem(currentState, id!, pid);
    }
    if (type === MenuOptimisticEnum.DEL)
      return removeMenuItem(currentState, pid);
    return currentState;
  });
  const router = useRouter();

  const { trigger } = useDocAdd();

  useEffect(() => {
    if (!id) return;
    const item = findMenuItem(menus, String(id));
    if (!item) return;
    useStore.setState({
      activeItem: item,
    });
    if (item.parent_id) {
      setSelectedKeys([item.parent_id]);
    }
  }, [menus, id]);

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
    return () => {
      emitter.removeListener(EventEnum.MENU_UPDATE_TITLE);
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
        <MenuItem
          key={item.id + '_' + key}
          level={level}
          id={item.id}
          title={item.title}
        />
      );
    });
  };

  const handlerAddMenuItem = () => {
    const id = nanoid();
    setMenus(addMenuItem(menus, id));
    trigger({ id });
    router.push(`/work/${id}`);
  };

  const onDelDoc = (id: string, callback: () => void) => {
    const newMenus = removeMenuItem(menus, id);
    setMenus(newMenus);
    callback();
  };

  return (
    <MenuContext
      value={{
        addOptimisticMenus,
        doList,
        setSelectedKeys,
        onDelDoc,
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
