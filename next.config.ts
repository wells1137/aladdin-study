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
};

export default nextConfig;
