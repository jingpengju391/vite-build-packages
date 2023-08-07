/* global __dirname */
import path from 'path'
import fs from 'fs'
import pkgs from '../package.json'
import unPackage from './package/unpackage.json'
import defaultPackage from './package/default-package.json'

export default function pkg(){
  const newPackage = { ...pkgs, ...defaultPackage }
  Object.keys(newPackage).forEach(key => unPackage[key] && delete newPackage[key])
  const packageJsonPath = path.resolve(__dirname, '../dist/package.json')
  fs.writeFileSync(packageJsonPath, JSON.stringify(newPackage, null, 2))
}