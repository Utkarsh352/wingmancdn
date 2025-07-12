/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['openrouter.ai'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig 