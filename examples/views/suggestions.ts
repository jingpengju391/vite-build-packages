import { CompletionItem } from '@/components/code-xpert/type'
import * as monaco from 'monaco-editor'

export const suggestions: Partial<CompletionItem>[] = [
    {
      label: 'myText',
      kind: monaco.languages.CompletionItemKind.Text,
      detail: 'My custom text',
      documentation: 'This is my custom text',
      insertText: 'myText',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      color: '6c2020'
    },
    {
      label: 'myMethod',
      kind: monaco.languages.CompletionItemKind.Method,
      detail: 'My custom method',
      documentation: 'This is my custom method',
      insertText: 'myMethod()',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      color: '6c2020'
    },
    {
      label: 'myFunction',
      kind: monaco.languages.CompletionItemKind.Function,
      detail: 'My custom function',
      documentation: 'This is my custom function',
      insertText: 'myFunction()',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      color: '6c2020'
    },
    {
      label: 'myConstructor',
      kind: monaco.languages.CompletionItemKind.Constructor,
      detail: 'My custom constructor',
      documentation: 'This is my custom constructor',
      insertText: 'constructor()',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      color: '6c2020'
      
    },
    {
      label: 'myField',
      kind: monaco.languages.CompletionItemKind.Field,
      detail: 'My custom field',
      documentation: 'This is my custom field',
      insertText: 'myField',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      color: '6c2020',
      
    },
    {
      label: 'myVariable',
      kind: monaco.languages.CompletionItemKind.Variable,
      detail: 'My custom variable',
      documentation: 'This is my custom variable',
      insertText: 'myVariable',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      color: '6c2020',
      
    },
    {
      label: 'myClass',
      kind: monaco.languages.CompletionItemKind.Class,
      detail: 'My custom class',
      documentation: 'This is my custom class',
      insertText: 'myClass',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      color: '6c2020',
      
    },
    {
      label: 'myInterface',
      kind: monaco.languages.CompletionItemKind.Interface,
      detail: 'My custom interface',
      documentation: 'This is my custom interface',
      insertText: 'myInterface',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      color: '6c2020',
      
    },
    {
      label: 'myModule',
      kind: monaco.languages.CompletionItemKind.Module,
      detail: 'My custom module',
      documentation: 'This is my custom module',
      insertText: 'myModule',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      color: '6c2020',
      
    },
    {
      label: 'myProperty',
      kind: monaco.languages.CompletionItemKind.Property,
      detail: 'My custom property',
      documentation: 'This is my custom property',
      insertText: 'myProperty',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      color: '6c2020',
      
    },
    {
      label: 'myEvent',
      kind: monaco.languages.CompletionItemKind.Event,
      detail: 'My custom event',
      documentation: 'This is my custom event',
      insertText: 'myEvent',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      color: '6c2020',
      
    },
    {
      label: 'myOperator',
      kind: monaco.languages.CompletionItemKind.Operator,
      detail: 'My custom operator',
      documentation: 'This is my custom operator',
      insertText: '+',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      color: '6c2020',
      
    },
    {
      label: 'myUnit',
      kind: monaco.languages.CompletionItemKind.Unit,
      detail: 'My custom unit',
      documentation: 'This is my custom unit',
      insertText: 'myUnit',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      color: '6c2020',
      
    },
    {
      label: 'myValue',
      kind: monaco.languages.CompletionItemKind.Value,
      detail: 'My custom value',
      documentation: 'This is my custom value',
      insertText: 'myValue',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      color: '6c2020',
      
    },
    {
      label: 'myConstant',
      kind: monaco.languages.CompletionItemKind.Constant,
      detail: 'My custom constant',
      documentation: 'This is my custom constant',
      insertText: 'MY_CONSTANT',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      color: '6c2020',
      
    },
    {
      label: 'myEnum',
      kind: monaco.languages.CompletionItemKind.Enum,
      detail: 'My custom enum',
      documentation: 'This is my custom enum',
      insertText: 'myEnum',
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      color: '6c2020',
      
    },
    {
        label:'myEnumMember', 
        kind :monaco.languages.CompletionItemKind.EnumMember, 
        detail : "My custom enum member",
        documentation : "This is my custom enum member",
        insertText : "myEnumMember",
        insertTextRules :monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, 
        
     },
     {
        label:'myKeyword', 
        kind :monaco.languages.CompletionItemKind.Keyword, 
        detail : "My custom keyword",
        documentation : "This is my custom keyword",
        insertText : "myKeyword",
        insertTextRules :monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, 
        
     },
     {
        label:'myColor', 
        kind :monaco.languages.CompletionItemKind.Color, 
        detail : "My custom color",
        documentation : "This is my custom color",
        insertText : "ssssss",
        insertTextRules :monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, 
        
     },
     {
        label:'myFile', 
        kind :monaco.languages.CompletionItemKind.File, 
        detail : "My custom file",
        documentation : "This is my custom file",
        insertText : "myfile.txt",
        insertTextRules :monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, 
        
     },
     {
        label:'myCodeIndex', 
        kind :monaco.languages.CompletionItemKind.Reference, 
        detail : "My codeIndex ",
        documentation : "This is my codeIndex ",
        insertText : "myCodeIndex",
        insertTextRules :monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, 
        
     },
     {
        label:'myCustomColor', 
        kind :monaco.languages.CompletionItemKind.Color, 
        detail : "My custom color",
        documentation : "This is my custom color",
        insertText : "#ff0000",
        insertTextRules :monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, 
        
     },
     {
        label:'myFolder', 
        kind :monaco.languages.CompletionItemKind.Folder, 
        detail : "My custom folder",
        documentation : "This is my custom folder",
        insertText : "myFolder",
        insertTextRules :monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, 
        
     },
     {
       label:'myTypeParameter', 
       kind :monaco.languages.CompletionItemKind.TypeParameter, 
       detail : "My custom type parameter",
       documentation : "This is my custom type parameter",
       insertText : "T",
       insertTextRules :monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, 
       
     },
     {
       label:'myLink', 
       kind :monaco.languages.CompletionItemKind.User, 
       detail : "My custom link",
       documentation : "This is my custom link",
       insertText : "myLink",
       insertTextRules :monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, 
       
     },
     {
       label:'mySeries', 
       kind :monaco.languages.CompletionItemKind.Issue, 
       detail : "My custom series",
       documentation : "This is my custom series",
       insertText : "ISSUE-1234",
       insertTextRules :monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, 
       
     },
     {
       label:'mySnippet', 
       kind :monaco.languages.CompletionItemKind.Snippet, 
       detail : "My custom snippet",
       documentation : "This is my custom snippet",
       insertText : "snippet",
       insertTextRules :monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, 
       
     },
     {
       label:'if', 
       kind :monaco.languages.CompletionItemKind.Snippet, 
       detail : "My custom snippet",
       documentation : "This is my custom snippet",
       insertText : "if() {\n\t\n}",
       insertTextRules :monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, 
     }
]
  
export const highlightItem = [
  {
    label: 'aa',
    color: '#e30404'
  },
  {
    label: 'bb',
    color: 'c3e304'
  },
  {
    label: 'cc',
    color: '04e38d'
  }
]


export const hoverProvider = [
  {
    label: 'abc',
    detail: 'this is abc',
    documentation: 'hello, this is abc hhhhhh'
  },
  {
    label: 'thales',
    detail: 'this is thales',
    documentation: 'hello, this is abc thales',
    contents: [
      { value: `<h1>Word:</h1><div>thales</div>`, isTrusted: true, supportHtml: true },
      { value: `<div>Word:</div><div>thales</div>`, isTrusted: true, supportHtml: true },
      { value: `<div>Word:</div><div>thales</div>`, isTrusted: true, supportHtml: true }
    ]
  }
]