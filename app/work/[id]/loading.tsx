import { ModeToggle } from "@/components/mode-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function Loading() {
  return (
    <div className="relative flex flex-col flex-1 h-full overflow-hidden">
      <header className="flex text-secondary-foreground my-2 mx-3 bg-ground pb-1">
        <div className="text-start inline-flex items-center">
          <Link href="/">
            <svg
              className="h-8 w-8 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </Link>
          <Skeleton className="w-[100px] h-[24px] rounded-full ml-5" />
        </div>
        <div className="flex-1 text-end">
          <ModeToggle />
        </div>
      </header>
      <div
        className="flex overflow-auto"
        style={{
          height: "calc(100vh - 50px)",
        }}
      >
        <div className="mx-auto mb-20 mt-8 w-[880px]">
          <div className="mx-10 mb-6">
            {/* <input
              className="border-input placeholder:text-muted-foreground flex h-10 w-full rounded-md border border-none bg-background p-0 text-4xl font-bold ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-transparent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              // placeholder="请输入标题..."
              // defaultValue={
              //   isHome ? "" : localStorage.getItem("doc_title") || ""
              // }
              maxLength={100}
            /> */}
          </div>
          <Skeleton className="w-full h-[20px] rounded-md mb-2 mx-10" />
          <Skeleton className="w-full h-[20px] rounded-md mb-2 mx-10" />
          <Skeleton className="w-1/2 h-[20px] rounded-md mb-2 mx-10" />
        </div>
      </div>
    </div>
  );
}
