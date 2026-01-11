/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
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
        hostname: '**.transistor.fm',
      },
      {
        protocol: 'https',
        hostname: '**.hubspot.com',
      },
      {
        protocol: 'https',
        hostname: '**.hsforms.com',
      },
    ],
  },
}

module.exports = nextConfig
