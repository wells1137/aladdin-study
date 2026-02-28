import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    transpilePackages: ['react-map-gl', 'maplibre-gl'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
