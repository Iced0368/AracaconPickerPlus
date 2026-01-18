import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import monkey from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    monkey({
      entry: "src/main.jsx",
      userscript: {
        name: "아카콘 픽커 플러스(Arcacon Picker Plus)",
        namespace: "npm/vite-plugin-monkey",
        match: ["https://arca.live/*"],
        description: "아카콘 기능 확장",
        license: "MIT",
        version: "0.8.0",
      },
    }),
  ],
});
