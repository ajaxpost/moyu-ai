import { FC } from "react";
import Item from "./item";
import { ShareListResp } from "@/hooks/share/use-share-list";

interface IProps {
  data: ShareListResp | undefined;
  loading: boolean;
}

const ShareList: FC<IProps> = ({ data, loading }) => {
  const render = () => {
    if (loading) {
      return <span>加载中...</span>;
    }
    if (data?.length) {
      return data?.map((item) => {
        return (
          <Item key={item.id} userInfo={item.userInfo} power={item.power} />
        );
      });
    }
    return <span>暂无数据</span>;
  };

  return (
    <div className="max-h-72 overflow-auto p-[10px] pt-0 border-b border-solid">
      {render()}
    </div>
  );
};

export default ShareList;
