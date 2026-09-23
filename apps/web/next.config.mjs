const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  basePath,
  assetPrefix: basePath || undefined,
  experimental: {
    optimizePackageImports: ['recharts']
  },
  images: {
    unoptimized: true
  }
};

export default nextConfig;
