const repo = 'ZKZ-personal-webpage';
const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 只在生产环境（部署到 GitHub 时）才使用 assetPrefix
  assetPrefix: isProd ? `/${repo}` : '',
  // 只在生产环境（部署到 GitHub 时）才使用 basePath
  basePath: isProd ? `/${repo}` : '',

  // 这个 env 块可以删掉了，因为 Next.js 会自动处理 basePath，不再需要手动传递
  // env: {
  //   NEXT_PUBLIC_BASE_PATH: isProd ? `/${repo}` : '',
  // },

  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig;