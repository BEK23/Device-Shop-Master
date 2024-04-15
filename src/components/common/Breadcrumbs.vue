<script lang="ts" setup>
import { HomeIcon } from 'lucide-vue-next'

defineProps<{
  breadcrumbs: { title: string, to?: string }[]
}>()
</script>

<template>
  <div>
    <div class="header-title">
      {{ breadcrumbs.at(-1)?.title }}
    </div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <el-link to="/" class="home-link">
          <HomeIcon :size="16" />  Home
        </el-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item v-for="(breadcrumb, index) in breadcrumbs" :key="index">
        <el-link v-if="breadcrumb.to" :to="breadcrumb.to">
          {{ breadcrumb.title }}
        </el-link>
        <span v-else>{{ breadcrumb.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped>
.header-title {
  align-items: center;
  position: relative;
  font-size: 24px;
  font-weight: 600;
  transform: translateX(16px);
  margin-bottom: 16px;
}

.header-title::before {
  content: '';
  position: absolute;
  left: -16px;
  height: 100%;
  width: 4px;
  border-radius: 2px;
  background-color: #08559d;
}

.home-link svg {
  margin-right: 4px;
}
</style>
