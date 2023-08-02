export const defaultProperty = {
    value: "function hello() {\n\tconsole.log('Hello, world!');\n}",
    language: 'cpp',
    quickSuggestions: true,
    suggest: {
        // 关闭详情箭头
        showIcons: false,
        showInlineDetails: true
    }
}

export const defaultTriggerCharacters: string[] = ['.', '->', '::']
