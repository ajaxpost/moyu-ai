"use client";
import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <Frown className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>找不到该文档，也可能是您没有对应的权限。</p>
    </main>
  );
}
