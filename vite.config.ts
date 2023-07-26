import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from "vite-plugin-dts"
import { compression } from 'vite-plugin-compression2'
import DefineOptions from "unplugin-vue-define-options/vite"
import eslint from "vite-eslint-plugin"
import sass from 'sass'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import postcssMixins from "postcss-mixins"
// import  { libInjectCss } from 'vite-plugin-lib-inject-css'
// import libCss from 'vite-plugin-libcss'
// import vitePluginCssModules from "vite-plugin-css-modules"
// import vitePluginSass from './scripts/vite-plugin-sass.js'
// import vitePluginPurifycss from "vite-plugin-vue-purifycss"
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
// @ts-ignore
import pkg from './scripts/package-bundle.js'
// @ts-ignore
import red from './scripts/readme-bundle.js'
// @ts-ignore
import buildPackages from './scripts/build-packages'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eslint(),
    vue(),
    vueJsx(),
    // libCss(),
    // vitePluginSass(),
    // libInjectCss(),
    cssInjectedByJsPlugin(),
    dts({
      entryRoot: "./packages",
      outDir: "./dist/types",
      tsconfigPath: "./tsconfig.json",
      staticImport: true,
      // rollupTypes: true,
      insertTypesEntry: true,
      compilerOptions: {
        declarationMap: true
      }
    }),
    DefineOptions(),
    {
      name: 'generate-bundle',
      writeBundle() {
        pkg()
        red()
      }
    },
    compression({ algorithm: 'brotliCompress', exclude: [/\.(br)$/, /\.(gz)$/] }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  css: {
    postcss: {
      plugins: [],
    },
    preprocessorOptions: {
      scss: {
        implementation: sass
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'packages'),
      '@packages': path.resolve(__dirname, 'packages/index.ts')
    }
  },
  build: buildPackages,
})

