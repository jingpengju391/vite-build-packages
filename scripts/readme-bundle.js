/* eslint-disable no-undef */
import fs from 'fs-extra'
export default function red(){
    fs.copySync('README.md', 'dist/README.md')
}
