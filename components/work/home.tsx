import React from "react";
import { Plus, FileText, Clock, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { emitter, EventEnum } from "@/shared/utils/event";

export default function Home() {
  const handlerAddDoc = () => {
    emitter.emit(EventEnum.ADD_DOC);
  };

  return (
    <div>
      <div className="my-2 mx-3 pb-1">
        <Link href="/" target="_parent" prefetch scroll={false}>
          <Image src="/icon.png" width={38} height={40} alt="logo" />
        </Link>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">开始</h1>

        {/* 快速操作区 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <QuickAction
            icon={<Plus className="w-5 h-5" />}
            title="新建文档"
            description="创建一个空白文档"
            onClick={handlerAddDoc}
          />
          <QuickAction
            icon={<FileText className="w-5 h-5" />}
            title="模版中心"
            description="从模版中获取灵感"
          />
          <QuickAction
            icon={<Clock className="w-5 h-5" />}
            title="最近访问"
            description="最近打开的文档"
          />
          <QuickAction
            icon={<Star className="w-5 h-5" />}
            title="收藏文档"
            description="查看已收藏文档"
          />
        </div>

        {/* 最近文档列表 */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">最近文档</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <DocumentCard key={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-accent transition-colors"
    >
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
        {icon}
      </div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </button>
  );
}

function DocumentCard() {
  return (
    <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-medium mb-1 truncate">未命名文档</h3>
          <p className="text-sm text-muted-foreground">上次编辑于 2024-01-01</p>
        </div>
        <button className="text-muted-foreground hover:text-primary">
          <Star className="w-4 h-4" />
        </button>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2">
        这是文档的预览内容...
      </p>
    </div>
  );
}
