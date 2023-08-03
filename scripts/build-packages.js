/* eslint-disable no-undef */

const external = Object.keys(require('../package.json').dependencies)

const globals = toCamelCaseObject(external)

export default 
{
  cssTarget: "chrome80",
  minify: "terser",
  terserOptions: {
    compress: {
      keep_infinity: true,
      drop_console: true, 
      drop_debugger: true
    }
  },
  brotliSize: true,
  chunkSizeWarningLimit: 2000,
  rollupOptions: {
    external,
    input: ["packages/index.ts"],
    output: [
      {
        format: "es",
        entryFileNames: "[name].mjs",
        preserveModules: true,
        exports: "named",
        dir: "dist/es",
        globals,
        assetFileNames: 'assets/[name].[ext]',
      },
      {
        format: "cjs",
        entryFileNames: "[name].js",
        preserveModules: true,
        exports: "named",
        dir: "dist/lib",
        globals,
        assetFileNames: 'assets/[name].[ext]',
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

