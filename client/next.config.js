/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4444/:path*', // The :path parameter is used here so will not be automatically passed in the query
      },
    ]
  },
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4444',
        pathname: '/static/*',
      }
    ],
  }
}

module.exports = nextConfig
