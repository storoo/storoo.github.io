/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // Remove basePath - let GitHub Pages handle the subdirectory
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Add experimental features to handle Windows issues
  experimental: {
    // Disable webpack cache on Windows to prevent file system errors
    webpackBuildWorker: false,
  },
  webpack: (config, { isServer, dev }) => {
    // Configure cache based on environment and platform
    if (dev) {
      // Use memory cache in development to avoid Windows file system issues
      config.cache = { type: 'memory' };
    } else {
      // Use filesystem cache in production with error handling
      config.cache = {
        type: 'filesystem',
        compression: false, // Disable compression to reduce write errors
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      };
    }
    
    // Tree shake unused imports only in production
    if (!isServer && !dev) {
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }
    
    return config;
  },
}

export default nextConfig
