<template>
  <el-container class="layout-container-demo" style="height: 100vh"  v-model="isCollapse" :background-color="'#ff000000'">
    <el-aside width="500px">
      <el-scrollbar class="el-scrollbar-menu">
        <el-menu :default-openeds="['1']" :default-active="latestComponentName">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><icon-menu /></el-icon>Nova
            </template>
            <el-menu-item v-for="(component) in registerComponents" :key="component.name" :index="component.name" @click="selectComponent">{{ `${component.name}  ${component.zh}` }}</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="header-box">
        <img src="https://www.deeplightconnect.com/img/feat-01.f335a7ab.png">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
              ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>DEV</el-dropdown-item>
                <el-dropdown-item>PRO</el-dropdown-item>
                <el-dropdown-item @click="turnoff(true)">Eat Me</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Thales</span>
        </div>
      </el-header>
      <el-main>
        <el-scrollbar>
          <component :is="component"></component>
          <Dialog />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Menu as IconMenu, Setting } from '@element-plus/icons-vue'
import { registerComponents } from './hook'
import Dialog from './views/Dialog.vue'
import { turnoff } from './hook/snake'

const isCollapse = ref(true)

const latestComponent = computed(() => registerComponents.at(-1))

const latestComponentName = computed(() => latestComponent.value?.name || '' )

const componentName = ref(latestComponentName.value)

const component = computed(() => 
registerComponents.find(component => component.name === componentName.value)?.component || latestComponent.value!.component)

const selectComponent = (env: any) => {
  componentName.value = env.index
}
</script>

<style lang="scss" scoped>

.layout-container-demo .el-header {
  position: relative;
  color: var(--el-text-color-primary);
  background-color: #f8f8f8;
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background-color: #fff;
}
.layout-container-demo .el-menu {
  width: 280px;
  border-right: none;
  --el-menu-bg-color: transparent;
}
.layout-container-demo .el-main {
  padding: 10px;
  background-color: #f8f8f8;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.header-box{
  display: flex;
  justify-content: space-between;
  img{
    height: 100%;
  }
}
.el-scrollbar-menu{
  display: flex;
  flex-direction: row-reverse;
}
</style>
