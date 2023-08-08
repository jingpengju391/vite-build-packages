/* global require __dirname process */

const { exec } = require('child_process')
const { loadEnv } = require('vite')
const path = require('path')

const mode = process.env.NODE_ENV || 'development'
const {  VITE_APP_BUILD_OUTPUTDIR, VITE_APP_BUILD_IDENTIFY } = loadEnv(mode, process.cwd())
const OUTPUTDIR = `${VITE_APP_BUILD_IDENTIFY}${VITE_APP_BUILD_OUTPUTDIR}`

const packagePath = path.resolve(__dirname, `../${OUTPUTDIR}`)

process.chdir(packagePath)

exec('npm publish --access=public', (err, stdout) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(stdout)
})

process.chdir(path.resolve(__dirname, "../"))