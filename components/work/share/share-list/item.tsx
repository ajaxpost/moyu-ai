import { FC } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { UserInfo } from "@/shared";
import { PowerEnum } from "@/shared/enum";

interface IProps {
  userInfo: UserInfo;
  power: PowerEnum;
}

const Item: FC<IProps> = ({ userInfo, power }) => {
  return (
    <div className="p-[10px]">
      <div className="flex items-center justify-between">
        <div className="mr-7 flex justify-start items-center overflow-hidden">
          <Image
            className="cursor-pointer rounded-full mr-2"
            src={userInfo.image}
            alt="img"
            width={28}
            height={28}
            quality={100}
          />
          <p className="w-52 mb-0 overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {userInfo.name}
            <span className="text-[#8a8f8d] text-xs">「{userInfo.email}」</span>
          </p>
        </div>
        <Badge variant="secondary">
          {power === PowerEnum.EDIT ? "可编辑" : "可阅读"}
        </Badge>
      </div>
    </div>
  );
};

export default Item;
