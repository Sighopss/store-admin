/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_PRODUCT_SERVICE_URL: process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001',
    NEXT_PUBLIC_ORDER_SERVICE_URL: process.env.ORDER_SERVICE_URL || 'http://localhost:3002',
  },
}

module.exports = nextConfig

