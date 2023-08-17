import { monacos } from "."
import * as monaco from 'monaco-editor'
import { CompletionItem, HoverProvider, IStandaloneEditorConstructionOptions } from "./type"

let registerHoverProvider: monaco.IDisposable | undefined

export function handleHoverProvider(properties: IStandaloneEditorConstructionOptions, completionItems: Partial<CompletionItem>[] = [], hoverProviders: HoverProvider[] = []) {
    registerHoverProvider && registerHoverProvider.dispose()
    hoverProviders = [...getHoverProvidersWithSuggestions(completionItems), ...hoverProviders]
    registerHoverProvider = monacos.languages.registerHoverProvider(properties.language!, {
        provideHover: (model, position) => {
            const word = model.getWordAtPosition(position)
            if(word?.word) {
                const provider = hoverProviders.find(hoverProvider => hoverProvider.label === word.word)
                const defaultContents = []
                if(provider) {
                    provider.detail && defaultContents.push({ value: `**${provider.detail || word}**` })
                    provider.documentation && defaultContents.push({ value: provider.documentation || provider.label })
                    return {
                        range: new monaco.Range(position.lineNumber, word.startColumn, position.lineNumber, word.endColumn),
                        contents: provider.contents || defaultContents
                    }
                }
            }
        }
    })
}

function getHoverProvidersWithSuggestions(completionItems: Partial<CompletionItem>[] = []): HoverProvider[] {
    return completionItems.map(completionItem => {
        let label ='' as string
        let documentation ='' as string
        if(iString(completionItem.label)) {
            label = completionItem.label as string
        }else{
            label = (completionItem.label as monaco.languages.CompletionItemLabel).label
        }

        if(iString(completionItem.documentation)) {
            documentation = completionItem.documentation as string
        }else{
            documentation = (completionItem.documentation as monaco.IMarkdownString).value
        }
        
        return {
            label: label,
            detail: completionItem.detail,
            documentation
        }
    })
}


function iString(val: any): boolean {
    return typeof val === 'string'
}