import { ref } from 'vue'

export const dialogVisible = ref(false)

export function turnoff(visible: boolean){
    dialogVisible.value = visible
}