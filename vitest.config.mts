import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// The app resolves `@/` through tsconfig paths; tests need the same mapping.
export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
});
