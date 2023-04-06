/** @type {import('next').NextConfig} */

const nextConfig = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.scdn.co',
      },
    ],
  },
};

module.exports = nextConfig;
