import { h, defineComponent, ref, HTMLAttributes, onMounted } from 'vue'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import './style/editor-style.scss'

declare let self: any
self.MonacoEnvironment = {
  getWorker() {
    return new editorWorker()
  }
}

export default defineComponent({
  name: 'CodeXpert',
  setup() {
    
    const refEditor = ref<HTMLAttributes|null>(null)
    const editor = ref<monaco.editor.IStandaloneCodeEditor | null>(null)

    const initEditor = () => {
      editor.value = monaco.editor.create(refEditor.value, {
        value: '',
        language: 'cpp'
      })
    }

    const disposeEditor = () => {
      editor.value && editor.value.dispose()
    }

    onMounted(() => initEditor())
    // onUnmounted(() => disposeEditor())
    

    return {
      refEditor,
      editor,
      initEditor,
      disposeEditor
    }
  },
  render() {
    return h('div', {
      class: 'np-editor',
      ref: 'refEditor'
    }, '')
  }
})
