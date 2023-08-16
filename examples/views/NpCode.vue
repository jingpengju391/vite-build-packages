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
          <li>options: IStandaloneEditorConstructionOptions</li>
          <li>uggestions: CompletionItem</li>
          <li>striggerCharacters: string[]</li>
          <li>highlightItem: HighlightItem[]</li>
          <li>hhoverProvider: HoverProvider[]</li>
        </ul>
      </el-card>
      <el-card class="box-card con-box" shadow="hover">
        <code-xpert ref="codeXpertRef" :options="options" :suggestions="suggestions" :triggerCharacters="['->','&&','@@','::']" :highlightItem="highlightItem" :hoverProvider="hoverProvider"></code-xpert>
      </el-card>
    </div>
</template>
  
<script lang="ts" setup>
import {ref, onMounted} from 'vue'
import { CodeXpert } from '@packages'
import { CodeEditorXpert } from '@/components/code-xpert/type'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import * as monaco from 'monaco-editor'
import { suggestions, highlightItem, hoverProvider } from './suggestions'


declare let self: any
self.MonacoEnvironment = {
  getWorker() {
    return new editorWorker()
  }
}

const options = {
  value: [
    "return 555555;\n\n\n\n\n\n\n\n\nreturn 555555;\n\n\n\n\n\n\n\n\nreturn 555555;\n\n\n\n\n\n\n\n\nreturn 555555;\n\n\n\n\n\n\n\n\nreturn 555555;\n\n\n\n\n\n\n\n\n\n",
  ].join('\n'),
}

const codeXpertRef = ref<CodeEditorXpert>()

onMounted(() => {

  codeXpertRef.value!.addAction({
    id: 'save-shortcut',
    label: 'Save',
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
    run: () => {
      console.log('save')
    }
  })
  codeXpertRef.value!.onDidChangeModelContent(() => {
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
  