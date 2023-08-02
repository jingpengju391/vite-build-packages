# Code Editor 重封装组件说明

### languages.CompletionItemProvider.triggerCharacters

#### triggerCharacters 是一个字符数组，表示当用户输入其中任意一个字符时触发代码补全。当用户输入这些字符时，编辑器将会调用相应的补全提供者提供补全建议。
#### 下面是一个示例，创建一个包含 triggerCharacters 的 CompletionItemProvider：

```
monaco.languages.registerCompletionItemProvider('javascript', {
  provideCompletionItems: (model, position) => {
    const lineContent = model.getLineContent(position.lineNumber);
    const match = lineContent.match(/(\w+)$/);
    if (match) {
      const word = match[1];
      if (word.length >= 2) {
        return [
          {
            label: `console.log('${word}')`,
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: `console.log('\${1:${word}}');`,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'Log to console',
            documentation: 'Inserts a console.log statement with the selected word',
            triggerCharacters: ['.', '('] // 触发补全的字符
          }
        ];
      }
    }
    return [];
  }
});
```
#### 在上面的示例中，我们注册了一个 CompletionItemProvider 提供代码补全服务。当用户在 JavaScript 文件中输入一个长度大于等于 2 的单词时，我们将会提供一个补全项，它将会在控制台中输出该单词。我们还指定了 triggerCharacters 为 ['.', '(']，表示当用户输入 . 或 ( 时触发代码补全。

### CompletionItem 对象

#### label：补全项的文本标签，也是选中补全项时插入到文档中的文本。
#### kind：补全项的类型，决定了编辑器中使用的图标。
#### tags：补全项的标签，可以对补全项进行修饰，如使用删除线标记弃用的补全项。
#### detail：补全项的详细信息，如类型或符号信息等。
#### documentation：补全项的注释信息，可以是普通字符串或 Markdown 格式的字符串。
#### sortText：用于排序的文本，如果不指定则使用 label 属性。
#### filterText：用于过滤的文本，如果不指定则使用 label 属性。
#### preselect：是否在展示时预选中该补全项。
#### insertText：选中该补全项时插入到文档中的文本或代码片段。
#### insertTextRules：插入文本时应用的规则，如 InsertAsSnippet 表示将 insertText 视为代码片段。
#### range：补全项插入到文档中后所替换的文本范围，如果不指定则使用光标所在位置到单词开头的范围。
#### commitCharacters：用于快速插入补全项并输入其他字符的字符集合。
#### additionalTextEdits：选中该补全项后需要进行的其他文本编辑操作。
#### command：选中该补全项后需要执行的命令。


#### 下面是一个示例，创建一个简单的 CompletionItem 对象：

```
  const myCompletionItem = {
    label: 'myFunction',
    kind: monaco.languages.CompletionItemKind.Function,
    detail: 'My custom function',
    documentation: 'This is my custom function',
    insertText: 'myFunction()',
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range: undefined
  };

```
#### 上述示例中，创建了一个类型为函数（Function）的补全项，标签为 'myFunction'，详细信息为 'My custom function'，注释信息为 'This is my custom function'，选中该补全项后将插入 'myFunction()' 代码片段。