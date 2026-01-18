/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable server actions
    experimental: {
        serverActions: {
            bodySizeLimit: '2mb',
        },
    },
    // Ignore TypeScript errors during build for demo
    typescript: {
        ignoreBuildErrors: true,
    },
    // Ignore ESLint errors during build for demo
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
