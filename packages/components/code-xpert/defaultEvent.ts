import { CompletionContext, IconUrlMap } from "./type"
import * as monaco from 'monaco-editor'
import { evalRight } from "@/utils"

export function preventEventBubbling(codeEditorBox: HTMLDivElement| null) {
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

    let lineContent = model.getLineContent(position.lineNumber)

    let stop = false
    let endPos = position.column - 2

    if (lineContent[endPos] === '.') {
        lineContent = lineContent.slice(0, endPos + 1) + "." + lineContent.slice(endPos + 1)
        endPos++
    }

    const bracket = { num: 0, bracket: '' }
    const regChar = /[a-zA-Z0-9_]/
    const regRightBracket = /[\\)\]\\}]/
    const regLeftBracket = /[\\(\\[\\{]/
    const regTrigger = evalRight(`/[\\${splitStrings(triggerCharacters).join('\\')}]/`)
    const tempWords: any = []

    const tempTriggerCharacters = []
    while(endPos >= 0 && !stop) {
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
                if(tempWords.length) {
                    stop = true
                }else{
                    tempTriggerCharacters.push(char)
                }
            }else{
                if(regRightBracket.test(char)) {
                    if(tempWords.length) {
                        stop = true
                    }else{
                       
                        switch (char) {
                            case ')':
                                bracket.bracket = !bracket.num ? '(' : bracket.bracket
                                break
                            case '}':
                                bracket.bracket = !bracket.num ? '{' : bracket.bracket
                                break
                            case ']':
                                bracket.bracket = !bracket.num ? '[' : bracket.bracket
                                break
                        }

                        if(char === lineContent[position.column - 2 - tempTriggerCharacters.length]) {
                            bracket.num++
                        }
                    }
                }else if(regLeftBracket.test(char)) {
                    if(tempWords.length) {
                        stop = true
                    }else{
                        if(char === bracket.bracket) {
                            bracket.num--
                        }
                    }
                }else if(regChar.test(char)) {
                    !bracket.num && tempWords.push(char)
                }else{
                    stop = !bracket.num
                }
            }
        }
        endPos--
    }
    if(tempWords.length) {
        completion.word = tempWords.reverse().join('')
    }

    if(tempTriggerCharacters.length) {
        completion.triggerCharacter = tempTriggerCharacters[0] === '.' ? '.' : tempTriggerCharacters.reverse().join('')
        completion.triggerLength = tempTriggerCharacters.length
    }
    
    return completion
}

export function splitStrings(strs: string[]): string[] {
    return [...strs.flatMap(str => str.split(''))]
}

export function getIconUrlMap(): IconUrlMap {
    return {
        0: '--icon-url-method',
        1: '--icon-url-function',
        2: '--icon-url-constructor',
        3: '--icon-url-field',
        4: '--icon-url-variable',
        5: '--icon-url-class',
        6: '--icon-url-struct',
        7: '--icon-url-interface',
        8: '--icon-url-module',
        9: '--icon-url-property',
        10: '--icon-url-event',
        11: '--icon-url-operator',
        12: '--icon-url-unit',
        13: '--icon-url-value',
        14: '--icon-url-constant',
        15: '--icon-url-enum',
        16: '--icon-url-enum-member',
        17: '--icon-url-keyword',
        18: '--icon-url-text',
        19: '--icon-url-color',
        20: '--icon-url-file',
        21: '--icon-url-reference',
        22: '--icon-url-customcolor',
        23: '--icon-url-folder',
        24: '--icon-url-parameter',
        25: '--icon-url-account',
        26: '--icon-url-issues',
        27: '--icon-url-snippet'
    }
}