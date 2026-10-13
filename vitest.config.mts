import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// The app resolves `@/` through tsconfig paths; tests need the same mapping.
export default defineConfig({
  test: { exclude: ["tests/launch/**", "node_modules/**"] },
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
});
