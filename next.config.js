/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    API_URL: 'https://dummyjson.com',
    PAGINATION_LIMIT: '6',
    PAGINATION_SKIP: '0',
    DEBOUNCE_TIME: 500
  }
}

module.exports = nextConfig
