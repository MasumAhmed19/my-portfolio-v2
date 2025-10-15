import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },{
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'ui.shadcn.com',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      },
    ],
  },
  // Force dynamic rendering to avoid build timeouts
  outputFileTracingIncludes: {
    '/(public)/**/*': ['./src/data/**/*'],
  },
};

export default nextConfig;
