# Code Editor 重封装组件说明

## 封装说明

> 基础的使用方式与 API 与 [官方版(Monaco Editor)](https://microsoft.github.io/monaco-editor/) 本一致，新增自定义联想提示、自定义语法高亮、自定义详情展示等
>  该 `editor` 由 [@Thales](https://github.com/jingpengju391) 完成封装

## Props

> #### options: IStandaloneEditorConstructionOptions,
>
> #### suggestions: CompletionItem[],
>
> #### triggerCharacters: string[],
>
> #### highlightItem: HighlightItem[],
>
> #### hoverProvider: HoverProvider[]

## IStandaloneEditorConstructionOptions

> 这是一个代码编辑器的配置对象，它包含了一些属性来设置编辑器的初始模型、值、语言和主题。
>
> model 属性用来关联一个文本模型与编辑器。value 属性设置自动创建模型的初始值。language 属性设置自动创建模型的初始语言。
>
> theme 属性设置编辑器的初始主题。可用的主题有 'vs'（默认）、'vs-dark'、'hc-black' 和 'hc-light'。你可以通过 monaco.editor.defineTheme 来创建自定义主题

> ```
> model：与此代码编辑器相关联的初始模型。可以是 ITextModel 类型或 null。
> value：在编辑器中自动创建的模型的初始值。如果不想自动创建模型，请使用 model: null。
> language：在编辑器中自动创建的模型的初始语言。如果不想自动创建模型，请使用 model: null。
> theme：用于呈现的初始主题。当前可用的主题有 'vs'（默认）、'vs-dark'、'hc-black' 和 'hc-light'。你可以通过 monaco.editor.defineTheme 创建自定义主题。要切换主题，请使用 monaco.editor.setTheme。 注意：如果操作系统处于高对比度模式下，主题可能会被覆盖，除非将 autoDetectHighContrast 设置为 false。
> autoDetectHighContrast：如果启用，当操作系统使用高对比度主题时，将自动切换到高对比度主题。默认为 true。
> accessibilityHelpUrl：当用户按下 Ctrl+H（Windows 和 Linux）或 Cmd+H（OSX）时，在编辑器中的辅助功能帮助对话框中打开的 URL。默认为 "https://go.microsoft.com/fwlink/?linkid=852450"。
> ariaContainerElement：用于 ARIA 消息的容器元素。默认为 document.body。
> ```

### CompletionItem 对象

> 下面是一个示例，创建一个简单的 CompletionItem 对象：

> ```JS
> const myCompletionItem = {
>     label: 'myFunction',
>     kind: monaco.languages.CompletionItemKind.Function,
>     detail: 'My custom function',
>     documentation: 'This is my custom function',
>     insertText: 'myFunction()',
>     insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
>     range: undefined
>   };
> ```

> 上述示例中，创建了一个类型为函数（Function）的补全项，标签为 'myFunction'，详细信息为 'My custom function'，注释信息为 'This is my custom function'，选中该补全项后将插入 'myFunction()' 代码片段。

> ```
> label：补全项的文本标签，也是选中补全项时插入到文档中的文本。
> kind：补全项的类型，决定了编辑器中使用的图标。
> tags：补全项的标签，可以对补全项进行修饰，如使用删除线标记弃用的补全项。
> detail：补全项的详细信息，如类型或符号信息等。
> documentation：补全项的注释信息，可以是普通字符串或 Markdown 格式的字符串。
> sortText：用于排序的文本，如果不指定则使用 label 属性。
> filterText：用于过滤的文本，如果不指定则使用 label 属性。
> preselect：是否在展示时预选中该补全项。
> insertText：选中该补全项时插入到文档中的文本或代码片段。
> insertTextRules：插入文本时应用的规则，如 InsertAsSnippet 表示将 insertText 视为代码片段。
> range：补全项插入到文档中后所替换的文本范围，如果不指定则使用光标所在位置到单词开头的范围。
> commitCharacters：用于快速插入补全项并输入其他字符的字符集合。
> additionalTextEdits：选中该补全项后需要进行的其他文本编辑操作。
> command：选中该补全项后需要执行的命令。
> ```

### TriggerCharacters

> triggerCharacters 是一个字符数组，表示当用户输入其中任意一个字符时触发代码补全。当用户输入这些字符时，编辑器将会调用相应的补全提供者提供补全建议。

> ```js
> // 下面是一个示例，创建一个包含 triggerCharacters 的 CompletionItemProvider：
> 
> monaco.languages.registerCompletionItemProvider('javascript', {
>   provideCompletionItems: (model, position) => {
>     const lineContent = model.getLineContent(position.lineNumber);
>     const match = lineContent.match(/(\w+)$/);
>     if (match) {
>       const word = match[1];
>       if (word.length >= 2) {
>         return [
>           {
>             label: `console.log('${word}')`,
>             kind: monaco.languages.CompletionItemKind.Snippet,
>             insertText: `console.log('\${1:${word}}');`,
>             insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
>             detail: 'Log to console',
>             documentation: 'Inserts a console.log statement with the selected word',
>             triggerCharacters: ['.', '('] // 触发补全的字符
>           }
>         ];
>       }
>     }
>     return [];
>   }
> });
> ```

> 在上面的示例中，我们注册了一个 CompletionItemProvider 提供代码补全服务。当用户在 JavaScript 文件中输入一个长度大于等于 2 的单词时，我们将会提供一个补全项，它将会在控制台中输出该单词。我们还指定了 triggerCharacters 为 ['.', '(']，表示当用户输入 . 或 ( 时触发代码补全。

### HighlightItem

> ```
>     label: 高亮的文本标签
>     color: 高亮的颜色
> ```

### HoverProvider

> ```
>  label: hover的文本标签
>  detail: hover的文本详情
>  documentation: hover的文本描述
>  contents: 自定义hover
>     value: 表示 Markdown 格式化的字符串内容。
>      isTrusted: 可选属性，用于指示该字符串是否可以信任。如果设置为 true，则表示该字符串来自可信源，可以在编辑器中显示。如果设置为 false 或未定义，则表示该字符串不可信，编辑器将不会显示它。
>      supportThemeIcons: 可选属性，用于指示该字符串是否支持主题图标。如果设置为 true，则表示该字符串中的图标将根据当前主题进行渲染。如果设置为 false 或未定义，则表示该字符串中的图标将始终使用默认样式。
>      supportHtml: 可选属性，用于指示该字符串是否支持 HTML 标记。如果设置为 true，则表示该字符串中可以包含 HTML 标记。如果设置为 false 或未定义，则表示该字符串中不允许包含 HTML 标记。
>      baseUri: 可选属性，用于指定该字符串中相对链接的基本 URI。如果未指定，则默认为当前页面的 URI。
>      uris: 可选属性，用于指定该字符串中所有链接的 URI。这是一个对象，其中键是链接的 href 属性，值是 URI 组件对象。
>     
>      注：contents 如果设置supportHtml 仅支持标签，不支持属性
> ```

> #### 注：由于是二次封装 monaco editor 你在使用的时候需要将 work导入进来，具体参看下面这段代码，以保证 editor 可以正常的运行
>
> ```js
> import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
> 
> declare let self: any
> self.MonacoEnvironment = {
>     getWorker() {
>        return new editorWorker()
>     }
> }
> ```
>

##### 更新时间

> 该文档最后更新于： 2023-08-04 PM 15:00