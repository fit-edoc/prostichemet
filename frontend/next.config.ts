import type { NextConfig } from "next";

const backendUrl =
  process.env.BACKEND_URL ||
  (process.env.NEXT_PUBLIC_API_URL &&
  !process.env.NEXT_PUBLIC_API_URL.includes("localhost") &&
  !process.env.NEXT_PUBLIC_API_URL.includes("127.0.0.1")
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/v1\/?$/, "")
    : "http://127.0.0.1:4000");

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
