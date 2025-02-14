import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  devIndicators: {
    appIsrStatus: true,
  },
  output: "standalone",
  // output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
      {
        protocol: "https",
        hostname: "foruda.gitee.com",
        port: "",
        pathname: "/avatar/**",
      },
      {
        protocol: "http",
        hostname: "assert.moyu-web.cn",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "gitee.com",
        port: "",
        pathname: "/assets/**",
      },
      {
        protocol: "http",
        hostname: "moyu-assert.oss-cn-beijing.aliyuncs.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
  experimental: {
    // staleTimes: {
    //   dynamic: 60, // 对于动态页面，缓存 60s，默认 0s
    //   static: 180,
    // },
    // ppr: "incremental",
    // turbo: {
    //   rules: {
    //     "*.svg": {
    //       loaders: ["@svgr/webpack"],
    //       as: "*.tsx",
    //     },
    //   },
    // },
  },
  webpack: (config) => {
    // Grab the existing rule that handles SVG imports
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
};

export default nextConfig;
