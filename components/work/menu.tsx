"use client";
import { FC, useState } from "react";
import { ChevronDown } from "lucide-react";
import SubMenu from "./submenu";
import MenuItem from "./menuitem";
import { DocumentVO } from "@/shared";
import { getMenuSelectedKeys, getMenuTreeData } from "@/shared/utils";
import { useParams } from "next/navigation";

const Menu: FC = () => {
  const data: DocumentVO[] = [
    {
      id: 1,
      parent_id: null,
      title: "123",
      creator: "hdk",
      creator_email: "hdk",
      created_at: "",
      updated_at: "",
      content: "",
    },
    {
      id: 2,
      parent_id: null,
      title: "任务计划",
      creator: "hdk",
      creator_email: "hdk",
      created_at: "",
      updated_at: "",
      content: "",
    },
    {
      id: 3,
      parent_id: 2,
      title: "HDK的任务计划",
      creator: "hdk",
      creator_email: "hdk",
      created_at: "",
      updated_at: "",
      content: "",
    },
    {
      id: 4,
      parent_id: 3,
      title: "HDK的任务计划2",
      creator: "hdk",
      creator_email: "hdk",
      created_at: "",
      updated_at: "",
      content: "",
    },
  ];
  const { id } = useParams();
  const [open] = useState<boolean>(true);
  const [selectedKeys, setSelectedKeys] = useState<number[]>(
    getMenuSelectedKeys(data, 4)
  );
  const [activeId, setActiveId] = useState(Number(id));

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
            actived={selectedKeys.some((o) => o === item.id)}
            onSelect={onSelect}
          >
            {renderMenu(item.children, level + 1)}
          </SubMenu>
        );
      }
      return (
        <MenuItem
          key={item.id}
          level={level}
          id={item.id}
          title={item.title}
          activeId={activeId}
          setActiveId={setActiveId}
        />
      );
    });
  };

  return (
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
        {open && renderMenu(getMenuTreeData(data))}
      </div>
      {/* 新建文档 */}
    </div>
  );
};

export default Menu;
