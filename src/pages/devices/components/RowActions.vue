<script setup lang="ts">
import { Edit3Icon, EllipsisVerticalIcon, Trash2Icon } from 'lucide-vue-next'
import { PATH } from '~/constants/path'

defineProps<{ openDialog: (id: number) => void }>()
</script>

<template>
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
          <el-button type="danger" @click="openDialog(row.id)">
            <Trash2Icon :size="16" /> Delete
          </el-button>
        </div>
      </el-popover>
    </template>
  </el-table-column>
</template>

<style scoped>
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
