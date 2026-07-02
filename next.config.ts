import type { NextConfig } from "next";

const allowedDevOrigins = (
  process.env.SUGILANON_ALLOWED_DEV_ORIGINS || ""
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: process.cwd(),
  },
  allowedDevOrigins,
  async rewrites() {
    const apiBase = process.env.CONTENT_API_BASE_URL || "http://backend:4000/api";

    return [
      {
        source: "/api/:path*",
        destination: `${apiBase.replace(/\/$/, "")}/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.pagasa.dost.gov.ph",
      },
      {
        protocol: "https",
        hostname: "pubfiles.pagasa.dost.gov.ph",
      },
      {
        protocol: "https",
        hostname: "www.phivolcs.dost.gov.ph",
      },
    ],
  },
};

export default nextConfig;
