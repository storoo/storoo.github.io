/**
 * Next.js configuration tailored for GitHub Pages static export.
 * Key points:
 * - basePath & assetPrefix ensure all routes + assets (including /_next/*) resolve under /math.storoo
 * - trailingSlash true so each page becomes a folder with index.html (friendlier for GH Pages)
 * - images.unoptimized because static export + GH Pages CDN (no Image Optimization server)
 */
const isProd = process.env.NODE_ENV === 'production'
// User-site (storoo.github.io) + custom domain (storoo.fr) deployment:
// No basePath or assetPrefix needed; everything served from domain root.

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // No basePath/assetPrefix required for user/organization site or custom domain.
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  compiler: { removeConsole: isProd },
  experimental: { webpackBuildWorker: false },
  webpack: (config, { isServer, dev }) => {
    // Allow importing .md files as raw text strings
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    })

    if (dev) {
      config.cache = { type: 'memory' }
    } else {
      config.cache = {
        type: 'filesystem',
        compression: false,
        maxAge: 1000 * 60 * 60 * 24 * 30,
      }
    }
    if (!isServer && !dev) {
      config.optimization.usedExports = true
      config.optimization.sideEffects = false
    }
    return config
  },
  publicRuntimeConfig: { basePath: '' },
}

export default nextConfig
