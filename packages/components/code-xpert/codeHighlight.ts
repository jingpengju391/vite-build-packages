import { evalRight } from "@/utils"
import { monacos } from "."
import { CompletionItem, HighlightItem, IStandaloneEditorConstructionOptions } from "./type"

export function setHighlight(properties: IStandaloneEditorConstructionOptions, completionItems: Partial<CompletionItem>[] = [], highlightItem: HighlightItem[] = []){
    const monarchTokens = getMonarchTokens([...completionItems, ...highlightItem])

    monacos.languages.setMonarchTokensProvider(properties.language!, {
        ignoreCase: true,
        tokenizer: {
            root: [
                [/\b(if|else|for|while|do|break|continue|switch|case|default|try|catch|finally|throw|return|function)\b/, "keyword"],
                ...monarchTokens
            ]
        }
    })
}


export function setTheme(properties: IStandaloneEditorConstructionOptions, completionItems: Partial<CompletionItem>[] = [], highlightItem: HighlightItem[] = []){
    const themeTokens = getThemeTokens([...completionItems, ...highlightItem])
    monacos.editor.defineTheme(`${properties.language!}Theme`, {
        base: 'vs',
        inherit: true,
        rules: [
            ...themeTokens,
        ],
        colors: {
            'editor.background': '#ffffff'
        }
    })
    monacos.editor.setTheme(`${properties.language!}Theme`)
}

function getCompletionItemsWithProperty(completionItems: Partial<CompletionItem>[]): Partial<CompletionItem>[]{
    return completionItems
    .filter(completionItem => completionItem.color && completionItem.label)
}


function getMonarchTokens(completionItems: Partial<CompletionItem>[]): any[]{
    return getCompletionItemsWithProperty(completionItems).map(completionItem => {
            return [evalRight(`/\\b${completionItem.label}\\b/`), completionItem.label]
    })
}


function getThemeTokens(completionItems: Partial<CompletionItem>[]): any[]{
    return getCompletionItemsWithProperty(completionItems).map(completionItem => {
            return {
                token: completionItem.label,
                foreground: completionItem.color
            }
    })
}