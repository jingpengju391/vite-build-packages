import { CodeContainer, CompletionContext } from "./type"
import * as monaco from 'monaco-editor'
import { evalRight } from "@/utils"

export function preventEventBubbling() {
    const codeEditorBox = document.getElementById(CodeContainer.ID)
    if(codeEditorBox) {
        codeEditorBox.addEventListener('dragover', (event: Event) => {
            event.stopPropagation()
            event.preventDefault()
        })
        codeEditorBox.addEventListener('drop', (event: Event) => {
            event.stopPropagation()
            event.preventDefault()
        })
    }
}


export function getCompletionContextByEditor(editor: monaco.editor.IStandaloneCodeEditor, triggerCharacters: string[]): CompletionContext {
    const completion:CompletionContext = {
        word: null,
        triggerKind: null
    }
    const position = editor.getPosition()
    const model = editor.getModel()
    if(!model || !position) return completion

    const lineContent = model.getLineContent(position.lineNumber)
    let stop = false
    let endPos = position.column - 2
    const regChar = /[a-zA-Z0-9_]/
    const regTrigger = evalRight(`/[\\${splitStrings(triggerCharacters).join('\\')}]/`)
    const tempWords = []
    const tempTriggerCharacters = []
    while(endPos > 0 && !stop) {
        const char = lineContent[endPos]
        if(!completion.triggerKind) {
            if(regTrigger.test(char)) {
                completion.triggerKind = monaco.languages.CompletionTriggerKind.TriggerCharacter
                tempTriggerCharacters.push(char)
            }else if(regChar.test(char)) {
                completion.triggerKind = monaco.languages.CompletionTriggerKind.Invoke
                tempWords.push(char)
            }else{
                stop = true
            }
        }else{
            if(regTrigger.test(char)) {
                if(completion.word) {
                    stop = true
                }else{
                    tempTriggerCharacters.push(char)
                }
            }else if(regChar.test(char)) {
                tempWords.push(char)
            }else{
                stop = true
            }
        }
        endPos--
    }

    if(tempWords.length) {
        completion.word = tempWords.reverse().join('')
    }

    if(tempTriggerCharacters.length) {
        completion.triggerCharacter = tempTriggerCharacters.reverse().join('')
        completion.triggerLength = tempTriggerCharacters.length
    }
    
    return completion
}




export function splitStrings(strs: string[]): string[] {
    return [...strs.flatMap(str => str.split(''))]
}