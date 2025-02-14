"use client";

import { useState, useEffect } from "react";
import { InboxIcon as EnvelopeIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function CheckEmail() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const storedEmail = searchParams.get("email") as string;
    setEmail(storedEmail);

    const timer = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown > 0 ? prevCountdown - 1 : 0
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 text-blue-500 mb-6">
            <EnvelopeIcon size={64} />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            检查你的电子邮件
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            我们已经发送了一封包含登录链接的邮件到
          </p>
          <p className="font-medium text-blue-600 text-lg mt-1">{email}</p>
        </div>
        <div className="mt-8 space-y-6">
          <p className="text-center text-sm text-gray-600">
            点击邮件中的链接来完成登录。
            <br />
            如果你没有收到邮件，请检查你的垃圾邮件文件夹。
          </p>
          <div className="text-center">
            <p className="text-sm text-gray-500">预计邮件将在以下时间内送达</p>
            <p className="text-2xl font-bold text-blue-600 mt-2">
              {countdown} 秒
            </p>
          </div>
          <div className="pt-6 text-center">
            <p className="text-xs text-gray-500">
              遇到问题？请联系我们的{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300"
              >
                支持团队
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
