<script lang="ts" setup>
import { Edit3Icon, EllipsisVerticalIcon, Trash2Icon } from 'lucide-vue-next'
import { useQueryClient } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { useDevicesStore } from '~/store/devices.store'
import { useCategoryStore } from '~/store/category.store'
import { deleteDevice, getDevicesList } from '~/api/devices.api'
import { PATH } from '~/constants/path'

const store = useDevicesStore()
const categoryStore = useCategoryStore()

const { total, devices, ...meta } = storeToRefs(store)

const queryClient = useQueryClient()

async function handleRemove(id: number) {
  try {
    await deleteDevice(id)
    await queryClient.prefetchQuery({ queryKey: ['devices', meta], queryFn: () => getDevicesList(meta) })
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <el-card shadow="never">
    <el-table :data="store.devices" fit>
      <el-table-column prop="visible" label="Visible" width="80" align="center">
        <template #default="{ row }">
          <el-checkbox v-model="row.visible" />
        </template>
      </el-table-column>
      <el-table-column prop="model" label="Model" min-width="400" />

      <el-table-column prop="category" label="Category" width="250">
        <template #default="{ row }">
          <span>{{ categoryStore.getCategoryLabelById(row.category) }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="releaseDate" label="Release Date" width="150" align="center" />

      <el-table-column prop="recommendedPrice" label="Rec. Price" width="130" align="right">
        <template #default="{ row }">
          <span>$ {{ row.recommendedPrice.toFixed(2) }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="createdAt" label="Created At" width="180" align="right">
        <template #default="{ row }">
          {{ new Date(row.createdAt).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) }}
        </template>
      </el-table-column>

      <el-table-column align="right" width="50">
        <template #default="{ row }">
          <el-popover
            placement="bottom-start"
            trigger="click"
          >
            <template #reference>
              <EllipsisVerticalIcon class="action-trigger" :size="16" />
            </template>
            <div class="action-content">
              <el-button @click="$router.push(PATH.devices.edit.replace(':id', row.id))">
                <Edit3Icon :size="16" /> Edit
              </el-button>
              <el-button type="danger" @click="() => handleRemove(row.id)">
                <Trash2Icon :size="16" /> Delete
              </el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style scoped>
.el-table {
    width: 100%;
    border-radius: 10px;
    border: 1px solid #363637;
}

.action-trigger {
    cursor: pointer;
    padding: 4px;
    outline: none
}

.action-content {
    display: flex;
    flex-direction: column;
}

.action-content > * {
    margin: 0;
    border: none;
    justify-content: start;
}

.action-content > * svg {
    margin-right: 6px;
}
</style>
