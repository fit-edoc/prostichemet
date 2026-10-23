import type { NextConfig } from "next";

const rawBackendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.BACKEND_URL ||
  "http://localhost:4000";

const backendUrl = rawBackendUrl.replace(/\/api\/v1\/?$/, "").replace(/\/+$/, "");

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
