import { defineConfig, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import { configDefaults as vitestConfig } from 'vitest/config'
import type { UserConfigExport as VitestConfig } from 'vitest/config'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    ...vitestConfig,
    environment: 'jsdom',
    coverage: {
      exclude: [
        ...(vitestConfig.coverage.exclude || []),
        '**/*.config.js',
        '**/main.ts',
        '**/*.story.ts'
      ]
    },
    setupFiles: [resolve(__dirname, 'test/setup.ts')],
    reporters: ['dot']
  } as VitestConfig
} as UserConfigExport & { test: VitestConfig })
