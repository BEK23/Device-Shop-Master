<script lang="ts" setup>
import { useCategoryStore } from '~/store/category.store'
import { useDevicesStore } from '~/store/devices.store'

const categoryStore = useCategoryStore()
const deviceStore = useDevicesStore()

await categoryStore.getAllCategories()
</script>

<template>
  <el-select v-model="deviceStore.category" placeholder="Category" clearable>
    <el-option
      v-for="item in categoryStore.categories"
      :key="item.id"
      :label="item.label"
      :value="item.id"
    />
  </el-select>
</template>
