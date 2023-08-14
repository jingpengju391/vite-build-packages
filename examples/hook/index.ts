import NpTable from '../views/NpTable.vue'
import NpCode from '../views/NpCode.vue'
import NpVisualizer from '../views/NpVisualizer.vue'
import NpForm from '../views/NpForm.vue'
export const registerComponents = [
    {
        name: 'NpVisualizer',
        zh: '打包分析策略',
        component: NpVisualizer
    },
    {
        name: 'NpTable',
        zh: '虚拟表格',
        component: NpTable
    },
    {
        name: 'NpCode',
        zh: '代码编辑器',
        component: NpCode
    },
    {
        name: 'NpForm',
        zh: 'Json 表单',
        component: NpForm
    }
]

