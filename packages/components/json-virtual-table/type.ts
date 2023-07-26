import Sortable from 'sortablejs'
import type { VxeGridProps, VxeGridInstance } from 'vxe-table'

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }

type R<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U

type BackgroundConfig = R<{ transparent: boolean }, { backgroundColor: string }>

type Position = { [P in 'top' | 'right' | 'bottom' | 'left']?: boolean }

export type PositionKey = keyof Position

export interface JsonVirtualProps extends VxeGridProps {
  className?: string
  ref?: string
  backgroundConfig?: BackgroundConfig
  hideWrapBorder?: Position
  headerHeight?: number
  currentRow?: {
    key: string
    isCurrent: boolean
  }
  currentColumn?: {
    key: string | number
    isCurrent: boolean
  }
  sortable?: {
    enabled: boolean
    disabledRow: boolean
    disabledCol: boolean
    rowOption: Sortable.SortableOptions | null
    colOption: Sortable.SortableOptions | null
  }
}

export interface JsonTableInstance {
  table: VxeGridInstance
  updateSelect: (row: any, fieldOrColumn: string | any) => void
  clearSelected: () => void
}

export type SortableOptionKey = keyof Sortable.SortableOptions

export const NaviNodeIdDelimiter = '-'

export enum JsonVirtualContainer {
  HTMLTag = 'div'
}

export enum ClassNameDelimiter {
  rod = '-',
  space = ' '
}

export enum StyleType {
  transparent = 'transparent',
  white = 'white'
}

export enum ClassNameVarType {
  BGC = '--backgroundColor',
  HH = '--headerHeight'
}

export enum ClassNameType {
  hideWrapBorder = 'hide-wrap-border',
  shiftOrderFormTool = 'shift-order-form-tool'
}

export enum PropertyOrderKeyType {
  formConfig = 'formConfig',
  toolbarConfig = 'toolbarConfig'
}

export enum FunFix {
  prefix = 'on'
}

export enum ObjectType {
  object = 'object'
}
