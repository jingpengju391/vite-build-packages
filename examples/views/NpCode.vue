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
      <code-xpert ref="gggg" :suggestions="suggestions" :triggerCharacters="['->','&&','@@','::']" :highlightItem="highlightItem" :hoverProvider="hoverProvider"></code-xpert>
    </div>
</template>
  
<script lang="ts" setup>
import {ref, onMounted} from 'vue'
import { CodeXpert } from '@packages'

import { suggestions, highlightItem, hoverProvider } from './suggestions'

const gggg = ref<any>()

onMounted(() => {
  gggg.value.editor.onDidChangeModelContent(() => {
    // console.log(333333)
  })
})
</script>
<style>
.code-editor{
  width: 100%;
  height: 90vh;
}
</style>
  