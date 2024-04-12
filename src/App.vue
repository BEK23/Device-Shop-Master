<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import DevicesTable from './pages/devices/DevicesTable.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <el-container>
    <el-header>
      <div class="logo">
        LOGO
        <!-- <img src="./logo.png" alt="Logo"> -->
      </div>
      <div class="right-section">
        <el-icon class="theme-toggle" @click="toggleDark()">
          <Moon v-if="isDark" />
          <Sunny v-else />
        </el-icon>
      </div>
    </el-header>
    <el-main>
      <DevicesTable />
    </el-main>
  </el-container>
</template>

<style scoped>
.el-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
}

.logo img {
  width: 100px;
  height: auto;
}

.right-section {
  display: flex;
  align-items: center;
}

.right-section > * {
  margin-left: 10px;
}

.theme-toggle {
  cursor: pointer;
}

.el-main {
  flex-grow: 1;
}
</style>

<style>
.el-card {
  width: 100%;
  margin-bottom: 20px;
  border-radius: 10px;
  border: none
}

.el-input__wrapper, .el-select__wrapper {
  padding: 4px 12px;
  box-sizing: content-box;
}

.el-input__wrapper, .el-select__wrapper, .el-popper, .el-popover.el-popper  {
  border-radius: 10px;
}
</style>
