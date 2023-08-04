<p align="center">
  <img width="300px" src="https://www.deeplightconnect.com/img/feat-01.f335a7ab.png">
</p>

<p align="center">Nova-plus - A Vue.js 3 components library</p>

- 💪 Vue 3 Composition API
- 🔥 Written in TypeScript

## Getting Started

Alright, for you to get started if you are looking for making Nova Plus better you should keep reading.
For developers that uses Nova Plus to develop your website you should go ahead visit [Getting Started](https://github.com/jingpengju391/vite-build-packages).
You may need to read the source code here.

## Installation

#### Using npm:

```js
$ npm install -g npm
$ npm i --save nova-plus@latest
```

Of course，you can install nova-plus by other package manager(yarn/pnpm...). just like it.

#### In components:

```vue
<template>
  <json-virtual-table :options="options" :events="events"></json-virtual-table>
</template>

<script lang="ts" setup>
import { JsonVirtualTable } from 'nova-plus'
import type { JsonVirtualProps } from 'nova-plus'
const options: JsonVirtualProps = {
  	columns:[
      { field: 'name', title: 'name' },
      { field: 'sex', title: 'sex' },
      { field: 'address', title: 'Address' }
    ],
    data: [
      { id: 100061, name: 'Test1', sex: 'Man', address: 'Shenzhen' },
      { id: 100062, name: 'Test2', sex: 'Man', address: 'Guangzhou' },
      { id: 100063, name: 'Test3', sex: 'Man', address: 'Shanghai' }
    ]
  }
</script>
```

## Components List

#### JsonVirtualTable

- a component ablout virtual table, it's nased on Vxe Table secondary development[ ( more ) ](https://github.com/jingpengju391/vite-build-packages/blob/master/docs/README.TABLE.md).

#### CodeXpert

- a component ablout code editor, it's nased on Monaco Editor secondary development [ ( more )](https://github.com/jingpengju391/vite-build-packages/blob/master/docs/README.CODEXPERT.md).

## Browser Support

| ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Last 2✔                                                      | Last 2✔                                                      | Last 2✔                                                      | Last 2✔                                                      | Last 2✔                                                      | 10+ ✔                                                        |

## Contributing

If you have any idea, feel free to open an issue to discuss a new feature, or fork Nova Plus and submit your changes back to me.

## Release Notes

- **Version 1.0.X** First public release

