import * as monaco from 'monaco-editor'

export interface IStandaloneEditorConstructionOptions extends monaco.editor.IStandaloneEditorConstructionOptions {
    preventDefault?: boolean
}

export interface CompletionItem extends monaco.languages.CompletionItem {
    color?: string
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