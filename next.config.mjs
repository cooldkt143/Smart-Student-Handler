/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    domains: ['placeholder.svg'],
    unoptimized: true,
  },
  devIndicators: false, // 🚫 Disable Dev Tools UI completely
  experimental: {},
}

export default nextConfig
