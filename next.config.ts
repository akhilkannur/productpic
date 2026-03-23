import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true, // For static hosting ease, or you can configure remote patterns
  },
};

export default nextConfig;