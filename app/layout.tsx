import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import NavigationEvents from "@/components/navigation-events";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pmzdcst = localFont({
  src: "../public/font/PangMenZhengDaoCuShuTi-2.ttf",
  variable: "--font-custom-pmzdcst",
});

export const metadata: Metadata = {
  title: "摸鱼记📝",
  description: "摸鱼记📝--一个在线的在线文档",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pmzdcst.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            {children}
            <Toaster />
            <NavigationEvents />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
