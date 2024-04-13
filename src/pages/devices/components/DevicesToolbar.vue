<script setup>
import { ref } from 'vue'
import { Search } from 'lucide-vue-next'
import { useCategoryStore } from '~/store/category.store'

const search = ref('')
const category = ref('')

const categoryStore = useCategoryStore()
</script>

<template>
  <el-card shadow="never">
    <el-row justify="space-between">
      <el-col :span="4">
        <el-select v-model="category" placeholder="Category" clearable>
          <el-option
            v-for="item in categoryStore.categories"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="10">
        <el-input v-model="search" :prefix-icon="Search" placeholder="Search" clearable />
      </el-col>
    </el-row>
  </el-card>
</template>
