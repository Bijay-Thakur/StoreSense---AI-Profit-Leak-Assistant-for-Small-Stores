import path from "path";
import { fileURLToPath } from "url";

/** Directory containing this config file (= frontend package root). Pins Turbopack so it won't walk up to a parent lockfile (e.g. user home) and OOM. */
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("next").NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
