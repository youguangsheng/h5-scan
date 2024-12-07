import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "@vant/auto-import-resolver";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()]
    }),
    Components({
      resolvers: [VantResolver()]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src") // 路径别名
    }
  },
  base: "./",
  build: { outDir: "docs" },
  server: {
    proxy: {
      "/api": {
        target: "http://1.94.32.227:8080/", // 代理目标服务器地址
        changeOrigin: true, // 是否改变源地址
        rewrite: path => path.replace(/^\/api/, "/api") // 路径重写
      }
    }
  }
});
