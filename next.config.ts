import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
        reactRemoveProperties: true,
    },
    experimental: {
        optimizePackageImports: ['lucide-react'],
        optimizeCss: true,
    },
    images: {
        deviceSizes: [320, 420, 768, 1024, 1200, 1920, 2560],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'sigmally.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.sigmally.xyz',
            },
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.discordapp.com',
            },
        ],
    },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
