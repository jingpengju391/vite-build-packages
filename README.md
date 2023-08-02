<p align="center">
  <img width="300px" src="https://www.deeplightconnect.com/img/feat-01.f335a7ab.png">
</p>

<p align="center">Nova-plus - A Vue.js 3 components library</p>

- 💪 Vue 3 Composition API
- 🔥 Written in TypeScript

## Getting Started

Alright, for you to get started if you are looking for making Nova Plus better you should keep reading.
For developers that uses Nova Plus to develop your website you should go ahead visit [Getting Started](https://github.com/jingpengju391/vite-build-packages).

- 中国大陆[加速镜像站点](https://github.com/jingpengju391/vite-build-packages)


## Code Xpert

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
#### color: 补全项的颜色标签
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


### HighlightItem 对象

#### label：补全项的文本标签，也是选中补全项时插入到文档中的文本。
#### color: 补全项的颜色标签


### HoverProvider 对象


#### label: 字符串内容
#### detail: hover 详情
#### documentation: hover 描述
#### contents: 自定义hover描述

- ##### value: 表示 Markdown 格式化的字符串内容。
- ##### isTrusted: 可选属性，用于指示该字符串是否可以信任。如果设置为 true，则表示该字符串来自可信源，可以在编辑器中显示。如果设置为 false 或未定义，则表示该字符串不可信，编辑器将不会显示它。
- ##### supportThemeIcons: 可选属性，用于指示该字符串是否支持主题图标。如果设置为 true，则表示该字符串中的图标将根据当前主题进行渲染。如果设置为 false 或未定义，则表示该字符串中的图标将始终使用默认样式。
- ##### supportHtml: 可选属性，用于指示该字符串是否支持 HTML 标记。如果设置为 true，则表示该字符串中可以包含 HTML 标记。如果设置为 false 或未定义，则表示该字符串中不允许包含 HTML 标记。
- ##### baseUri: 可选属性，用于指定该字符串中相对链接的基本 URI。如果未指定，则默认为当前页面的 URI。
- ##### uris: 可选属性，用于指定该字符串中所有链接的 URI。这是一个对象，其中键是链接的 href 属性，值是 URI 组件对象。
- ##### 注：contents 如果设置supportHtml 仅支持标签，不支持属性

## Table 重封装组件说明

### 封装说明

> 基础的使用方式与 API 与 [官方版(Table)](https://vxetable.cn/#/table/start/install) 本一致，在其基础上，默认样式、默认属性、
> 默认方法, table 拖拽排序，动态当前行，工具栏于 form 顺序等。
>
> 你无需在你是用表格的页面进行分页逻辑处理，仅需向 Table 组件传递绑定 `:options="options" :events="events"` 对象即可

该 `table` 由 [@Thales](https://github.com/jingpengju391) 完成封装

### 例子 1

（基础使用）

```vue
<template>
  <json-virtual-table :options="options" :events="events"></json-virtual-table>
</template>

<script setup lang="ts" name="compoentName">
import JsonVirtualTable from '@/views/components/JsonVirtualTable'

const options = {
  columns: [],
  data: []
}

const events = {
  onScroll({ scrollTop, scrollLeft }) {
    console.log(`滚动事件scrollTop=${scrollTop} scrollLeft=${scrollLeft}`)
  }
}
</script>
```

### 例子 2

（简单的表格，最后一列是各种操作）

```vue
<template>
  <json-virtual-table :options="options" :events="events">
    <template #name_item="{ data }">
      <vxe-input></vxe-input>
    </template>
    <template #nick_name="{ data }">
      <vxe-input></vxe-input>
    </template>
  </json-virtual-table>
</template>

<script setup lang="ts" name="compoentName">
import JsonVirtualTable from '@/views/components/JsonVirtualTable'

const options = {
  className: 'className',
  border: true,
  hideWrapBorder: {
    top: true,
    bottom: true,
    left: true,
    left: true
  },
  toolbarConfig: {
    buttons: [],
    tools: [],
    import: true,
    export: true,
    print: true
  },
  showOverflow: true,
  loading: false,
  height: 400,
  exportConfig: {},
  backgroundConfig: {
    backgroundColor: '#f4f9fd'
  },
  columnConfig: {
    resizable: true
  },
  formConfig: {
    data: {
      name: '',
      nickname: ''
    },
    items: [
      { field: 'name', title: '', slots: { default: 'name_item' } },
      { field: 'nickname', title: '', slots: { default: 'nick_name' } }
    ]
  },
  columns: [],
  data: []
}
// 选择性添加前缀'on'
const events = {
  headerCellClick({ column }) {
    console.log(`表头单元格点击${column.title}`)
  },
  headerCellDblclick({ column }) {
    console.log(`表头单元格双击${column.title}`)
  },
  onHeaderCellMenu({ column }) {
    console.log(`表头右键单元格 ${column.title}`)
  },
  onCellClick({ column }) {
    console.log(`单元格点击${column.title}`)
  }
}
</script>
```

### 内置方法

通过 `this.$refs[refName]/ [refName].value` 调用 JsonVirtualTable vm

`this.$refs[refName].table / [refName].value.table` 调用 table vm

> 注意：
> `refresh` 评估阶段 暂不能用
> 要调用 `refresh(bool)` 需要给表格组件设定 `ref` 值
> `refresh()` 方法可以传一个 `bool` 值，当有传值 或值为 `true` 时，则刷新时会强制刷新到第一页（常用户页面 搜索 按钮进行搜索时，结果从第一页开始分页）

### 内置属性

> 除去 `vxe-table` 自带属性外，还而外提供了一些额外属性属性

| property        | explain                                                   | type            | default  |
| --------------- | --------------------------------------------------------- | --------------- | -------- | ---- |
| tool&form       | show component order according to form and tool order     | object          | null     |
| transparent     | table background color is transparent                     | boolean         | true     |
| backgroundColor | table background color is backgroundColor                 | string          | null     |
| hideWrapBorder  | table broder display( top,right,bottom,left )             | boolean         | false    |
| headerHeight    | table header height                                       | number          | 48       |
| ref             | table ref                                                 | string          | tableRef |
| currentColumn   | scroll to current column by current key (fileId)          | string          | number   | null |
| currentRow      | scroll to current Row by current key (id)                 | string          | number   | null |
| drag            | drag row/col sort(http://www.sortablejs.com/options.html) | SortableOptions | null     |

`tool&form` 属性对象：

```javascript
toolbarConfig on top
options: {
  toolbarConfig: {},
  formConfig: {}
}
formConfig on top
options: {
  formConfig: {},
  toolbarConfig: {}
}
```

### 注意事项

> 你可能需要通过 ref 调用 JsonVirtualTable vm，通过 ref.table 调用 table vm
> 绑定事件函数需采用驼峰方式在前面加上'on'(最新版本可选择添加)
> 你可能需要为了与后端提供的接口返回结果一致而去修改以下代码：
> (需要注意的是，这里的修改是全局性的，意味着整个项目所有使用该 table 组件都需要遵守这个返回结果定义的字段。)
>
> 文档中的结构有可能由于组件 bug 进行修正而改动。实际修改请以当时最新版本为准

修改 默认属性 `@/views/components/JsonVirtualTable/defaultProperty` 第 10 行起
修改 默认事件 `@/views/components/JsonVirtualTable/defaultEvent` 第 1 行起
修改 默认样式 `@/views/components/JsonVirtualTable/defaultStyle` 第 0 行起

> 文档中的结构有拖拽功能开发中
> 开发：拖拽 `@/views/components/JsonVirtualTable/index` 第 41 行起

传入 JSON 例子（ 具体参考 type :

```javascript
  options: {
    column:{
      colId?: VxeColumnPropTypes.ColId
      /**
      * 渲染类型
      */
      type?: VxeColumnPropTypes.Type
      /**
      * 列字段名
      */
      field?: VxeColumnPropTypes.Field
      /**
      * 列标题
      */
      title?: VxeColumnPropTypes.Title
      /**
      * 列宽度
      */
      width?: VxeColumnPropTypes.Width
      /**
      * 列最小宽度，把剩余宽度按比例分配
      */
      minWidth?: VxeColumnPropTypes.MinWidth
      /**
      * 列最大宽度
      */
      maxWidth?: VxeColumnPropTypes.MaxWidth
      /**
      * 是否允许拖动列宽调整大小
      */
      resizable?: VxeColumnPropTypes.Resizable
      /**
      * 将列固定在左侧或者右侧
      */
      fixed?: VxeColumnPropTypes.Fixed
      /**
      * 列对其方式
      */
      align?: VxeColumnPropTypes.Align
      /**
      * 表头对齐方式
      */
      headerAlign?: VxeColumnPropTypes.HeaderAlign
      /**
      * 表尾列的对齐方式
      */
      footerAlign?: VxeColumnPropTypes.FooterAlign
      /**
      * 当内容过长时显示为省略号
      */
      showOverflow?: VxeColumnPropTypes.ShowOverflow
      /**
      * 当表头内容过长时显示为省略号
      */
      showHeaderOverflow?: VxeColumnPropTypes.ShowHeaderOverflow
      /**
      * 当表尾内容过长时显示为省略号
      */
      showFooterOverflow?: VxeColumnPropTypes.ShowFooterOverflow
      /**
      * 给单元格附加 className
      */
      className?: VxeColumnPropTypes.ClassName
      /**
      * 给表头单元格附加 className
      */
      headerClassName?: VxeColumnPropTypes.HeaderClassName
      /**
      * 给表尾单元格附加 className
      */
      footerClassName?: VxeColumnPropTypes.FooterClassName
      /**
      * 格式化显示内容
      */
      formatter?: VxeColumnPropTypes.Formatter
      /**
      * 是否允许排序
      */
      sortable?: VxeColumnPropTypes.Sortable
      /**
      * 自定义排序的属性
      */
      sortBy?: VxeColumnPropTypes.SortBy
      /**
      * 排序的字段类型，比如字符串转数值等
      */
      sortType?: VxeColumnPropTypes.SortType
      /**
      * 配置筛选条件数组
      */
      filters?: VxeColumnPropTypes.Filter[]
      /**
      * 筛选是否允许多选
      */
      filterMultiple?: VxeColumnPropTypes.FilterMultiple
      /**
      * 自定义筛选方法
      */
      filterMethod?: VxeColumnPropTypes.FilterMethod
      /**
      * 筛选模板配置项
      */
      filterRender?: VxeColumnPropTypes.FilterRender
      /**
      * 指定为树节点
      */
      treeNode?: VxeColumnPropTypes.TreeNode
      /**
      * 是否可视
      */
      visible?: VxeColumnPropTypes.Visible
      /**
      * 自定义单元格数据导出方法
      */
      exportMethod?: VxeColumnPropTypes.ExportMethod
      /**
      * 自定义表尾单元格数据导出方法
      */
      footerExportMethod?: VxeColumnPropTypes.FooterExportMethod
      /**
      * 已废弃，被 titlePrefix 替换
      * @deprecated
      */
      titleHelp?: VxeColumnPropTypes.TitleHelp
      /**
      * 标题帮助图标配置项
      */
      titlePrefix?: VxeColumnPropTypes.TitlePrefix
      /**
      * 单元格值类型
      */
      cellType?: VxeColumnPropTypes.CellType
      /**
      * 单元格渲染配置项
      */
      cellRender?: VxeColumnPropTypes.CellRender
      /**
      * 单元格编辑渲染配置项
      */
      editRender?: VxeColumnPropTypes.EditRender
      /**
      * 内容渲染配置项
      */
      contentRender?: VxeColumnPropTypes.ContentRender
      /**
      * 额外的参数
      */
      params?: VxeColumnPropTypes.Params
      ...
    },
    /**
    * 分页参数
    */
    pagerConfig?: VxeGridPropTypes.PagerConfig
    /**
    * 代理参数
    */
    proxyConfig?: VxeGridPropTypes.ProxyConfig
    /**
    * 工具参数
    */
    toolbarConfig?: VxeGridPropTypes.ToolbarConfig
    /**
    * 表单参数
    */
    formConfig?: VxeGridPropTypes.FormConfig
    ...
  }
```

### 更新时间

该文档最后更新于： 2023-02-09 PM 15:00
