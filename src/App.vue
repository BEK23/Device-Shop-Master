<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { MoonIcon, SunIcon } from 'lucide-vue-next'
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
        <div class="theme-toggle" @click="toggleDark()">
          <MoonIcon v-if="isDark" :size="20" />
          <SunIcon v-else :size="20" />
        </div>
      </div>
    </el-header>
    <el-main>
      <DevicesTable />
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
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
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 24px;
  color: #409eff;

  img {
    width: 100px;
    height: auto;
  }
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
  margin-top: 4px;
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
