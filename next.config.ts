import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "picsum.photos"],
  },
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  webpack(config) {
    // Allow importing glsl shader files if needed in future
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["raw-loader"],
    });
    return config;
  },
};

export default nextConfig;
