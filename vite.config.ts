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
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Inspect from 'vite-plugin-inspect'
import { visualizer } from 'rollup-plugin-visualizer'
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
  server: {
    port: 10000
  },
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
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],
    
      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),
    
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon'
        }),
      ],
      dts: './auto-imports.d.ts',
    }),
    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],
      dts: './components.d.ts',
    }),
    Icons({
      autoInstall: true,
    }),
    Inspect(),
    visualizer({
      filename: 'examples/assets/visualizer.html'
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
      '@packages': path.resolve(__dirname, 'packages/index.ts'),
      '@examples': path.resolve(__dirname, 'examples')
    }
  },
  build: buildPackages,
})