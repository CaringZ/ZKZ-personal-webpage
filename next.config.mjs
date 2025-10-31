const repo = 'ZKZ-personal-webpage';
const assetPrefix = `/${repo}`;
const basePath = `/${repo}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  assetPrefix: assetPrefix,
  basePath: basePath,

  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
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