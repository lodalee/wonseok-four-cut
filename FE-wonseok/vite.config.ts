import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@page": "/src/page",
      "@components": "/src/components",
      "@util": "/src/util",
      "@type": "/src/type",
    },
  },
});
