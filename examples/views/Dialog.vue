<template>
    <el-dialog v-model="dialogVisible" title="Eat me" width="30%" draggable :modal="false" :close-on-click-modal="false">
       <NpGame />
    </el-dialog>
</template>
  
  <script lang="ts" setup>
  import { dialogVisible } from '../hook/snake'
  import NpGame from './NpGame.vue'
  </script>
  