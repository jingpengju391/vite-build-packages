<template>
  <div class="editor" ref="editorRef"></div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
// @ts-ignore
import * as monaco from 'monaco-editor'
// @ts-ignore
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'

// @ts-ignore
self.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    // eslint-disable-next-line new-cap
    return new editorWorker()
  }
}

const editorRef = ref<HTMLElement|null>(null)

let editor: monaco.editor.IStandaloneCodeEditor|undefined = undefined

onMounted(() => {
  editor = monaco.editor.create(editorRef.value as HTMLElement, {
    value: 'sssssss',
    readOnly: false,
    language: 'cpp',
    minimap: { enabled: false },
    automaticLayout: true,
    renderLineHighlight: 'none',
    wordWrap: 'on',
    wrappingIndent: 'same',
    folding: true,
    scrollBeyondLastLine: true,
    overviewRulerLanes: 0,
    overviewRulerBorder: false,
    theme: 'mytheme'
  })


  editor.addAction({
    id: 'nova-formula-save-shortcut',
    label: 'Save',
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
    precondition: undefined,
    keybindingContext: undefined,
    run: () => {
      console.log(565656565)
    }
  })
})
</script>
<style lang="scss" scoped>
.editor {
  width: 100%;
  height: 50vh;
}
</style>
