<script setup>
import { useQuery } from '@tanstack/vue-query'
import { API } from '~/api/api'
import { getDevicesList } from '~/api/devices'

const { data } = useQuery({
  queryKey: ['devices'],
  queryFn: getDevicesList,
  select: response => response.data.data,
  refetchOnWindowFocus: false,
})
</script>

<template>
  <el-card shadow="never">
    <el-table :data="data" fit>
      <el-table-column prop="visible" label="Visible" width="80" align="center">
        <template #default="{ row }">
          <el-checkbox v-model="row.visible" />
        </template>
      </el-table-column>
      <el-table-column prop="model" label="Model" min-width="400" />

      <el-table-column prop="category" label="Category" width="250" />

      <el-table-column prop="releaseDate" label="Release Date" width="150" />

      <el-table-column prop="recommendedPrice" label="Rec. Price" width="150">
        <template #default="{ row }">
          <span>$ {{ row.recommendedPrice.toFixed(2) }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="createdAt" label="Created At" width="150" align="right" />

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
              <el-button @click="() => console.log('Edit', row.id)">
                <Edit3Icon :size="16" /> Edit
              </el-button>
              <el-button type="danger" @click="() => console.log('Delete', row.id)">
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
