/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: process.env.IMAGE_HOST_PROTOCOL,
        hostname: process.env.IMAGE_HOST_HOSTNAME,
        port: process.env.IMAGE_HOST_PORT
      },

    ]
  },
  // Habilitar Streaming e Suspense com Nginx
  async headers() {
    return [
      {
        source: '/:path*{/}?',
        headers: [
          {

            key: 'X-Accel-Buffering',
            value: 'no'

          }

        ]
      }
    ]
  }
}

export default nextConfig
