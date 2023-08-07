import path from 'path'
import sass from 'sass'

export default  function vitePluginSass() {
  return {
    name: 'vite-plugin-sass',
    async transform(code, id) {
      const result = id.replace(/\?.*/, '')
      if (path.extname(result) === ('.scss' || '.sass')) {
        const result = await new Promise((resolve, reject) => {
          sass.render({
            file: id,
            sourceMap: true,
          }, (err, result) => {
            if (err) {
              reject(err)
            } else {
              resolve(result)
            }
          })
        })
        return {
          code: String(result.css),
          map: String(result.map),
        }
      }
    },
  }
}