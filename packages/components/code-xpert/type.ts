import * as monaco from 'monaco-editor'

export interface IStandaloneEditorConstructionOptions extends monaco.editor.IStandaloneEditorConstructionOptions {
    preventDefault?: boolean
}

// @ts-ignore
export interface CompletionItem extends monaco.languages.CompletionItem {
    color?: string
    range?: monaco.IRange | monaco.languages.CompletionItemRanges
}

export interface HighlightItem {
    label: string
    color: string
}

export interface HoverProvider {
    label: string
    detail?: string
    documentation?: string
    contents?: monaco.IMarkdownString[]
}

export enum CodeContainer {
    HTMLTAG = 'div',
    CLASSNAME = 'np-editor',
    REF = 'refEditor',
    NAMA = 'CodeXpert',
    EMPTYSTRING = '',
    ID = "code-xpert"
}


export interface CompletionContext {
    word: string | null
    /**
     * How the completion was triggered.
     */
    triggerKind: monaco.languages.CompletionTriggerKind | null
    /**
     * Character that triggered the completion item provider.
     *
     * `undefined` if provider was not triggered by a character.
     */
    triggerCharacter?: string
    triggerLength?: number
}

export interface IconUrlMap {
    [propName: number]: string
}

export interface CodeEditorXpert extends monaco.editor.IStandaloneCodeEditor {
    editor: monaco.editor.IStandaloneCodeEditor
    refEditor: HTMLDivElement| null
    getCompletionContext() : CompletionContext
    getIconUrlMapByEditor() : IconUrlMap
}