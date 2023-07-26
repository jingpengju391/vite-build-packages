<template>
  <el-container class="layout-container-demo" style="height: 100vh"  v-model="isCollapse" :background-color="'#ff000000'">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><icon-menu /></el-icon>Nova Plus
            </template>
            <el-menu-item v-for="(component) in registerComponents" :key="component.name" :index="component.name" @click="selectComponent">{{ component.name }}</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
              ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <component :is="component"></component>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Menu as IconMenu, Setting } from '@element-plus/icons-vue'
import { registerComponents } from './hook'

const isCollapse = ref(true)

const componentName = ref(registerComponents[0].name)

const component = computed(() => 
registerComponents.find(component => component.name === componentName.value)?.component || registerComponents[0].component)

const selectComponent = (env: any) => {
  componentName.value = env.index
}
</script>

<style lang="scss" scoped>

.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
  --el-menu-bg-color: transparent;
}
.layout-container-demo .el-main {
  padding: 10px;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
