<script lang="ts" setup>
import { Search } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '~/store/category.store'
import { useDevicesStore } from '~/store/devices.store'

const deviceStore = useDevicesStore()
const categoryStore = useCategoryStore()

const { category, search } = storeToRefs(deviceStore)
</script>

<template>
  <el-card shadow="never">
    <el-row justify="space-between">
      <el-col :span="4">
        <el-select v-model="category" placeholder="Category" clearable>
          <el-option
            v-for="item in categoryStore.categories"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          />
        </el-select>
      </el-col>
      <el-col :span="10">
        <el-input v-model="search" :prefix-icon="Search" placeholder="Search" clearable :debounce="1000" />
      </el-col>
    </el-row>
  </el-card>
</template>
