/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/ZKZ-personal-webpage',
  assetPrefix: '/ZKZ-personal-webpage',

  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig