import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["./tests/**/*.spec.ts"],
    exclude: ["node_modules"],
    passWithNoTests: true,
    testTimeout: 20_000,
    environment: "node",
    open: true,
    maxConcurrency: 1,
  },
});
