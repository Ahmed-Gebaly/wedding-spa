import type { NextConfig } from "next";

const repoName = "wedding-spa";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : undefined,
  images: {
    unoptimized: true,
    qualities: [75, 85, 88],
  },
};

export default nextConfig;
