import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   experimental: {
    // Add any experimental features you want to enable
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
