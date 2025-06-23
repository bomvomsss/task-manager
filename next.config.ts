import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  source: "/",
  destination: "/main",
  permanent: true,
};

export default nextConfig;
