import { fileURLToPath, URL } from 'node:url'

import path from 'path';
import autoImport from 'unplugin-auto-import/vite';
import components from 'unplugin-vue-components/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/')],
      symbolId: '[name]',
      inject: 'body-first',
    }),

    // https://github.com/antfu/unplugin-auto-import
    autoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/api/**',
        'src/composables/**',
        'src/store/**',
        'src/utils/**',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    components({
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts',
    }),

    VueDevTools(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "src/assets/styles/variables/sass-mixins";',
      },
    },
    devSourcemap: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: process.env.NODE_ENV === 'production' ? '/slot_arena_site/' : '/'
})
