import { defineConfig, loadEnv } from 'vite'
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

const mode = process.env.NODE_ENV || 'development'
const { VITE_APP_SERVER_PORT, VITE_APP_SERVER_HOST, VITE_APP_SERVER_OPEN, VITE_APP_BUILD_OUTPUTDIR, VITE_APP_BUILD_DECLARATIONDIR, VITE_APP_BUILD_IDENTIFY } = loadEnv(mode, process.cwd())
const OUTPUTDIR = `${VITE_APP_BUILD_IDENTIFY}${VITE_APP_BUILD_OUTPUTDIR}`

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: parseInt(VITE_APP_SERVER_PORT),
    host: VITE_APP_SERVER_HOST,
    open: JSON.parse(VITE_APP_SERVER_OPEN)
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
      /** 
       * root：指定项目的根目录，默认为 Vite 配置文件的根目录，或者如果使用 Rollup，则为 process.cwd()。
       * outDir：指定声明文件的输出目录，可以是一个字符串或字符串数组，默认为 Vite 配置文件的 build.outDir 属性，或者如果使用 Rollup，则为 tsconfig.json 文件的 outDir 属性。
       * entryRoot：覆盖入口文件的根路径，用于在 monorepo 中使用，输出路径将基于提供的值计算。
       * strictOutput：是否限制声明文件的输出到 outDir 目录中，默认为 true。
       * compilerOptions：覆盖 TypeScript 编译器选项，默认为 null。
       * tsconfigPath：指定 tsconfig.json 文件的路径，默认为项目根目录。
       * resolvers：指定自定义解析器，默认为空数组。
       * pathsToAliases：是否解析 tsconfig.json 中的 paths 属性为别名，默认为 true。
       * aliasesExclude：指定哪些路径在转换别名时应该排除在外，默认为空数组。
       * cleanVueFileName：是否将以 .vue.d.ts 结尾的文件名转换为 .d.ts，默认为 false。
       * staticImport：是否将动态导入转换为静态导入，例如将 import('vue').DefineComponent 转换为 import { DefineComponent } from 'vue'，默认为 false。
       * include：覆盖 tsconfig.json 中的 include 属性。
       * exclude：覆盖 tsconfig.json 中的 exclude 属性，如果未提供则默认为 'node_module/**'。
       * clearPureImport：是否删除纯导入语句（即不带任何变量声明或副作用的导入语句），默认为 true。
       * insertTypesEntry：是否生成类型入口文件，默认为 false。
       * rollupTypes：在生成声明文件后是否对其进行 Rollup 操作，默认为 false。
       * bundledPackages：用于 @microsoft/api-extractor 的打包包列表，默认为空数组。
       * copyDtsFiles：是否将 .d.ts 源文件复制到输出目录中，默认为 false。
       * logLevel：日志记录级别，默认使用 Vite 配置文件中的 logLevel 属性。
       * afterDiagnostic：在生成声明文件后执行的钩子函数，在此函数中可以处理诊断信息并执行自定义逻辑。
       * beforeWriteFile：在写入每个声明文件之前执行的钩子函数，在此函数中可以修改文件路径或内容，并返回新的字符串作为修改后的文件内容。
       * afterBuild：在所有声明文件都写入后执行的钩子函数。
       * */ 
      entryRoot: "./packages",
      tsconfigPath: "./tsconfig.json",
      outDir: OUTPUTDIR,
      compilerOptions: {
        declarationMap: true,
        declarationDir: VITE_APP_BUILD_DECLARATIONDIR,
        declaration: true
      }
    }),
    DefineOptions(),
    {
      name: 'generate-bundle',
      writeBundle() {
        pkg(OUTPUTDIR)
        red(OUTPUTDIR)
      }
    },
    compression({ algorithm: 'brotliCompress', exclude: [/\.(br)$/, /\.(gz)$/, /\.(map)$/, 'types'] }),
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
  build: buildPackages(OUTPUTDIR),
})