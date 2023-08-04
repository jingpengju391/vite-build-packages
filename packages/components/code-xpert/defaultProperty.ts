export const defaultProperty = {
    /**
     * The initial value of the auto created model in the editor.
     * To not automatically create a model, use `model: null`.
     */
    value: "",
    /**
     * The initial language of the auto created model in the editor.
     * To not automatically create a model, use `model: null`.
     */
    language: 'cpp',
    /**
     * Enable quick suggestions (shadow suggestions)
     * Defaults to true.
     */
    quickSuggestions: true,
    /**
     * prevent default for browser
     * Defaults to true.
     */
    preventDefault: true,
    /**
     * Enable that the editor will install a ResizeObserver to check if its container dom node size has changed.
     * Defaults to false.
     */
    automaticLayout: true
}

export const defaultTriggerCharacters: string[] = ['.', '->', '::']
