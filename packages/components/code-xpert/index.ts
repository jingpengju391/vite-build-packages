import { h, defineComponent, ref, HTMLAttributes, onMounted, PropType, onUnmounted } from 'vue'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import './style/editor-style.scss'
import './style/icon-style.css'
import { __assignDefaultProperty } from '@/utils'
import { defaultProperty, defaultTriggerCharacters } from './defaultProperty'
import { registerCompletion } from './registerCompletion'
import { IStandaloneEditorConstructionOptions, CompletionItem, CodeContainer, HighlightItem } from './type'
import { setTheme, setHighlight } from './codeHighlight'
declare let self: any
self.MonacoEnvironment = {
  getWorker() {
    return new editorWorker()
  }
}


export default defineComponent({
  name: CodeContainer.NAMA,
  props: {
    options: Object as PropType<IStandaloneEditorConstructionOptions>,
    suggestions: Array as PropType<Partial<CompletionItem>[]>,
    triggerCharacters: Array as PropType<string[]>,
    highlightItem: Array as PropType<HighlightItem[]>
  },
  setup(props) {
   
    const refEditor = ref<HTMLAttributes|null>(null)
    const editor = ref<monaco.editor.IStandaloneCodeEditor | null>(null)

    const initEditor = () => {
      const properties =  __assignDefaultProperty(defaultProperty, props.options || {})
      const triggerCharacters =  [...new Set([...defaultTriggerCharacters, ...(props.triggerCharacters || [])])]
      setTheme(properties, props.suggestions, props.highlightItem)
      setHighlight(properties, props.suggestions, props.highlightItem)
      editor.value = monaco.editor.create(refEditor.value, properties)
      editor.value.onDidChangeModelContent(() => registerCompletion(props.suggestions || [], properties, triggerCharacters))
    }

    const disposeEditor = () => {
      editor.value && editor.value.dispose()
    }

    onMounted(() => initEditor())
    onUnmounted(() => disposeEditor())
    return {
      refEditor,
      editor,
      initEditor,
      disposeEditor
    }
  },
  render() {
    return h(CodeContainer.HTMLTAG, { class: CodeContainer.CLASSNAME, ref: CodeContainer.REF }, CodeContainer.EMPTYSTRING)
  }
})

export const monacos = monaco