import type { App } from 'vue'
import { CodeEditor, JsonVirtualTable } from './components'

const components = [CodeEditor, JsonVirtualTable]

const install = (app: App): void => {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}

export default {
  install,
  CodeEditor,
  JsonVirtualTable
}

export { CodeEditor, JsonVirtualTable }
