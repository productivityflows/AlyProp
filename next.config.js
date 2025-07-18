/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['api.estated.com', 'maps.googleapis.com', 'images.unsplash.com'],
  },
  env: {
    ESTATED_API_KEY: process.env.ESTATED_API_KEY,
    CLAUDE_API_KEY: process.env.CLAUDE_API_KEY,
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    NEXT_PUBLIC_APP_NAME: 'AlyProp',
  },
}

module.exports = nextConfig