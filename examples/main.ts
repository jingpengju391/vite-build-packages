import { createApp } from 'vue'
import App from './App.vue'
import VXETable from 'vxe-table'
import './assets/css/normalize.css'
import 'vxe-table/lib/style.css'

const app = createApp(App)

app.use(VXETable)

app.mount('#app')