/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.50.30',
        port: '8000'
      }
    ]
  },
  // Habilitar Streaming e Suspense com Nginx
  async headers () {
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
