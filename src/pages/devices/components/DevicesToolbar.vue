<script lang="ts" setup>
import { Search } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useCategoryStore } from '~/store/category.store'
import { useDevicesStore } from '~/store/devices.store'

const searchRef = ref('')

const deviceStore = useDevicesStore()
const categoryStore = useCategoryStore()

const { category, search } = storeToRefs(deviceStore)

const handleSearchInputChange = (function () {
  let timer: ReturnType<typeof setTimeout> | null = null

  return function (value: string) {
    if (timer)
      clearTimeout(timer)

    timer = setTimeout(() => {
      search.value = value
    }, 1000)
  }
})()
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
        <el-input
          v-model="searchRef"
          :prefix-icon="Search"
          placeholder="Search"
          clearable
          @input="handleSearchInputChange"
        />
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped>
.el-card {
  margin-top: 20px;
}
</style>
