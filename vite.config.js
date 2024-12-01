import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src") // 路径别名
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "", // 代理目标服务器地址
        changeOrigin: true, // 是否改变源地址
        rewrite: path => path.replace(/^\/api/, "") // 路径重写
      }
    }
  }
});
