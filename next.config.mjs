/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
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
