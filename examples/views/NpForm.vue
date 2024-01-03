<template>
   <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>完整的功能(开发中...)</span>
        <el-link type="info" href="https://vxetable.cn/#/table/grid/fullEdit" target="_blank">更多信息</el-link>
      </div>
    </template>
    <ul>
      <li>完整功能：服务端排序代理、服务端筛选代理、服务端分页代理、服务端增删改查、服务端导入导出</li>
      <li>对于分页场景下，如果想要保留选中状态，可以通过设置 checkbox-config 的 reserve 属性</li>
      <li>还可以通过 checkMethod 设置个性化列禁止勾选</li>
      <li>由 vxe-grid 代理数据转换，只需要配置好数据源即可；非常简单就可以渲染一个表格，从重复写冗余的代码中解放出来</li>
    </ul>
  </el-card>
  <el-card class="box-card con-box" shadow="hover">
    <json-form :form-items="formItems">
    </json-form>
  </el-card>
</template>
  
<script lang="ts" setup>
import { JsonForm } from '@packages'
import { ElInput } from 'element-plus'
import { FormItem } from '@packages/components/json-form/type.ts'
const formItems: FormItem[] = [
   {
      label: 'AAA',
      rules: [
         { pattern: /^[a-zA-Z]\w{0,63}$/, message: '3333' },
         { validator: keywordsValidator }
      ],
      component: ElInput,
      
   },
   {
      label: 'AAA',
      rules: [
         { pattern: /^[a-zA-Z]\w{0,63}$/, message: '3333' },
         { validator: keywordsValidator }
      ],
      component: ElInput
   }
]

 

const isCppKeywords = (value: string): boolean => {
  const list = [
    'auto', 'bool', 'break', 'case', 'catch', 'char', 'class', 'const',
    'continue', 'default', 'delete', 'do', 'double', 'else', 'enum', 'false',
    'float', 'for', 'friend', 'goto', 'if', 'inline', 'int', 'long',
    'mutable', 'namespace', 'new', 'operator', 'private', 'protected', 'public',
    'return', 'short', 'signed', 'sizeof', 'static', 'struct', 'switch',
    'template', 'this', 'throw', 'true', 'try', 'typedef', 'typeid', 'typename',
    'union', 'unsigned', 'using', 'virtual', 'void', 'volatile', 'while', 'name', 'profile', 'links', 'series', 'variables'
  ]
  return list.indexOf(value) !== -1
}

function keywordsValidator(rule: any, newName: string, callback: any) {
  if (isCppKeywords(newName)) {
    callback(new Error('333'))
  } else {
    callback()
  }
}

</script>
<style scoped lang="scss">
</style>
  