/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.VERCEL ? 'standalone' : 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
