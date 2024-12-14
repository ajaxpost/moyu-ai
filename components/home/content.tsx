import { Zap } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Context() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              MOYU,智能写作 高效工作
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              <span>
                🐈 基于 GPT 模型，AI 智能写作，AI
                文本处理，分享文档，多人协同编辑
              </span>
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <Link href="/work">
              <Button className="h-11 rounded-md px-8 text-base">
                <Zap />
                开始使用
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
