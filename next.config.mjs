/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  reactStrictMode: false,
  transpilePackages: [
    '@douyinfe/semi-ui',
    '@douyinfe/semi-icons',
    '@douyinfe/semi-illustrations',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '',
      },
    ],
  },
};

export default nextConfig;
