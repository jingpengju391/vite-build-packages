/* eslint-disable no-undef */
import path from 'path'
import fs from 'fs'

export default function pkg(){
  const pkg = require('../package.json')
  const unPackage = require('./package/unpackage.json')
  const defaultPackage = require('./package/default-package.json')
  const newPackage = { ...pkg, ...defaultPackage }
  Object.keys(newPackage).forEach(key => unPackage[key] && delete newPackage[key])
  const packageJsonPath = path.resolve(__dirname, '../dist/package.json')
  fs.writeFileSync(packageJsonPath, JSON.stringify(newPackage, null, 2))
}