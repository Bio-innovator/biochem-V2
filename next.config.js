/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
  experimental: {
    // 部署时把「网站用图」素材目录打包进 /assets 路由的运行环境
    outputFileTracingIncludes: {
      '/assets/[...slug]': ['./网站用图/**'],
    },
  },
};
module.exports = nextConfig;
