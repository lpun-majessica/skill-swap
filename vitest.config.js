import { defineConfig } from "vitest/config";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

import nextEnv from "@next/env";
nextEnv.loadEnvConfig(process.cwd());

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    coverage: { reporter: ["text"] },
    include: ["src/**/*.test.js"],
    env: process.env,
    fileParallelism: false
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
});
