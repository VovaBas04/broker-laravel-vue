import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from "vite";
// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  const env = loadEnv(mode, process.cwd(), "");
  return defineConfig({
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    define: {
      "process.env": env,
    },
  })
})
