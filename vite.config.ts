import { defineConfig } from "vite";
import { extname, resolve } from "path";

export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        contactResult: resolve(__dirname, "contact-result.html")
      },
      output: {
        entryFileNames: "assets/js/[name]-[hash].js",
        chunkFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const ext = extname(assetInfo.name ?? "").toLowerCase();

          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(ext)) {
            return "assets/img/[name]-[hash][extname]";
          }

          if (/\.(woff2?|ttf|otf|eot)$/.test(ext)) {
            return "assets/fonts/[name]-[hash][extname]";
          }

          if (ext === ".css") {
            return "assets/css/[name]-[hash][extname]";
          }

          return "assets/misc/[name]-[hash][extname]";
        }
      }
    }
  }
});
