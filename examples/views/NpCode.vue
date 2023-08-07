<template>
    <div class="code-editor-box">
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
        <code-xpert ref="codeXpertRef" :suggestions="suggestions" :triggerCharacters="['->','&&','@@','::']" :highlightItem="highlightItem" :hoverProvider="hoverProvider"></code-xpert>
      </el-card>
    </div>
</template>
  
<script lang="ts" setup>
import {ref, onMounted} from 'vue'
import { CodeXpert } from '@packages'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import * as monaco from 'monaco-editor'
import { suggestions, highlightItem, hoverProvider } from './suggestions'


declare let self: any
self.MonacoEnvironment = {
  getWorker() {
    return new editorWorker()
  }
}

const codeXpertRef = ref<any>()

onMounted(() => {

  codeXpertRef.value.editor.addAction({
    id: 'save-shortcut',
    label: 'Save',
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
    run: () => {
      console.log('save')
    }
  })
  codeXpertRef.value.editor.onDidChangeModelContent(() => {
  })
})
</script>
<style scoped lang="scss">
.code-editor-box{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

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
  overflow: inherit;
}
.con-box{
  margin-bottom: 0;
  height: 100%;
  width: 100%;
  display: flex;
  &:deep(.el-card__body){
    width: 100%;
  }
}
ul li{
  line-height: 32px;
}
</style>
  