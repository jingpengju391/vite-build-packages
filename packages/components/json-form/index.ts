import { PropType, h, defineComponent } from 'vue'
import { ElForm, ElFormItem, ElInput } from 'element-plus'
import { FormItem, Form } from './type'
import { defaultForm, omitProperty } from './defaultProperty'
import { __assignDefaultProperty, omit } from '@/utils'
import 'element-plus/es/components/form/style/css'
import './defaultStyle.scss'
export default defineComponent({
    name: 'JsonForm',
    props: {
        form: Object as PropType<Form>,
        formItems: Array as PropType<FormItem[]>,
        formData: String
    },
    setup() {
        const aaa = () => {
            console.log(1111)
        }

        return { aaa }
    },
    render() {
        const formProperties = __assignDefaultProperty(defaultForm, this.form || {})
        console.log(formProperties, this.aaa(), 'formProperties')

        const formItems = this.formItems
        return h(ElForm, formProperties, () => formItems?.map(formItem => {
            const component = formItem.component || ElInput
            return h(ElFormItem, {
                ...omit(omitProperty, formItem), 
            }, () => h(component, null, {
                ...this.$slots
            }))
        }))
    }
})

