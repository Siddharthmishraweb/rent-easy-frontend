// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ['images.unsplash.com', 'images.pexels.com', 'img.freepik.com', 'randomuser.me', 's3-figma-hubfile-images-production.figma.com'],
//     // Optional: Configure image optimization
//     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//     formats: ['image/webp'],
//     basePath: '/rent-easy-frontend', // Your repo name
//     assetPrefix: '/rent-easy-frontend/',
//     images: {
//       unoptimized: true, // Required for static export
//     },
//     output: 'export'
//   },
// }

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Top-level config for GitHub Pages
  basePath: '/rent-easy-frontend',      // repo name
  assetPrefix: '/rent-easy-frontend/',  // repo name
  output: 'export',                     // for static export

  images: {
    domains: [
      'images.unsplash.com',
      'images.pexels.com',
      'img.freepik.com',
      'randomuser.me',
      's3-figma-hubfile-images-production.figma.com'
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    unoptimized: true,  // important for static export
  },
};

module.exports = nextConfig;
