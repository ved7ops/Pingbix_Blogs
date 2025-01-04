/** @type {import('next').NextConfig} */
const nextConfig = {
  // Development indicators
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },

  // Build settings
  staticPageGenerationTimeout: 1000,
  
  // Production optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Image configuration
  images: {
    remotePatterns: [
      {
        // Development
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      }
    ],
  },
}

module.exports = nextConfig