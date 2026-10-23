import type { NextConfig } from "next";

const backendUrl =
  process.env.BACKEND_URL      ||
  (process.env.BACKEND_URL &&
  !process.env.BACKEND_URL.includes("localhost") &&
  !process.env.BACKEND_URL.includes("127.0.0.1")
    ? process.env.BACKEND_URL.replace(/\/api\/v1\/?$/, "")
    : "http://localhost:4000");

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${backendUrl.replace(/\/+$/, "")}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
