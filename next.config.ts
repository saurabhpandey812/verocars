import type { NextConfig } from "next";
import path from "path";

const config: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  // Parent F:\react has its own lockfile; pin tracing root to this app.
  outputFileTracingRoot: path.join(__dirname),
};

export default config;
