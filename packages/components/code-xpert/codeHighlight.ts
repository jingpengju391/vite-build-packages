/* eslint-disable */
import { monacos } from "."
import * as monaco from 'monaco-editor'
import { CompletionItem, HighlightItem, IStandaloneEditorConstructionOptions } from "./type"

export function setHighlight(properties: IStandaloneEditorConstructionOptions, completionItems: Partial<CompletionItem>[] = [], highlightItem: HighlightItem[] = [], keywords?: string[]) {
    const { cases, keyword } = getMonarchTokens([...completionItems, ...highlightItem])
    monacos.languages.setMonarchTokensProvider(properties.language!, {
        // Difficulty: "Moderate"
        // This is the JavaScript tokenizer that is actually used to highlight
        // all code in the syntax definition editor and the documentation!
        //
        // This definition takes special care to highlight regular
        // expressions correctly, which is convenient when writing
        // syntax highlighter specifications.
        ignoreCase: true,
        // Set defaultToken to invalid to see what you do not tokenize yet
        defaultToken: 'invalid',

        keywords: keywords?.length ? keywords : [
            'auto', 'bool', 'break', 'case', 'catch', 'char', 'class', 'const',
            'continue', 'default', 'delete', 'do', 'double', 'else', 'enum', 'false',
            'float', 'for', 'friend', 'goto', 'if', 'inline', 'int', 'long',
            'mutable', 'namespace', 'new', 'operator', 'private', 'protected', 'public',
            'return', 'short', 'signed', 'sizeof', 'static', 'struct', 'switch',
            'template', 'this', 'throw', 'true', 'try', 'typedef', 'typeid', 'typename',
            'union', 'unsigned', 'using', 'virtual', 'void', 'volatile', 'while', 'name', 'profile', 'links', 'series', 'variables'
        ],

        ...keyword,

        typeKeywords: [
            'any', 'boolean', 'number', 'object', 'string', 'undefined'
        ],

        operators: [
            '<=', '>=', '==', '!=', '===', '!==', '=>', '+', '-', '**',
            '*', '/', '%', '++', '--', '<<', '</', '>>', '>>>', '&',
            '|', '^', '!', '~', '&&', '||', '?', ':', '=', '+=', '-=',
            '*=', '**=', '/=', '%=', '<<=', '>>=', '>>>=', '&=', '|=',
            '^=', '@',
        ],

        // we include these common regular expressions
        symbols: /[=><!~?:&|+\-*\/\^%]+/,
        escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
        digits: /\d+(_+\d+)*/,
        octaldigits: /[0-7]+(_+[0-7]+)*/,
        binarydigits: /[0-1]+(_+[0-1]+)*/,
        hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,

        regexpctl: /[(){}\[\]\$\^|\-*+?\.]/,
        regexpesc: /\\(?:[bBdDfnrstvwWn0\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,
        // The main tokenizer for our languages
        tokenizer: {
            root: [
                [/[{}]/, 'delimiter.bracket'],
                { include: 'common' }
            ],

            common: [
                // identifiers and keywords
                [/[a-z_$][\w$]*/, {
                    cases: {
                        '@typeKeywords': 'keyword',
                        '@keywords': 'keyword',
                        ...cases,
                        '@default': 'identifier'
                        
                    }
                }],
                [/[A-Z][\w\$]*/, 'type.identifier'],  // to show class names nicely
                // [/[A-Z][\w\$]*/, 'identifier'],

                // whitespace
                { include: '@whitespace' },

                // regular expression: ensure it is terminated before beginning (otherwise it is an opeator)
                [/\/(?=([^\\\/]|\\.)+\/([gimsuy]*)(\s*)(\.|;|\/|,|\)|\]|\}|$))/, { token: 'regexp', bracket: '@open', next: '@regexp' }],

                // delimiters and operators
                [/[()\[\]]/, '@brackets'],
                [/[<>](?!@symbols)/, '@brackets'],
                [/@symbols/, {
                    cases: {
                        '@operators': 'delimiter',
                        '@default': ''
                    }
                }],

                // numbers
                [/(@digits)[eE]([\-+]?(@digits))?/, 'number.float'],
                [/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, 'number.float'],
                [/0[xX](@hexdigits)/, 'number.hex'],
                [/0[oO]?(@octaldigits)/, 'number.octal'],
                [/0[bB](@binarydigits)/, 'number.binary'],
                [/(@digits)/, 'number'],

                // delimiter: after number because of .\d floats
                [/[;,.]/, 'delimiter'],

                // strings
                [/"([^"\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
                [/'([^'\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
                [/"/, 'string', '@string_double'],
                [/'/, 'string', '@string_single'],
                [/`/, 'string', '@string_backtick'],
            ],

            whitespace: [
                [/[ \t\r\n]+/, ''],
                [/\/\*\*(?!\/)/, 'comment.doc', '@jsdoc'],
                [/\/\*/, 'comment', '@comment'],
                [/\/\/.*$/, 'comment'],
            ],

            comment: [
                [/[^\/*]+/, 'comment'],
                [/\*\//, 'comment', '@pop'],
                [/[\/*]/, 'comment']
            ],

            jsdoc: [
                [/[^\/*]+/, 'comment.doc'],
                [/\*\//, 'comment.doc', '@pop'],
                [/[\/*]/, 'comment.doc']
            ],

            // We match regular expression quite precisely
            regexp: [
                [/(\{)(\d+(?:,\d*)?)(\})/, ['regexp.escape.control', 'regexp.escape.control', 'regexp.escape.control']],
                [/(\[)(\^?)(?=(?:[^\]\\\/]|\\.)+)/, ['regexp.escape.control', { token: 'regexp.escape.control', next: '@regexrange' }]],
                [/(\()(\?:|\?=|\?!)/, ['regexp.escape.control', 'regexp.escape.control']],
                [/[()]/, 'regexp.escape.control'],
                [/@regexpctl/, 'regexp.escape.control'],
                [/[^\\\/]/, 'regexp'],
                [/@regexpesc/, 'regexp.escape'],
                [/\\\./, 'regexp.invalid'],
                [/(\/)([gimsuy]*)/, [{ token: 'regexp', bracket: '@close', next: '@pop' }, 'keyword.other']],
            ],

            regexrange: [
                [/-/, 'regexp.escape.control'],
                [/\^/, 'regexp.invalid'],
                [/@regexpesc/, 'regexp.escape'],
                [/[^\]]/, 'regexp'],
                [/\]/, { token: 'regexp.escape.control', next: '@pop', bracket: '@close' }],
            ],

            string_double: [
                [/[^\\"]+/, 'string'],
                [/@escapes/, 'string.escape'],
                [/\\./, 'string.escape.invalid'],
                [/"/, 'string', '@pop']
            ],

            string_single: [
                [/[^\\']+/, 'string'],
                [/@escapes/, 'string.escape'],
                [/\\./, 'string.escape.invalid'],
                [/'/, 'string', '@pop']
            ],

            string_backtick: [
                [/\$\{/, { token: 'delimiter.bracket', next: '@bracketCounting' }],
                [/[^\\`$]+/, 'string'],
                [/@escapes/, 'string.escape'],
                [/\\./, 'string.escape.invalid'],
                [/`/, 'string', '@pop']
            ],

            bracketCounting: [
                [/\{/, 'delimiter.bracket', '@bracketCounting'],
                [/\}/, 'delimiter.bracket', '@pop'],
                { include: 'common' }
            ],
        },
    })
}

export function setTheme(properties: IStandaloneEditorConstructionOptions, completionItems: Partial<CompletionItem>[] = [], highlightItem: HighlightItem[] = [], theme: Partial<monaco.editor.IStandaloneThemeData> = {}) {
    const rules = getThemeTokens([...completionItems, ...highlightItem])
    monacos.editor.defineTheme(`${properties.language!}Theme`, {
        base: 'vs',
        inherit: true,
        colors: {
            'editor.background': '#ffffff',
            'editor.selectionHighlightBackground': '#66b1ff',
            'editor.inactiveSelectionBackground': '#66b1ff'
        },
        ...theme,
        rules
    })
    monacos.editor.setTheme(`${properties.language!}Theme`)
}

function getCompletionItemsWithProperty(completionItems: Partial<CompletionItem>[]): Partial<CompletionItem>[] {
    return completionItems
    .filter(completionItem => completionItem.color && completionItem.label)
}

function getMonarchTokens(completionItems: Partial<CompletionItem>[]): any {
    const cases: any = {}
    const keyword: any = {}
    const completions = getCompletionItemsWithProperty(completionItems)
    completions.forEach(completion => {
        cases[`@${completion.label}`] = completion.label
        keyword[completion.label as string] = [completion.label]
    })

    return {
        cases,
        keyword
    }
}


function getThemeTokens(completionItems: Partial<CompletionItem>[]): any[] {
    return getCompletionItemsWithProperty(completionItems).map(completionItem => {
            return {
                token: completionItem.label,
                foreground: completionItem.color
            }
    })
}