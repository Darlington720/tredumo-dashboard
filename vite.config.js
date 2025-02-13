import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "/valex/preview/",
  define: {
    "process.env": {},
  },
  // build: {
  //   chunkSizeWarningLimit: 5000,
  // },
  build: {
    chunkSizeWarningLimit: 1000,
    // sourcemap: true,
    target: "esnext",
    // minify: false,

    lilib: {
      entry: "src/main.jsx", // replace with the path to your main entry file
      formats: ["es"],
    },
    rollupOptions: {
      // output: {
      //   exports: "named",
      // },
      manualChunks(id) {
        // Check if the module belongs to any of the following dependencies
        if (id.includes("node_modules")) {
          // If yes, include it in a separate chunk
          return "vendor";
        }
      },
    },
  },
  server: {
    host: true,
  },
  node: { global: true },
});
