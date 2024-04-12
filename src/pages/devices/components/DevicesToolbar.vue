<script setup>
import { ref } from 'vue'
import { Search } from 'lucide-vue-next'

const search = ref('')
const category = ref('')

const categories = [
  { value: 'Category 1', label: 'Category 1' },
  { value: 'Category 2', label: 'Category 2' },
  { value: 'Category 3', label: 'Category 3' },
  { value: 'Category 4', label: 'Category 4' },
  { value: 'Category 5', label: 'Category 5' },
]
</script>

<template>
  <el-card shadow="never">
    <el-row justify="space-between">
      <el-col :span="4">
        <el-select v-model="category" placeholder="Category" clearable>
          <el-option
            v-for="item in categories"
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
