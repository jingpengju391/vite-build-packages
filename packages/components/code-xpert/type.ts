import * as monaco from 'monaco-editor'

export interface IStandaloneEditorConstructionOptions extends monaco.editor.IStandaloneEditorConstructionOptions {
  
}

export interface CompletionItem extends monaco.languages.CompletionItem {
    color?: string
}

export interface HighlightItem {
    label: string
    color: string
}

export enum CodeContainer {
    HTMLTAG = 'div',
    CLASSNAME = 'np-editor',
    REF = 'refEditor',
    NAMA = 'CodeXpert',
    EMPTYSTRING = ''
}