import { monacos } from "."
import { CompletionItem, IStandaloneEditorConstructionOptions } from "./type"
import * as monaco from 'monaco-editor'
let registerCompletionItem: monaco.IDisposable | undefined

export function registerCompletion(completionItems: Partial<CompletionItem>[], properties: IStandaloneEditorConstructionOptions, triggerCharacters: string[]) {
    registerCompletionItem && registerCompletionItem.dispose()
    registerCompletionItem = monacos.languages.registerCompletionItemProvider(properties.language!, {
        triggerCharacters: splitStrings(triggerCharacters),
        /**
         * Provide completion items for the given position and document.
         */
        // @ts-ignore
        provideCompletionItems: (model, position) => {
            const suggestions = checkSuggestionsByValue(model, position, triggerCharacters) ? completionItems.map(suggestion => {
                return {
                    /**
                     * The label of this completion item. By default
                     * this is also the text that is inserted when selecting
                     * this completion.
                     */
                    label: suggestion.label,
                    /**
                     * The kind of this completion item. Based on the kind
                     * an icon is chosen by the editor.
                     */
                    kind: suggestion.kind,
                    /**
                     * A modifier to the `kind` which affect how the item
                     * is rendered, e.g. Deprecated is rendered with a strikeout
                     */
                    tags: suggestion.tags,
                    /**
                     * A human-readable string with additional information
                     * about this item, like type or symbol information.
                     */
                    detail: suggestion.detail,
                    /**
                     * A human-readable string that represents a doc-comment.
                     */
                    documentation: suggestion.documentation,
                    /**
                     * A string that should be used when comparing this item
                     * with other items. When `falsy` the {@link CompletionItem.label label}
                     * is used.
                     */
                    sortText: suggestion.sortText,
                    /**
                     * A string that should be used when filtering a set of
                     * completion items. When `falsy` the {@link CompletionItem.label label}
                     * is used.
                     */
                    filterText: suggestion.filterText,
                    /**
                     * Select this item when showing. *Note* that only one completion item can be selected and
                     * that the editor decides which item that is. The rule is that the *first* item of those
                     * that match best is selected.
                     */
                    preselect: suggestion.preselect,
                    /**
                     * A string or snippet that should be inserted in a document when selecting
                     * this completion.
                     */
                    insertText: suggestion.insertText,
                    /**
                     * Additional rules (as bitmask) that should be applied when inserting
                     * this completion.
                     */
                    insertTextRules: suggestion.insertTextRules,
                    /**
                     * A range of text that should be replaced by this completion item.
                     *
                     * Defaults to a range from the start of the {@link TextDocument.getWordRangeAtPosition current word} to the
                     * current position.
                     *
                     * *Note:* The range must be a {@link Range.isSingleLine single line} and it must
                     * {@link Range.contains contain} the position at which completion has been {@link CompletionItemProvider.provideCompletionItems requested}.
                     */
                    range: suggestion.range,
                    /**
                     * An optional set of characters that when pressed while this completion is active will accept it first and
                     * then type that character. *Note* that all commit characters should have `length=1` and that superfluous
                     * characters will be ignored.
                     */
                    commitCharacters: suggestion.commitCharacters,
                    /**
                     * An optional array of additional text edits that are applied when
                     * selecting this completion. Edits must not overlap with the main edit
                     * nor with themselves.
                     */
                    additionalTextEdits: suggestion.additionalTextEdits,
                    /**
                     * A command that should be run upon acceptance of this item.
                     */
                    command: suggestion.command,
                }
            }) : []

            return { suggestions }
        }
    })
}

export function splitStrings(strs: string[]): string[] {
    return [...strs.flatMap(str => str.split(''))]
}

export function checkSuggestionsByValue(model: monaco.editor.ITextModel, position: monaco.Position, triggerCharacters: string[]): boolean {
    const word = model.getWordAtPosition(position)?.word
    if(word) return true

    const text = model.getValue()

    const specialChars = text.match(/[^a-zA-Z0-9\s]+$/)

    if(!specialChars) return false

    if(!triggerCharacters.includes(specialChars[0])) return false

    return true
}


       