import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { seoFilesPlugin } from './vite.seo.ts'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, 'VITE_')
  return {
    plugins: [react(), tailwindcss(), seoFilesPlugin(env.VITE_SITE_URL)],
    resolve: {
      alias: {
        '@': path.resolve(rootDir, './src'),
      },
    },
  }
})
