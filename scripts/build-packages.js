/**
 * rollupOptions 对象
 * `amd`: 用于配置打包后的模块是否采用 AMD 格式输出。如果设置为 `true`，则打包后的模块将采用 AMD 格式输出；否则将采用 ES 模块格式输出。
 * `assetFileNames`: 用于配置打包后生成的静态资源文件名。可以设置为字符串或者函数类型，函数类型接受一个包含有关资源信息的对象作为参数，并返回一个字符串作为资源文件名。
 * `banner`: 用于在打包文件的顶部添加一个注释。可以设置为字符串或者函数类型，函数类型接受一个包含有关打包信息的对象作为参数，并返回一个字符串作为注释。
 * `chunkFileNames`: 用于配置打包后生成的代码块文件名。可以设置为字符串或者函数类型，函数类型接受一个包含有关代码块信息的对象作为参数，并返回一个字符串作为代码块文件名。
 * `compact`: 用于配置是否启用代码压缩。如果设置为 `true`，则代码将被压缩；否则将不会被压缩。
 * `dir`: 用于配置打包后的文件输出目录。
 * `dynamicImportFunction`: 已经被废弃，不再需要使用。
 * `dynamicImportInCjs`: 用于配置在 CommonJS 模块中是否启用动态导入。如果设置为 `true`，则在 CommonJS 模块中将启用动态导入；否则将不会启用。
 * `entryFileNames`: 用于配置打包后生成的入口文件名。可以设置为字符串或者函数类型，函数类型接受一个包含有关入口信息的对象作为参数，并返回一个字符串作为入口文件名。
 * `esModule`: 用于配置是否启用 ES 模块格式输出。如果设置为 `true`，则打包后的模块将采用 ES 模块格式输出；否则将采用 CommonJS 格式输出。此外，还可以设置为 `'if-default-prop'`，表示只有当模块使用了默认导出时才采用 ES 模块格式输出。
 * `experimentalDeepDynamicChunkOptimization`: 已经被废弃，不再需要使用。
 * `experimentalMinChunkSize`: 用于配置代码块最小大小。如果代码块大小小于该值，则会尝试将其与其他代码块合并。
 * `exports`: 用于配置模块导出方式。可以设置为 `'default'`、`'named'`、`'none'`、`'auto'` 中的一种，分别表示默认导出、命名导出、不导出、自动导出。
 * `extend`: 用于配置是否启用扩展运算符。如果设置为 `true`，则启用扩展运算符；否则将禁用扩展运算符。
 * `externalImportAssertions`: 用于配置是否启用外部导入断言。如果设置为 `true`，则启用外部导入断言；否则将禁用外部导入断言。
 * `externalLiveBindings`: 用于配置是否启用外部绑定。如果设置为 `true`，则启用外部绑定；否则将禁用外部绑定。
 * `file`: 用于配置打包后生成的文件名。
 * `footer`: 用于在打包文件的底部添加一个注释。可以设置为字符串或者函数类型，函数类型接受一个包含有关打包信息的对象作为参数，并返回一个字符串作为注释。
 * `format`: 用于配置打包后的模块格式。可以设置为 `'cjs'`、`'esm'`、`'umd'`、`'iife'` 中的一种。
 * `freeze`: 用于配置是否启用冻结对象。如果设置为 `true`，则启用冻结对象；否则将禁用冻结对象。
 * `generatedCode`: 用于配置生成代码的选项。可以设置为 `'es2015'`、`'es2016'`、`'es2017'`、`'es2018'`、`'es2019'`、`'es2020'`、`'es2021'`、`'modern'` 中的一种，或者是一个生成代码选项对象。
 * `globals`: 用于配置全局变量映射。可以设置为一个对象，其中键表示模块中使用的变量名，值表示全局变量名。
 * `hoistTransitiveImports`: 用于配置是否提升传递依赖项。如果设置为 `true`，则会尝试提升传递依赖项；否则将不会提升传递依赖项。
 * `indent`: 用于配置代码缩进。可以设置为字符串或者布尔值类型，布尔值类型表示是否启用默认缩进（2 个空格）。
 * `inlineDynamicImports`: 用于配置是否内联动态导入。如果设置为 `true`，则内联动态导入；否则将不会内联动态导入。
 * `interop`: 用于配置模块交互方式。可以设置为 `'auto'`、`'esModuleInterop'`、`'defaultOnly'`、一个返回交互方式的函数。
 * `intro`: 用于在打包文件的顶部添加一个注释。可以设置为字符串或者函数类型，函数类型接受一个包含有关打包信息的对象作为参数，并返回一个字符串作为注释。
 * `manualChunks`: 用于手动分割代码块。可以设置为一个对象，其中键表示代码块名称，值表示该代码块所包含的模块列表。
 * `minifyInternalExports`: 用于配置是否压缩内部导出。如果设置为 `true`，则压缩内部导出；否则将不会压缩内部导出。
 * `name`: 用于配置打包后生成的模块名称。
 * `namespaceToStringTag`: 已经被废弃，不再需要使用。
 * `noConflict`: 用于配置是否启用无冲突模式。如果设置为 `true`，则启用无冲突模式；否则将禁用无冲突模式。
 * `outro`: 用于在打包文件的底部添加一个注释。可以设置为字符串或者函数类型，函数类型接受一个包含有关打包信息的对象作为参数，并返回一个字符串作为注释。
 * `paths`: 用于配置模块路径映射。可以设置为一个对象，其中键表示模块名前缀，值表示对应路径前缀。
 * `plugins`: 用于配置插件列表。可以设置为一个数组，其中每个元素表示一个插件对象或者插件名称，并且每个插件都必须实现指定的生命周期方法。
 * `preferConst`: 已经被废弃，不再需要使用。
 * `preserveModules`: 用于配置是否保留模块结构。如果设置为 `true`，则保留模块结构；否则将会把所有模块合并到一个文件中。
 * `preserveModulesRoot`: 用于配置保留模块结构时输出目录的根目录路径。
 * `sanitizeFileName`: 用于配置是否对文件名进行安全处理。如果设置为 `true`，则对文件名进行安全处理；否则将不会进行安全处理。此外，还可以设置为一个函数类型，该函数接受文件名作为参数，并返回处理后的文件名。
 * `sourcemap`: 用于配置是否生成源映射文件。可以设置为布尔值、`'inline'` 或者 `'hidden'` 中的一种。 
 */

