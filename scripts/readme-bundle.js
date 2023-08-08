import fs from 'fs-extra'
export default function red(outputDir){
    fs.copySync('README.md', `${outputDir}/README.md`)
}
