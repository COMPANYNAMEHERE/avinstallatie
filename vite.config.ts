import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/avinstallatie/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        contact: resolve(__dirname, "contact.html")
      }
    }
  }
});
