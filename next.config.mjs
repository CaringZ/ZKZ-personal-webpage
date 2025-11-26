const repo = 'ZKZ-personal-webpage';
const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // output: 'export', // Temporarily disabled for development
  assetPrefix: isProd ? `/${repo}` : '',
  basePath: isProd ? `/${repo}` : '',

  // 恢复这一块！让客户端JS可以访问到这个环境变量
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repo}` : '',
  },

  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig;