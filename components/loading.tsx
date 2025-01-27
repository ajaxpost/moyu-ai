import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingPageProps {
  message?: string;
  className?: string;
}

export function LoadingPage({
  message = "Loading...",
  className,
}: LoadingPageProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-screen bg-background/50 backdrop-blur-sm",
        className
      )}
    >
      <div className="relative flex flex-col items-center gap-4">
        <div className="relative">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <div className="absolute inset-0 h-12 w-12 animate-ping opacity-20 rounded-full bg-primary" />
        </div>
        <p className="text-base font-medium text-primary animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
}