import { name, version, author, dependencies } from '../package.json'

const external = Object.keys(dependencies)

const globals = toCamelCaseObject(external)

const banner =
  '/*!\n' +
  ` * ${name} v${version}\n` +
  ` * (c) ${new Date().getFullYear()-1}-${new Date().getFullYear()} ${author}\n` +
  ' * Released under the MIT License.\n' +
  ' */'

export default 
{
  cssTarget: "chrome80",
  minify: "terser",
  sourcemap: true,
  terserOptions: {
    compress: {
      keep_infinity: true,
      drop_console: true, 
      drop_debugger: true
    }
  },
  chunkSizeWarningLimit: 2000,
  rollupOptions: {
    external,
    input: ["packages/index.ts"],
    output: [
      {
        format: "esm",
        entryFileNames: "[name].mjs",
        preserveModules: true,
        exports: "named",
        dir: "dist/es",
        globals,
        banner,
        assetFileNames: 'assets/[name].[ext]',
        compact: true,
        minifyInternalExports: true
      },
      {
        format: "cjs",
        entryFileNames: "[name].js",
        preserveModules: true,
        exports: "named",
        dir: "dist/lib",
        globals,
        banner,
        assetFileNames: 'assets/[name].[ext]',
        compact: true,
        minifyInternalExports: true
      }
    ]
  },
  lib: {
    entry: "./packages/index.ts"
  }
}

function hyphenToCamelCase(str) {
  return str.replace(/-([a-z])/g, function(match, letter) {
    return letter.toUpperCase()
  })
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function toCamelCaseObject(arr) {
  let result = {}
  for (let i = 0; i < arr.length; i++) {
    let key = arr[i]
    let camelCaseKey = hyphenToCamelCase(key)
    let pascalCaseKey = capitalizeFirstLetter(camelCaseKey)
    result[key] = pascalCaseKey
  }
  return result
}

