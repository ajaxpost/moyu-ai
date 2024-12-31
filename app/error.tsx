"use client";
import LoadFail from "@/assert/svg/load-fail.svg";

export default function NotFound() {
  return (
    <div className="flex items-center flex-col h-screen w-full justify-center overflow-hidden">
      <LoadFail />
    </div>
  );
}
