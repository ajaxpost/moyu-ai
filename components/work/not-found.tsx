"use client";
import { Frown, Home, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/menu";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex h-full flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Frown className="w-12 h-12 text-muted-foreground" />
          <div className="absolute inset-0 w-12 h-12 animate-ping opacity-20 rounded-full bg-muted-foreground" />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-2xl font-semibold">找不到该文档</h2>
          <p className="text-muted-foreground max-w-[400px]">
            该文档可能已被删除、移动或您没有访问权限。请检查文档链接是否正确，或联系文档所有者获取访问权限。
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4" />
          返回上一页
        </Button>
        <Button
          // variant="outline"
          className="gap-2"
          onClick={() => {
            useStore.setState({
              activeItem: {
                id: "0",
              },
            });
            window.history.pushState({}, "", `/work/0`);
          }}
        >
          <Home className="w-4 h-4" />
          返回首页
        </Button>
        {/* <Button className="gap-2" onClick={() => router.push("/search")}>
          <Search className="w-4 h-4" />
          搜索文档
        </Button> */}
      </div>

      <div className="mt-8 text-sm text-muted-foreground">
        <p>如需帮助，请联系管理员或发送邮件至：</p>
        <a
          href="mailto:13171754463@163.com"
          className="text-primary hover:underline"
        >
          13171754463@163.com
        </a>
      </div>
    </main>
  );
}
