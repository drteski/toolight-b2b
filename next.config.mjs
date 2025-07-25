import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staticGenerationRetryCount: 1,
    staticGenerationMaxConcurrency: 2,
    staticGenerationMinPagesPerWorker: 25,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  transpilePackages: ['@payloadcms/ui'],
  compress: true,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
