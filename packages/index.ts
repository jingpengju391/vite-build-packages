import type { App, DefineComponent } from 'vue'
import { CodeXpert, JsonVirtualTable, JsonForm } from './components'

interface Components {
  [key: string]: DefineComponent<{}, {}, any>;
}

const components: Components = { CodeXpert, JsonVirtualTable, JsonForm }

const install = (app: App): void => {
  for (const component in components) {
    app.component(components[component].name, components[component])
  }
}

export default {
  install,
  ...components,
}

export * from './components'