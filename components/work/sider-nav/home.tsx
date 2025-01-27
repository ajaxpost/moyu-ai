"use client";
import { FC } from "react";
import { Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/menu";

const Home: FC = () => {
  const handlerClick = () => {
    useStore.setState({
      activeItem: {
        id: "0",
      },
    });
    window.history.pushState({}, "", `/work/0`);
  };

  return (
    <div>
      <Button
        onClick={handlerClick}
        variant="ghost"
        className="w-full justify-start items-center cursor-pointer"
      >
        <HomeIcon />
        我的首页
      </Button>
    </div>
  );
};

export default Home;
