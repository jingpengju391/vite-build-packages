<template>
    <div class="code-editor">
      <el-card class="box-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>完整的功能</span>
            <el-link type="info" href="https://vxetable.cn/#/table/grid/fullEdit" target="_blank">更多信息</el-link>
          </div>
        </template>
        <ul>
        </ul>
      </el-card>
      <code-xpert ref="codeXpertRef" :suggestions="suggestions" :triggerCharacters="['->','&&','@@','::']" :highlightItem="highlightItem" :hoverProvider="hoverProvider"></code-xpert>
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
<style>
.code-editor{
  width: 100%;
  height: 90vh;
}
</style>
  