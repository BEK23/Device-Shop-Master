<script lang="ts" setup>
import { Search } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import CategorySelect from './CategorySelect.vue'
import { useDevicesStore } from '~/store/devices.store'

const searchRef = ref('')

const deviceStore = useDevicesStore()

const { search } = storeToRefs(deviceStore)

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
        <Suspense>
          <CategorySelect />
        </Suspense>
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
