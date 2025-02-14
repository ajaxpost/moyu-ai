"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import GihubIcon from "@/assert/svg/github-mark-white.svg";
import GiteeIcon from "@/assert/svg/gitee-logo-white.svg";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { getUri } from "@/shared";

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const session = useSession();

  useEffect(() => {
    if (session.data?.user) {
      router.push("/");
    }
  }, [session, router]);

  const handleOAuthSignIn = async (provider: "github" | "gitee") => {
    try {
      setIsLoading(true);
      await signIn(provider, {
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("登录失败:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = await signIn("email", {
        email,
        redirect: false,
        callbackUrl: "/",
      });
      if (data?.ok) {
        router.push(
          getUri("/check-email", {
            email,
          })
        );
      } else {
        alert("出现了错误，请稍后再试");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("邮箱登录失败:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0A0A0A] p-4">
      {/* Logo 区域 */}
      <div className="mb-8">
        <Image src="/icon.png" alt="logo" width={48} height={50} />
      </div>

      {/* 标题区域 */}
      <div className="mb-10 text-center">
        <h1 className="mb-2 font-pmzdcst bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-4xl font-bold text-transparent">
          登录 摸鱼记
        </h1>
        <p className="text-sm text-zinc-500">选择你喜欢的方式继续</p>
      </div>

      {/* 登录选项区域 */}
      <div className="w-full max-w-[360px] space-y-3">
        {!showEmailInput ? (
          <>
            <button
              onClick={() => handleOAuthSignIn("github")}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50"
            >
              <GihubIcon />
              <span>使用 GitHub 继续</span>
            </button>

            <button
              onClick={() => handleOAuthSignIn("gitee")}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50"
            >
              <GiteeIcon />
              <span>使用 Gitee &nbsp;&nbsp;继续</span>
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-[#0A0A0A] px-2 text-zinc-500">或者</span>
              </div>
            </div>

            <button
              onClick={() => setShowEmailInput(true)}
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>使用邮箱继续</span>
            </button>
          </>
        ) : (
          <form onSubmit={handleEmailSignIn} className="space-y-3">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="输入你的邮箱地址"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading && (
                <LoaderCircle className="animate-spin mr-1" size={18} />
              )}
              继续
            </button>
            <button
              type="button"
              onClick={() => setShowEmailInput(false)}
              className="w-full text-sm text-zinc-500 hover:text-zinc-400"
            >
              返回其他登录方式
            </button>
          </form>
        )}
      </div>

      {/* 底部文字 */}
      <p className="mt-8 text-center text-sm text-zinc-500">
        继续即表示您同意我们的
        <a href="/terms" className="mx-1 text-zinc-400 hover:text-white">
          服务条款
        </a>
        和
        <a href="/privacy" className="ml-1 text-zinc-400 hover:text-white">
          隐私政策
        </a>
      </p>
    </div>
  );
}
