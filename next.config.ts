import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    AZURE_TEXT_ANALYTICS_KEY: process.env.AZURE_TEXT_ANALYTICS_KEY,
    AZURE_TEXT_ANALYTICS_ENDPOINT: process.env.AZURE_TEXT_ANALYTICS_ENDPOINT,
  },
};

export default nextConfig;
