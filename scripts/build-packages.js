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
    external: ["vue"],
    input: ["packages/index.ts"],
    output: [
      {
        format: "es",
        entryFileNames: "[name].mjs",
        preserveModules: true,
        exports: "named",
        dir: "dist/es",
        globals: {
          vue: "Vue"
        }
      },
      {
        format: "cjs",
        entryFileNames: "[name].js",
        preserveModules: true,
        exports: "named",
        dir: "dist/lib",
        globals: {
          vue: "Vue"
        }
      }
    ]
  },
  lib: {
    entry: "./packages/index.ts"
  }
}