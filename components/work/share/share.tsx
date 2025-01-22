/**
 * 分享文档组件
 */
import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ShareList from "./share-list";
import ShareLink from "./share-link";
import { useStore } from "@/store/menu";
import { useShareList } from "@/hooks/share/use-share-list";
import { Share as ShareIcon } from "lucide-react";

interface IProps {
  isAdmin: boolean;
}

const Share: FC<IProps> = ({ isAdmin }) => {
  const activeItem = useStore((state) => state.activeItem);
  const { data, isLoading, isValidating } = useShareList(activeItem?.id);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={data?.length ? "secondary" : "outline"}
          disabled={!isAdmin}
        >
          <ShareIcon />
          {data?.length ? "已分享" : "分享"}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" side="bottom" className="w-[420px] p-0">
        <h3 className="font-bold mb-2 mt-0 p-[10px] pb-0">
          分享给他人协同编辑
        </h3>
        <ShareList data={data} loading={isLoading || isValidating} />
        <ShareLink />
      </PopoverContent>
    </Popover>
  );
};

export default Share;
