/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'www.youtube.com',
      'youtube.com',
      'firebasestorage.googleapis.com',
      'pelteria-central.firebasestorage.app'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/b/**',
      },
    ],
  },
}

module.exports = nextConfig 