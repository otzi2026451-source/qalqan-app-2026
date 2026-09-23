const repoName = process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` : '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  basePath: repoName,
  assetPrefix: repoName || undefined,
  experimental: {
    optimizePackageImports: ['recharts']
  },
  images: {
    unoptimized: true
  }
};

export default nextConfig;
