<script lang="ts" setup>
import type { CheckboxValueType, ElTable } from 'element-plus'
import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import RowActions from './components/RowActions.vue'
import { useDevicesStore } from '~/store/devices.store'
import { useCategoryStore } from '~/store/category.store'
import type { IDeviceResponse } from '~/types/product.interface'
import { updateDevice } from '~/api/devices.api'

const router = useRouter()

const store = useDevicesStore()
const categoryStore = useCategoryStore()

const updateMutation = useMutation({
  mutationFn: updateDevice,
})

function handleVisibleChange(value: CheckboxValueType, data: IDeviceResponse) {
  updateMutation.mutate({ ...data, visible: value as boolean })
}

function handleSortChange({ prop, order }: { prop: string, order: string }) {
  router.push({ query: { sort: prop, ...(order && { order }) } })
}
</script>

<template>
  <el-card shadow="never">
    <el-table
      :data="store.devices"
      fit
      :default-sort="{ prop: $route.query.sort as string, order: $route.query.order as ('ascending' | 'descending') }"
      @sort-change="handleSortChange"
    >
      <el-table-column prop="visible" label="Visible" width="80" align="center">
        <template #default="{ row }">
          <el-checkbox v-model="row.visible" @change="(value) => handleVisibleChange(value, row)" />
        </template>
      </el-table-column>
      <el-table-column prop="model" label="Model" min-width="400" sortable="custom" />

      <el-table-column prop="category" label="Category" width="250" sortable="custom">
        <template #default="{ row }">
          <span>{{ categoryStore.getCategoryLabelById(row.category) }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="releaseDate" label="Release Date" width="150" align="center" sortable="custom" />

      <el-table-column prop="recommendedPrice" label="Rec. Price" width="130" align="right" sortable="custom">
        <template #default="{ row }">
          <span>$ {{ row.recommendedPrice.toFixed(2) }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="createdAt" label="Created At" width="180" align="right" sortable="custom">
        <template #default="{ row }">
          {{ new Date(row.createdAt).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) }}
        </template>
      </el-table-column>

      <RowActions />
    </el-table>
  </el-card>
</template>

<style scoped>
.el-table {
    width: 100%;
    border-radius: 10px;
    border: 1px solid var(--el-table-border-color);
}
</style>
