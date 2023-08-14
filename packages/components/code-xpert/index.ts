import { h, defineComponent, ref, onMounted, PropType, onUnmounted } from 'vue'
import * as monaco from 'monaco-editor'
import './style/editor-style.scss'
import './style/icon-style.css'
import { __assignDefaultProperty } from '@/utils'
import { defaultProperty, defaultTriggerCharacters } from './defaultProperty'
import { registerCompletion } from './registerCompletion'
import { IStandaloneEditorConstructionOptions, CompletionItem, CodeContainer, HighlightItem, HoverProvider } from './type'
import { setTheme, setHighlight } from './codeHighlight'
import { handleHoverProvider } from './hoverProvider'
import { preventEventBubbling } from './defaultEvent'
export default defineComponent({
  name: CodeContainer.NAMA,
  props: {
    options: Object as PropType<IStandaloneEditorConstructionOptions>,
    suggestions: Array as PropType<Partial<CompletionItem>[]>,
    triggerCharacters: Array as PropType<string[]>,
    highlightItem: Array as PropType<HighlightItem[]>,
    hoverProvider: Array as PropType<HoverProvider[]>,
    theme: Object as PropType<Partial<monaco.editor.IStandaloneThemeData>>
  },
  setup(props) {
   
    const refEditor = ref<HTMLDivElement| null>(null)
    let editor:monaco.editor.IStandaloneCodeEditor|null = null

    const initEditor = () =>  {
      if(!refEditor.value) return 
      const properties =  __assignDefaultProperty(defaultProperty, props.options || {})
      const triggerCharacters =  [...new Set([...defaultTriggerCharacters, ...(props.triggerCharacters || [])])]
      properties.preventDefault &&  preventEventBubbling()
      setTheme(properties, props.suggestions, props.highlightItem, props.theme)
      setHighlight(properties, props.suggestions, props.highlightItem)
      handleHoverProvider(properties, props.suggestions, props.hoverProvider)
      editor = monaco.editor.create(refEditor.value, properties)
      editor.onDidChangeModelContent(() => registerCompletion(props.suggestions || [], properties, triggerCharacters))
    }

    const disposeEditor = () => {
      editor && editor.dispose()
    }

    onMounted(() => initEditor())
    onUnmounted(() => disposeEditor())

    /**
     * An event emitted when the content of the current model has changed.
     * @event
     */
    const onDidChangeModelContent = (callback: (e: monaco.editor.IModelContentChangedEvent) => void): void  => {
      editor!.onDidChangeModelContent(callback)
    }
    /**
     * An event emitted when the language of the current model has changed.
     * @event
     */
    const onDidChangeModelLanguage = (callback: (e: monaco.editor.IModelLanguageChangedEvent) => void): void  =>  {
      editor!.onDidChangeModelLanguage(callback)
    }
    /**
     * An event emitted when the language configuration of the current model has changed.
     * @event
     */
    const onDidChangeModelLanguageConfiguration = (callback: (e: monaco.editor.IModelLanguageConfigurationChangedEvent) => void): void  =>  {
      editor!.onDidChangeModelLanguageConfiguration(callback)
    }
    /**
     * An event emitted when the options of the current model has changed.
     * @event
     */
    const onDidChangeModelOptions = (callback: (e: monaco.editor.IModelOptionsChangedEvent) => void): void  =>  {
      editor!.onDidChangeModelOptions(callback)
    }
    /**
     * An event emitted when the configuration of the editor has changed. (e.g. `editor.updateOptions()`)
     * @event
     */
    const onDidChangeConfiguration = (callback: (e: monaco.editor.ConfigurationChangedEvent) => void): void  =>  {
      editor!.onDidChangeConfiguration(callback)

    }
    /**
     * An event emitted when the cursor position has changed.
     * @event
     */
    const onDidChangeCursorPosition = (callback: (e: monaco.editor.ICursorPositionChangedEvent) => void): void  =>  {
      editor!.onDidChangeCursorPosition(callback)

    }
    /**
     * An event emitted when the cursor selection has changed.
     * @event
     */
    const onDidChangeCursorSelection = (callback: (e: monaco.editor.ICursorSelectionChangedEvent) => void): void  =>  {
      editor!.onDidChangeCursorSelection(callback)

    }
    /**
     * An event emitted when the model of this editor has changed (e.g. `editor.setModel()`).
     * @event
     */
    const onDidChangeModel = (callback: (e: monaco.editor.IModelChangedEvent) => void): void  =>  {
      editor!.onDidChangeModel(callback)
    }
    /**
     * An event emitted when the decorations of the current model have changed.
     * @event
     */
    const onDidChangeModelDecorations = (callback: (e: monaco.editor.IModelDecorationsChangedEvent) => void): void  =>  {
      editor!.onDidChangeModelDecorations(callback)
    }
    /**
     * An event emitted when the text inside this editor gained focus (i.e. cursor starts blinking).
     * @event
     */
    const onDidFocusEditorText = (callback: () => void): void  =>  {
      editor!.onDidFocusEditorText(callback)
    }
    /**
     * An event emitted when the text inside this editor lost focus (i.e. cursor stops blinking).
     * @event
     */
    const onDidBlurEditorText = (callback: () => void): void  =>  {
      editor!.onDidBlurEditorText(callback)
    }
    /**
     * An event emitted when the text inside this editor or an editor widget gained focus.
     * @event
     */
    const onDidFocusEditorWidget = (callback: () => void): void  =>  {
      editor!.onDidFocusEditorWidget(callback)
    }
    /**
     * An event emitted when the text inside this editor or an editor widget lost focus.
     * @event
     */
    const onDidBlurEditorWidget = (callback: () => void): void  =>  {
      editor!.onDidBlurEditorWidget(callback)
    }
    /**
     * An event emitted after composition has started.
     */
    const onDidCompositionStart = (callback: () => void): void  =>  {
      editor!.onDidCompositionStart(callback)
    }
    /**
     * An event emitted after composition has ended.
     */
    const onDidCompositionEnd = (callback: () => void): void  =>  {
      editor!.onDidCompositionEnd(callback)
    }
    /**
     * An event emitted when editing failed because the editor is read-only.
     * @event
     */
    const onDidAttemptReadOnlyEdit = (callback: () => void): void  =>  {
      editor!.onDidAttemptReadOnlyEdit(callback)
    }
    /**
     * An event emitted when users paste text in the editor.
     * @event
     */
    const onDidPaste = (callback: (e: monaco.editor.IPasteEvent) => void): void  =>  {
      editor!.onDidPaste(callback)
    }
    /**
     * An event emitted on a "mouseup".
     * @event
     */
    const onMouseUp = (callback: (e: monaco.editor.IEditorMouseEvent) => void): void  =>  {
      editor!.onMouseUp(callback)
    }
    /**
     * An event emitted on a "mousedown".
     * @event
     */
    const onMouseDown = (callback: (e: monaco.editor.IEditorMouseEvent) => void): void  =>  {
      editor!.onMouseDown(callback)
    }
    /**
     * An event emitted on a "contextmenu".
     * @event
     */
    const onContextMenu = (callback: (e: monaco.editor.IEditorMouseEvent) => void): void  =>  {
      editor!.onContextMenu(callback)
    }
    /**
     * An event emitted on a "mousemove".
     * @event
     */
    const onMouseMove = (callback: (e: monaco.editor.IEditorMouseEvent) => void): void  =>  {
      editor!.onMouseMove(callback)
    }
    /**
     * An event emitted on a "mouseleave".
     * @event
     */
    const onMouseLeave = (callback: (e: monaco.editor.IPartialEditorMouseEvent) => void): void  =>  {
      editor!.onMouseLeave(callback)
    }
    /**
     * An event emitted on a "keyup".
     * @event
     */
    const onKeyUp = (callback: (e: monaco.IKeyboardEvent) => void): void  =>  {
      editor!.onKeyUp(callback)
    }
    /**
     * An event emitted on a "keydown".
     * @event
     */
    const onKeyDown = (callback: (e: monaco.IKeyboardEvent) => void): void  =>  {
      editor!.onKeyDown(callback)
    }
    /**
     * An event emitted when the layout of the editor has changed.
     * @event
     */
    const onDidLayoutChange = (callback: (e: monaco.editor.EditorLayoutInfo) => void): void  =>  {
      editor!.onDidLayoutChange(callback)
    }
    /**
     * An event emitted when the content width or content height in the editor has changed.
     * @event
     */
    const onDidContentSizeChange = (callback: (e: monaco.editor.IContentSizeChangedEvent) => void): void  =>  {
      editor!.onDidContentSizeChange(callback)
    }
    /**
     * An event emitted when the scroll in the editor has changed.
     * @event
     */
    const onDidScrollChange = (callback: (e: monaco.IScrollEvent) => void): void  =>  {
      editor!.onDidScrollChange(callback)
    }
    /**
     * An event emitted when hidden areas change in the editor (e.g. due to folding).
     * @event
     */
    const onDidChangeHiddenAreas = (callback: () => void): void  =>  {
      editor!.onDidChangeHiddenAreas(callback)
    }
    /**
     * Saves current view state of the editor in a serializable object.
     */
    const saveViewState = (): monaco.editor.ICodeEditorViewState | null => {
      return null
    }
    /**
     * Restores the view state of the editor from a serializable object generated by `saveViewState`.
     */
    const restoreViewState = (state: monaco.editor.ICodeEditorViewState | null): void => {
      editor!.restoreViewState(state)
    }
    /**
     * Returns true if the text inside this editor or an editor widget has focus.
     */
    const hasWidgetFocus = () => {

    }
    /**
     * Get a contribution of this editor.
     * @id Unique identifier of the contribution.
     * @return The contribution or null if contribution not found.
     */
    const getContribution = <T extends monaco.editor.IEditorContribution>(id: string): T | null => {
      return editor!.getContribution(id)
    }
    /**
     * Type the getModel() of IEditor.
     */
    const getModel = (): monaco.editor.ITextModel | null => {
      return editor && editor.getModel() || null
    }
    /**
     * Sets the current model attached to this editor.
     * If the previous model was created by the editor via the value key in the options
     * literal object, it will be destroyed. Otherwise, if the previous model was set
     * via setModel, or the model key in the options literal object, the previous model
     * will not be destroyed.
     * It is safe to call setModel(null) to simply detach the current model from the editor.
     */
    const setModel = (model: monaco.editor.ITextModel | null): void => {
      editor && editor.setModel(model)
    }
    /**
     * Gets all the editor computed options.
     */
    const getOptions = (): monaco.editor.IComputedEditorOptions => {
      return editor!.getOptions()
    }
    /**
     * Gets a specific editor option.
     */
    const getOption = <T extends monaco.editor.EditorOption>(id: T):  monaco.editor.FindComputedEditorOptionValueById<T> => {
      return editor!.getOption(id)
    }
    /**
     * Returns the editor's configuration (without any validation or defaults).
     */
    const getRawOptions = (): monaco.editor.IEditorOptions => {
      return editor!.getRawOptions()
    }
    /**
     * Get value of the current model attached to this editor.
     * @see {@link ITextModel.getValue}
     */
    const getValue = (options?: { preserveBOM: boolean , lineEnding: string}): string => {
      return editor!.getValue(options)
    }
    /**
     * Set the value of the current model attached to this editor.
     * @see {@link ITextModel.setValue}
     */
    const setValue = (newValue: string): void => {
      editor!.setValue(newValue)
    }
    /**
     * Get the width of the editor's content.
     * This is information that is "erased" when computing `scrollWidth = Math.max(contentWidth, width)`
     */
    const getContentWidth = (): number => {
      return editor!.getContentWidth()
    }
    /**
     * Get the scrollWidth of the editor's viewport.
     */
    const getScrollWidth = (): number => {
      return editor!.getScrollWidth()
    }
    /**
     * Get the scrollLeft of the editor's viewport.
     */
    const getScrollLeft = (): number => {
      return editor!.getScrollLeft()
    }
    /**
     * Get the height of the editor's content.
     * This is information that is "erased" when computing `scrollHeight = Math.max(contentHeight, height)`
     */
    const getContentHeight = (): number => {
      return editor!.getContentHeight()
    }
    /**
     * Get the scrollHeight of the editor's viewport.
     */
    const getScrollHeight = (): number => {
      return editor!.getScrollHeight()
    }
    /**
     * Get the scrollTop of the editor's viewport.
     */
    const getScrollTop = (): number => {
      return editor!.getScrollTop()
    }
    /**
     * Change the scrollLeft of the editor's viewport.
     */
    const setScrollLeft = (newScrollLeft: number, scrollType?: monaco.editor.ScrollType): void => {
      return editor!.setScrollLeft(newScrollLeft, scrollType)
    }
    /**
     * Change the scrollTop of the editor's viewport.
     */
    const setScrollTop = (newScrollTop: number, scrollType?: monaco.editor.ScrollType): void => {
      editor!.setScrollTop(newScrollTop, scrollType)
    }
    /**
     * Change the scroll position of the editor's viewport.
     */
    const setScrollPosition = (position: monaco.editor.INewScrollPosition, scrollType?: monaco.editor.ScrollType): void => {
      editor!.setScrollPosition(position, scrollType)
    }
    /**
     * Check if the editor is currently scrolling towards a different scroll position.
     */
    const hasPendingScrollAnimation = (): boolean => {
      return editor!.hasPendingScrollAnimation()
    }
    /**
     * Get an action that is a contribution to this editor.
     * @id Unique identifier of the contribution.
     * @return The action or null if action not found.
     */
    const getAction = (id: string): monaco.editor.IEditorAction | null => {
      return editor!.getAction(id)
    }
    /**
     * Execute a command on the editor.
     * The edits will land on the undo-redo stack, but no "undo stop" will be pushed.
     * @param source The source of the call.
     * @param command The command to execute
     */
    const executeCommand = (source: string | null | undefined, command: monaco.editor.ICommand): void => {
      editor!.executeCommand(source, command)
    }
    /**
     * Create an "undo stop" in the undo-redo stack.
     */
    const pushUndoStop = (): boolean => {
      return editor!.pushUndoStop()
    }
    /**
     * Remove the "undo stop" in the undo-redo stack.
     */
    const popUndoStop = (): boolean => {
      return editor!.popUndoStop()
    }
    /**
     * Execute edits on the editor.
     * The edits will land on the undo-redo stack, but no "undo stop" will be pushed.
     * @param source The source of the call.
     * @param edits The edits to execute.
     * @param endCursorState Cursor state after the edits were applied.
     */
    const executeEdits = (): boolean => {
      return false
    }
    /**
     * Execute multiple (concomitant) commands on the editor.
     * @param source The source of the call.
     * @param command The commands to execute
     */
    const executeCommands = (source: string | null | undefined, commands: (monaco.editor.ICommand | null)[]): void => {
      return editor!.executeCommands(source, commands)
    }
    /**
     * Get all the decorations on a line (filtering out decorations from other editors).
     */
    const getLineDecorations = (lineNumber: number): monaco.editor.IModelDecoration[] | null => {
      return editor!.getLineDecorations(lineNumber)
    }
    /**
     * Get all the decorations for a range (filtering out decorations from other editors).
     */
    const getDecorationsInRange = (range: monaco.Range): monaco.editor.IModelDecoration[] | null => {
      return editor!.getDecorationsInRange(range)
    }
    /**
     * All decorations added through this call will get the ownerId of this editor.
     * @deprecated Use `createDecorationsCollection`
     * @see createDecorationsCollection
     */
    const deltaDecorations = (oldDecorations: string[], newDecorations: monaco.editor.IModelDeltaDecoration[]): string[] => {
      return editor!.deltaDecorations(oldDecorations, newDecorations)
    }
    /**
     * Remove previously added decorations.
     */
    const removeDecorations = (decorationIds: string[]): void => {
      editor!.removeDecorations(decorationIds)
    }
    /**
     * Get the layout info for the editor.
     */
    const getLayoutInfo = (): monaco.editor.EditorLayoutInfo => {
      return editor!.getLayoutInfo()
    }
    /**
     * Returns the ranges that are currently visible.
     * Does not account for horizontal scrolling.
     */
    const getVisibleRanges = (): monaco.Range[] => {
      return editor!.getVisibleRanges()
    }
    /**
     * Get the vertical position (top offset) for the line's top w.r.t. to the first line.
     */
    const getTopForLineNumber = (lineNumber: number): number => {
      return editor!.getTopForLineNumber(lineNumber)
    }
    /**
     * Get the vertical position (top offset) for the line's bottom w.r.t. to the first line.
     */
    const getBottomForLineNumber = (lineNumber: number): number => {
      return editor!.getBottomForLineNumber(lineNumber)
    }
    /**
     * Get the vertical position (top offset) for the position w.r.t. to the first line.
     */
    const getTopForPosition = (lineNumber: number, column: number): number => {
      return editor!.getTopForPosition(lineNumber, column)
    }
    /**
     * Write the screen reader content to be the current selection
     */
    const writeScreenReaderContent = (reason: string): void => {
      editor!.writeScreenReaderContent(reason)
    }
    /**
     * Returns the editor's container dom node
     */
    const getContainerDomNode = (): HTMLElement => {
      return editor!.getContainerDomNode()
    }
    /**
     * Returns the editor's dom node
     */
    const getDomNode = (): HTMLElement | null => {
      return editor!.getDomNode()
    }
    /**
     * Add a content widget. Widgets must have unique ids, otherwise they will be overwritten.
     */
    const addContentWidget = (widget: monaco.editor.IContentWidget): void => {
      editor!.addContentWidget(widget)
    }
    /**
     * Layout/Reposition a content widget. This is a ping to the editor to call widget.getPosition()
     * and update appropriately.
     */
    const layoutContentWidget = (widget: monaco.editor.IContentWidget): void => {
      editor!.layoutContentWidget(widget)
    }
    /**
     * Remove a content widget.
     */
    const removeContentWidget = (widget: monaco.editor.IContentWidget): void => {
      editor!.removeContentWidget(widget)
    }
    /**
     * Add an overlay widget. Widgets must have unique ids, otherwise they will be overwritten.
     */
    const addOverlayWidget = (widget: monaco.editor.IOverlayWidget): void => {
      editor!.addOverlayWidget(widget)
    }
    /**
     * Layout/Reposition an overlay widget. This is a ping to the editor to call widget.getPosition()
     * and update appropriately.
     */
    const layoutOverlayWidget = (widget: monaco.editor.IOverlayWidget): void => {
      editor!.layoutOverlayWidget(widget)
    }
    /**
     * Remove an overlay widget.
     */
    const removeOverlayWidget = (widget: monaco.editor.IOverlayWidget): void => {
      editor!.removeOverlayWidget(widget)
    }
    /**
     * Add a glyph margin widget. Widgets must have unique ids, otherwise they will be overwritten.
     */
    const addGlyphMarginWidget = (widget: monaco.editor.IGlyphMarginWidget): void => {
      editor!.addGlyphMarginWidget(widget)
    }
    /**
     * Layout/Reposition a glyph margin widget. This is a ping to the editor to call widget.getPosition()
     * and update appropriately.
     */
    const layoutGlyphMarginWidget = (widget: monaco.editor.IGlyphMarginWidget): void => {
      editor!.layoutGlyphMarginWidget(widget)
    }
    /**
     * Remove a glyph margin widget.
     */
    const removeGlyphMarginWidget = (widget: monaco.editor.IGlyphMarginWidget): void => {
      editor!.removeGlyphMarginWidget(widget)
    }
    /**
     * Change the view zones. View zones are lost when a new model is attached to the editor.
     */
    const changeViewZones = (callback: (accessor: monaco.editor.IViewZoneChangeAccessor) => void): void => {
      editor!.changeViewZones(callback)
    }
    /**
     * Get the horizontal position (left offset) for the column w.r.t to the beginning of the line.
     * This method works only if the line `lineNumber` is currently rendered (in the editor's viewport).
     * Use this method with caution.
     */
    const getOffsetForColumn = (lineNumber: number, column: number): number => {
      return editor!.getOffsetForColumn(lineNumber, column)
    }
    /**
     * Force an editor render now.
     */
    const render = (forceRedraw?: boolean): void => {
      editor!.render(forceRedraw)
    }
    /**
     * Get the hit test target at coordinates `clientX` and `clientY`.
     * The coordinates are relative to the top-left of the viewport.
     *
     * @returns Hit test target or null if the coordinates fall outside the editor or the editor has no model.
     */
    const getTargetAtClientPoint = (clientX: number, clientY: number): monaco.editor.IMouseTarget | null => {
      return editor!.getTargetAtClientPoint(clientX, clientY)
    }
    /**
     * Get the visible position for `position`.
     * The result position takes scrolling into account and is relative to the top left corner of the editor.
     * Explanation 1: the results of this method will change for the same `position` if the user scrolls the editor.
     * Explanation 2: the results of this method will not change if the container of the editor gets repositioned.
     * Warning: the results of this method are inaccurate for positions that are outside the current editor viewport.
     */
    const getScrolledVisiblePosition = (position: monaco.IPosition): {
      top: number;
      left: number;
      height: number;
    } | null => {
      return editor!.getScrolledVisiblePosition(position)
    }
    /**
     * Apply the same font settings as the editor to `target`.
     */
    const applyFontInfo = (target: HTMLElement): void => {
      editor!.applyFontInfo(target)
    }
    const setBanner = (bannerDomNode: HTMLElement | null, height: number): void => {
      editor!.setBanner(bannerDomNode, height)
    }

    const updateOptions = (newOptions: monaco.editor.IEditorOptions & monaco.editor.IGlobalEditorOptions): void => {
      editor!.updateOptions(newOptions)
    }

    const addCommand = (keybinding: number, handler: monaco.editor.ICommandHandler, context?: string): string | null => {
      return editor!.addCommand(keybinding, handler, context)
    }

    const createContextKey = <T extends monaco.editor.ContextKeyValue = monaco.editor.ContextKeyValue>(key: string, defaultValue: T): monaco.editor.IContextKey<T> => {
      return editor!.createContextKey(key, defaultValue)
    }

    const addAction = (descriptor: monaco.editor.IActionDescriptor): monaco.IDisposable => {
      return editor!.addAction(descriptor)
    }

    return {
      editor,
      refEditor,
      initEditor,
      disposeEditor,
      onDidChangeModelContent,
      onDidChangeModelLanguage,
      onDidChangeModelLanguageConfiguration,
      onDidChangeModelOptions,
      onDidChangeConfiguration,
      onDidChangeCursorPosition,
      onDidChangeCursorSelection,
      onDidChangeModel,
      onDidChangeModelDecorations,
      onDidFocusEditorText,
      onDidBlurEditorText,
      onDidFocusEditorWidget,
      onDidBlurEditorWidget,
      onDidCompositionStart,
      onDidCompositionEnd,
      onDidAttemptReadOnlyEdit,
      onDidPaste,
      onMouseUp,
      onMouseDown,
      onContextMenu,
      onMouseMove,
      onMouseLeave,
      onKeyUp,
      onKeyDown,
      onDidLayoutChange,
      onDidContentSizeChange,
      onDidScrollChange,
      onDidChangeHiddenAreas,
      saveViewState,
      restoreViewState,
      hasWidgetFocus,
      getContribution,
      getModel,
      setModel,
      getOptions,
      getOption,
      getRawOptions,
      getValue,
      setValue,
      getContentWidth,
      getScrollWidth,
      getScrollLeft,
      getContentHeight,
      getScrollHeight,
      getScrollTop,
      setScrollLeft,
      setScrollTop,
      setScrollPosition,
      hasPendingScrollAnimation,
      getAction,
      executeCommand,
      pushUndoStop,
      popUndoStop,
      executeEdits,
      executeCommands,
      getLineDecorations,
      getDecorationsInRange,
      deltaDecorations,
      removeDecorations,
      getLayoutInfo,
      getVisibleRanges,
      getTopForLineNumber,
      getBottomForLineNumber,
      getTopForPosition,
      writeScreenReaderContent,
      getContainerDomNode,
      getDomNode,
      addContentWidget,
      layoutContentWidget,
      removeContentWidget,
      addOverlayWidget,
      layoutOverlayWidget,
      removeOverlayWidget,
      addGlyphMarginWidget,
      layoutGlyphMarginWidget,
      removeGlyphMarginWidget,
      changeViewZones,
      getOffsetForColumn,
      render,
      getTargetAtClientPoint,
      getScrolledVisiblePosition,
      applyFontInfo,
      setBanner,
      updateOptions,
      addCommand,
      createContextKey,
      addAction
    }
  },
  render() {
    return h(CodeContainer.HTMLTAG, { class: CodeContainer.CLASSNAME, ref: CodeContainer.REF, id: CodeContainer.ID }, CodeContainer.EMPTYSTRING)
  }
})

export const monacos = monaco