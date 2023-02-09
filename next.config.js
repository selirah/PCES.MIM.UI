

/**
 * @type {import('next').NextConfig}
 */


const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: 'https://pces-prod-mim-nextjs.azurewebsites.net',
    domains: [
      'pces-prod-mim-nextjs.azurewebsites.net'
    ],
  }
}

module.exports = nextConfig
