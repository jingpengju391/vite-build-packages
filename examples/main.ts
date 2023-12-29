import { createApp } from 'vue'
import VXETable from 'vxe-table'
import App from './App.vue'
import 'vxe-table/lib/style.css'
import './assets/css/normalize.css'
const app = createApp(App)
app.use(VXETable)
app.mount('#app')
