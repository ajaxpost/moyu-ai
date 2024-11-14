'use client';

import Header from '@/components/header';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { Button, Layout } from '@douyinfe/semi-ui';
import Link from 'next/link';

const { Content } = Layout;

export default function Page() {
  return (
    <Layout className="components-layout-demo">
      <Header />
      <Content className="relative w-full overflow-hidden py-12 text-center md:py-24 lg:py-32 xl:py-48">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          MOYU,智能写作 高效工作
        </h1>
        <p className="mx-auto my-4 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          基于 GPT 模型，AI 智能写作，AI 文本处理，分享文档，多人协同编辑
        </p>
        <div className="flex justify-center">
          <SignedOut>
            <SignInButton>
              <Button
                type="primary"
                className="w-[200px]"
                style={{
                  height: 52,
                  fontSize: 18,
                }}
              >
                登录 / 注册
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/work">
              <Button
                type="primary"
                className="w-[200px]"
                style={{
                  height: 52,
                  fontSize: 18,
                }}
              >
                开始使用
              </Button>
            </Link>
          </SignedIn>
        </div>
      </Content>
    </Layout>
  );
}
