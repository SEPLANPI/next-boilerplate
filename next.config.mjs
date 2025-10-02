/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  transpilePackages: ['nuqs']
}

export default nextConfig
