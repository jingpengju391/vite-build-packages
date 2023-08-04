import { CodeContainer } from "./type"

export function preventEventBubbling(){
    const codeEditorBox = document.getElementById(CodeContainer.ID)
    if(codeEditorBox){
        codeEditorBox.addEventListener('dragover', (event: Event) => {
            event.stopPropagation()
            event.preventDefault()
        })
        codeEditorBox.addEventListener('drop', (event: Event) => {
            event.stopPropagation()
            event.preventDefault()
        })
    }
}