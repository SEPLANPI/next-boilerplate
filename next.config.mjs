/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  outputFileTracing: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: process.env.IMAGE_HOST_PROTOCOL,
  //       hostname: process.env.IMAGE_HOST_HOSTNAME,
  //       port: process.env.IMAGE_HOST_PORT
  //     }
  //   ]
  // },
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
  },
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*'
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*'
      },
      {
        source: '/ingest/decide',
        destination: 'https://us.i.posthog.com/decide'
      }
    ]
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true
}

export default nextConfig
