import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'img.transistorcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'img.transistor.fm',
      },
      {
        protocol: 'https',
        hostname: 'sidekickstrategies.com',
      },
    ],
  },
}

export default nextConfig
