<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { MoonIcon, SunIcon } from 'lucide-vue-next'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <el-container>
    <el-header>
      <div class="logo">
        LOGO
      </div>
      <div class="right-section">
        <div class="theme-toggle" @click="toggleDark()">
          <MoonIcon v-if="isDark" :size="20" />
          <SunIcon v-else :size="20" />
        </div>
        <a
          href="https://github.com/BEK23/Device-Shop-Master" target="_blank"
        >
          <el-avatar
            :size="24"
            src="https://cdn.worldvectorlogo.com/logos/github-icon-2.svg"
            alt="Github"
          />
        </a>
      </div>
    </el-header>
    <el-main>
      <el-scrollbar style="height: 100%">
        <div class="wrapper">
          <router-view />
        </div>
      </el-scrollbar>
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
  gap: 10px;
}

.right-section > * {
  margin-left: 10px;
}

.theme-toggle {
  cursor: pointer;
  margin-top: 2px;
}

.el-main {
  padding: 0;
  flex-grow: 1;
}

.el-scrollbar {
  padding: 0 30px;
  box-sizing: border-box
}

.wrapper{
  padding: 20px 0;
}
</style>

<style>
.el-card {
  margin-bottom: 20px!important;
  border-radius: 10px!important;
  --el-card-border-color: transparent
}

.el-input__wrapper, .el-select__wrapper {
  padding: 4px 12px!important;
  box-sizing: content-box!important;
}

.el-input__wrapper, .el-select__wrapper, .el-popper, .el-popover.el-popper, .el-button, .el-textarea__inner, .el-upload-dragger, .el-dialog  {
  --el-border-radius-base: 10px;
  --el-input-border-radius: 10px;
  --el-border-radius-small: 10px;
  --el-popover-border-radius: 10px;
  border-radius: 10px
}

.el-input-number__decrease, .el-input-number__increase {
  --el-border-radius-base: 10px
}

.el-date-editor.el-input{
  height: 40px!important;
}

.el-checkbox__inner {
  --el-checkbox-border-radius: 4px
}

.el-upload-dragger {
  --el-upload-dragger-padding-horizontal: 20px;
}

.el-drawer__header {
  margin-bottom: 0!important;
}

.el-drawer__body {
  --el-drawer-padding-primary: 0
}
</style>
