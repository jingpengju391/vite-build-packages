<template>
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>完整的功能</span>
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
    <json-virtual-table :options="options" :events="events"></json-virtual-table>
  </el-card>
</template>

<script lang="ts" setup>
import { JsonVirtualProps } from '@/components/json-virtual-table/type'
import { JsonVirtualTable } from '@packages'
import XEUtils from 'xe-utils'
import { VxeGridListeners } from 'vxe-table'

const options: JsonVirtualProps = {
    border: true,
    showHeaderOverflow: true,
    showOverflow: true,
    keepSource: true,
    id: 'full_edit_1',
    height: 500,
    rowConfig: {
      keyField: 'id',
      isHover: true
    },
    columnConfig: {
      resizable: true
    },
    customConfig: {
      storage: true,
      checkMethod({ column }) {
        if (['nickname', 'role'].includes(column.field)) {
          return false
        }
        return true
      }
    },
    printConfig: {
      columns: [
        { field: 'name' },
        { field: 'email' },
        { field: 'nickname' },
        { field: 'age' },
        { field: 'amount' }
      ]
    },
    sortConfig: {
      trigger: 'cell',
      remote: true
    },
    filterConfig: {
      remote: true
    },
    pagerConfig: {
      enabled: true,
      pageSize: 10,
      pageSizes: [5, 10, 15, 20, 50, 100, 200, 500, 1000]
    },
    formConfig: {
      titleWidth: 100,
      titleAlign: 'right',
      items: [
        { field: 'name', title: 'name', span: 8, titlePrefix: { message: 'app.body.valid.rName', icon: 'vxe-icon-question-circle-fill' }, itemRender: { name: '$input', props: { placeholder: '请输入名称' } } },
        { field: 'email', title: '邮件', span: 8, titlePrefix: { useHTML: true, message: '点击链接：<a class="link" href="https://vxetable.cn" target="_blank">vxe-table官网</a>', icon: 'vxe-icon-question-circle-fill' }, itemRender: { name: '$input', props: { placeholder: '请输入邮件' } } },
        { field: 'nickname', title: '昵称', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入昵称' } } },
        { field: 'role', title: '角色', span: 8, folding: true, itemRender: { name: '$input', props: { placeholder: '请输入角色' } } },
        { field: 'sex', title: '性别', span: 8, folding: true, titleSuffix: { message: '注意，必填信息！', icon: 'vxe-icon-question-circle-fill' }, itemRender: { name: '$select', options: [] } },
        { field: 'age', title: '年龄', span: 8, folding: true, itemRender: { name: '$input', props: { type: 'number', min: 1, max: 120, placeholder: '请输入年龄' } } },
        { span: 24, align: 'center', collapseNode: true, itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: 'search', status: 'primary' } }, { props: { type: 'reset', content: 'reset' } }] } }
      ]
    },
    toolbarConfig: {
      buttons: [
        { code: 'insert_actived', name: '新增' },
        { code: 'delete', name: '直接删除' },
        { code: 'mark_cancel', name: '删除/取消' },
        { code: 'save', name: 'save', status: 'success' }
      ],
      refresh: true, // 显示刷新按钮
      import: true, // 显示导入按钮
      export: true, // 显示导出按钮
      print: true, // 显示打印按钮
      zoom: true, // 显示全屏按钮
      custom: true // 显示自定义列按钮
    },
    columns: [
      { type: 'checkbox', title: 'ID', width: 120 },
      { field: 'name', title: 'Name', sortable: true, titlePrefix: { message: '名称必须填写！' }, editRender: { name: 'input', attrs: { placeholder: '请输入名称' } } },
      {
        field: 'role',
        title: 'Role',
        sortable: true,
        titlePrefix: { useHTML: true, content: '点击链接：<a class="link" href="https://vxetable.cn" target="_blank">vxe-table官网</a>' },
        filters: [
          { label: '前端开发', value: '前端' },
          { label: '后端开发', value: '后端' },
          { label: '测试', value: '测试' },
          { label: '程序员鼓励师', value: '程序员鼓励师' }
        ],
        filterMultiple: false,
        editRender: { name: 'input', attrs: { placeholder: '请输入角色' } }
      },
      { field: 'email', title: 'Email', width: 160, editRender: { name: '$input', props: { placeholder: '请输入邮件' } } },
      { field: 'nickname', title: 'Nickname', editRender: { name: 'input', attrs: { placeholder: '请输入昵称' } } },
      {
        field: 'sex',
        title: 'Sex',
        filters: [
          { label: '男', value: '1' },
          { label: '女', value: '0' }
        ],
        editRender: { name: '$select', options: [], props: { placeholder: '请选择性别' } }
      },
      { field: 'age', title: 'Age', visible: false, sortable: true, editRender: { name: '$input', props: { type: 'number', min: 1, max: 120 } } },
      {
        field: 'amount',
        title: 'Amount',
        formatter({ cellValue }) {
          return cellValue ? `￥${XEUtils.commafy(XEUtils.toNumber(cellValue), { digits: 2 })}` : ''
        },
        editRender: { name: '$input', props: { type: 'float', digits: 2, placeholder: '请输入数值' } }
      },
      {
        field: 'updateDate',
        title: 'Update Date',
        width: 160,
        visible: false,
        sortable: true,
        formatter({ cellValue }) {
          return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:ss:mm')
        }
      },
      {
        field: 'createDate',
        title: 'Create Date',
        width: 160,
        visible: false,
        sortable: true,
        formatter({ cellValue }) {
          return XEUtils.toDateString(cellValue, 'yyyy-MM-dd')
        }
      }
    ],
    checkboxConfig: {
      labelField: 'id',
      reserve: true,
      highlight: true,
      range: true
    },
    editRules: {
      name: [
        { required: true, message: 'app.body.valid.rName' },
        { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
      ],
      email: [
        { required: true, message: '邮件必须填写' }
      ],
      role: [
        { required: true, message: '角色必须填写' }
      ]
    },
    editConfig: {
      trigger: 'click',
      mode: 'row',
      showStatus: true
    }
  }

  const events:VxeGridListeners = {
    cellClick() {
      console.log('数据点击事件')
    }
  }
</script>
<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100%;
  margin-bottom: 20px;
  flex-grow: 1;
}
.con-box{
  margin-bottom: 0;
}
ul li{
  line-height: 32px;
}
</style>