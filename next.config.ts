import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  devIndicators: {
    appIsrStatus: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
    ],
  },
  // experimental: {
  //   staleTimes: {
  //     dynamic: 60, // 对于动态页面，缓存 60s，默认 0s
  //     static: 180,
  //   },
  // },
};

export default nextConfig;
