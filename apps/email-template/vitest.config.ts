/// <reference types="vitest" />
import { getViteConfig } from "astro/config"

export default getViteConfig({
  test: {
    environment: "node",
    globals: false,
    watch: false,
    include: ["test/**/*.test.ts"],
  },
})
