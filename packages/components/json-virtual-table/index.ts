import {
  h,
  defineComponent,
  PropType,
  watch,
  getCurrentInstance,
  nextTick,
  computed,
  onBeforeMount,
  ComponentInternalInstance
} from 'vue'
import { VxeGridListeners, VxeGridInstance, VxeTableDefines, Grid } from 'vxe-table'
import Sortable from 'sortablejs'

import { omit, __assignDefaultEvent, __assignDefaultProperty, __overWents } from '@/utils'
import {
  omitProperty,
  defaultProperty,
  defaultHeaderHeight,
  elSortableClass,
  dragRowOption,
  dragColOption
} from './defaultProperty'
import { omitEvent, defaultEvent } from './defaultEvent'

import {
  JsonVirtualContainer,
  JsonVirtualProps,
  ClassNameDelimiter,
  StyleType,
  ClassNameType,
  PositionKey,
  PropertyOrderKeyType,
  FunFix,
  ClassNameVarType
} from './type'

import './defaultStyle.scss'

export default defineComponent({
  name: 'JsonVirtualTable',
  props: {
    options: Object as PropType<JsonVirtualProps>,
    events: Object as PropType<VxeGridListeners>
  },
  setup(props) {
    const { proxy }: ComponentInternalInstance = getCurrentInstance()!

    /**
     * table ref
     */
    const _TR = computed<string>(() => props.options?.ref || defaultProperty.ref!)
    /**
     * table vm
     */
    const table = computed<VxeGridInstance>(() => proxy!.$refs[_TR.value!] as VxeGridInstance)
    /**
     * row drop sort
     */
    let _rowDropSort: Sortable | null = null // eslint-disable-line
    /**
     * column drop sort
     */
    let _columnDropSort: Sortable | null = null // eslint-disable-line

    const updateSelect = (row: any, fieldOrColumn: string | VxeTableDefines.ColumnInfo) => {
      table.value.setSelectCell(row, fieldOrColumn)
    }
    /**
     * clear table select
     */
    const clearSelected = () => {
      table.value.clearSelected()
    }
    /**
     * watch options
     * go to configure initialization information
     */
    watch(
      () => props.options,
      async() => _initTotalFunction(),
      { immediate: true }
    )

    onBeforeMount(() => {
      // romove drop sort
      _rowDropSort = null
      _columnDropSort = null
    })

    /**
     * init total function
     */
    async function _initTotalFunction() {
      await nextTick()
      if (!_TR.value || !proxy!.$refs[_TR.value]) return
      const properties = Object.assign({}, defaultProperty, props.options)
      // init current position
      properties?.currentRow?.key && _setCurrentPosition()
      // init sort table
      const sortable = properties.sortable
      if (sortable) {
        const { enabled, disabledCol, disabledRow } = properties.sortable!
        if (enabled) {
          !disabledRow && _dropRow()
          !disabledCol && _dropCol()
        }
      }
    }

    /**
     * init current position&style
     */
    function _setCurrentPosition() {
      const _ = props.options?.currentRow
      if (!_?.isCurrent) return
      const row = table.value.getRowById(_.key)
      setTimeout(() => {
        table.value.scrollToRow(row)
        table.value.setCurrentRow(row)
      }, 24)
      // proxy.$refs[_TR.value].scrollToColumn(_.key)
      // proxy.$refs[_TR.value].setCurrentColumn(_.key)
    }

    /**
     * init current tabel sort for row
     */
    function _dropRow() {
      if (!props.options || !props.options.sortable) return
      const _el = table.value.$el.querySelector(elSortableClass.row)
      const { rowOption } = props.options.sortable
      const option = (
        rowOption ? Object.assign({}, dragRowOption, rowOption) : dragRowOption
      ) as Sortable.SortableOptions
      _rowDropSort = Sortable.create(_el, option)
    }

    /**
     * init current tabel sort for col
     */
    function _dropCol() {
      if (!props.options || !props.options.sortable) return
      const _el = table.value.$el.querySelector(elSortableClass.col)
      const { colOption } = props.options.sortable
      const option = (
        colOption ? Object.assign({}, dragColOption, colOption) : dragRowOption
      ) as Sortable.SortableOptions
      _columnDropSort = Sortable.create(_el, option)
    }

    return {
      table,
      updateSelect,
      clearSelected
    }
  },
  render() {
    const className = [defaultProperty.className]

    this.options?.className && className.push(this.options.className)

    const properties = __assignDefaultProperty(defaultProperty, this.options || {})

    // calc classname is for more
    // it's maybe replaced by calc classname function in the future
    className.push(
      ...(<PositionKey[]>Object.keys(properties.hideWrapBorder!))
        .filter((key) => properties.hideWrapBorder![key])
        .map((key) => `${ClassNameType.hideWrapBorder}${ClassNameDelimiter.rod}${key}`)
    )

    const findIndexForm = Object.keys(properties).findIndex(
      (key) => key === PropertyOrderKeyType.formConfig
    )

    const findIndexTool = Object.keys(properties).findIndex(
      (key) => key === PropertyOrderKeyType.toolbarConfig
    )

    findIndexForm - findIndexTool > 0 && className.push(ClassNameType.shiftOrderFormTool)

    return h(
      JsonVirtualContainer.HTMLTag,
      {
        class: className.join(ClassNameDelimiter.space),
        style: {
          [ClassNameVarType.BGC]:
            properties.backgroundConfig!.backgroundColor ||
            (properties.backgroundConfig!.transparent ? StyleType.transparent : StyleType.white),
          [ClassNameVarType.HH]: `${properties.headerHeight || defaultHeaderHeight.value}${
            defaultHeaderHeight.unit
          }`
        }
      },
      h(
        Grid,
        {
          ...omit(omitProperty, properties),
          ...omit(omitEvent, __overWents(__assignDefaultEvent(defaultEvent, this.events, FunFix.prefix)))
        },
        {
          ...this.$slots
        }
      )
    )
  }
})

