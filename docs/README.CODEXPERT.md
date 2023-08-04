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
> model：这个编辑器的初始模型。可以为 null。
> value：自动创建的模型的初始值。如果不想自动创建模型，则使用 model: null。
> language：自动创建的模型的初始语言。如果不想自动创建模型，则使用 model: null。
> theme：编辑器的初始主题。默认有四种可用主题：'vs'（默认）、'vs-dark'、'hc-black' 和 'hc-light'。可以通过 monaco.editor.defineTheme 创建自定义主题，并通过 monaco.editor.setTheme 切换主题。注意，如果操作系统处于高对比度> 模式下，则可能会覆盖主题，除非将 autoDetectHighContrast 设置为 false。
> autoDetectHighContrast：如果启用，则会在操作系统使用高对比度主题时自动切换到高对比度主题。默认为 true。
> accessibilityHelpUrl：在编辑器中按下 Ctrl+H（Windows 和 Linux）或 Cmd+H（OSX）时打开的 URL。
> ariaContainerElement：用于 ARIA 消息的容器元素。默认为 document.body。
> dimension：编辑器的初始尺寸（避免测量容器）。
> overflowWidgetsDomNode：将溢出小部件放置在外部 DOM 节点中。默认为内部 DOM 节点。
> inDiffEditor：此编辑器在 diff 编辑器中使用。
> ariaLabel：编辑器文本区域（在焦点时）的 ARIA 标签。
> screenReaderAnnounceInlineSuggestion：控制屏幕阅读器是否立即宣布内联建议内容。
> tabIndex：编辑器文本区域的 tabindex 属性。
> rulers：在指定列上渲染垂直线。默认为空数组。
> wordSeparators：在进行单词导航时使用的单词分隔符字符串。默认为 ~!@#$%^&*()-=+[{]}\\|;:'",.<>/?
> selectionClipboard：启用 Linux 主剪贴板。默认为 true。
> lineNumbers：控制行号的渲染方式。如果是函数，则在渲染行号时调用该函数，并返回要呈现的内容。否则，如果是真值，则正常呈现行号（相当于使用恒等函数）。否则，不呈现行号。默认为 on。
> cursorSurroundingLines：控制围绕光标显示的最小可见行数。默认为 0。
> cursorSurroundingLinesStyle：控制何时强制执行 cursorSurroundingLines。默认为“default”，当使用鼠标更改光标位置时，不强制执行 cursorSurroundingLines。
> renderFinalNewline：当文件以换行符结束时，呈现最后一行编号。Windows 和 macOS 默认为 'on'，Linux 默认为 'dimmed'。
> unusualLineTerminators：删除类似 LINE SEPARATOR（LS）、PARAGRAPH SEPARATOR（PS）之类的不寻常行终止符。默认为“prompt”。
> selectOnLineNumbers：单击行号时是否选择相应的行。默认为 true。
> lineNumbersMinChars：控制行号的宽度，通过至少保留用于呈现数字数量的水平空间来实现。默认为 5。
> glyphMargin：启用字形边距的呈现。在 vscode 中默认为 true，在 monaco-editor 中默认为 false。
> lineDecorationsWidth：保留用于呈现行装饰（以像素为单位）的宽度。行装饰位于行号和编辑器内容之间。可以以浮点数后跟 "ch" 的格式传递字符串，例如 1.3ch。默认为 10。
> revealHorizontalRightPadding：在揭示光标时，向光标添加虚拟填充（以像素为单位），将其转换为矩形。这个虚拟填充确保光标在到达视口边缘之前就被揭示出来。默认为 30（像素）。
> roundedSelection：用圆角边框呈现编辑器选择。默认为 true。
> extraEditorClassName：要添加到编辑器的类名。
> readOnly：编辑器是否只读。默认为 false。
> readOnlyMessage：当编辑器只读时显示的消息。
> domReadOnly：输入时用于输入的 textarea 是否使用 DOM 的 readonly 属性。默认为 false。
> linkedEditing：启用联动编辑。默认为 false。
> renameOnType：已弃用，请使用 linkedEditing 代替。
> renderValidationDecorations：控制是否呈现验证装饰。默认为“editable”。
> scrollbar：控制滚动条的行为和呈现方式。
> stickyScroll：控制粘性滚动选项的行为。
> minimap：控制缩略图的行为和呈现方式。
> find：控制查找小部件的行为。
> fixedOverflowWidgets：将溢出小部件显示为“fixed”。默认为 false。
> overviewRulerLanes：概览标尺应呈现的垂直轨道数。默认为 3。
> overviewRulerBorder：是否应绘制概览标尺周围的边框。默认为 true。
> cursorBlinking：控制光标动画样式，可能值有 'blink'、'smooth'、'phase'、'expand' 和 'solid
> automaticLayout：如果启用，则编辑器将自动调整其大小以适应其容器。默认为 false。如果启用，则可以通过 monaco.editor.layout() 方法来强制重新布局编辑器
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