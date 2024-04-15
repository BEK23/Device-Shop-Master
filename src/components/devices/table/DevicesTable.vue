<script lang="ts" setup>
import type { CheckboxValueType, ElTable } from 'element-plus'
import { useMutation } from '@tanstack/vue-query'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import RowActions from '~/components/devices/table/RowActions.vue'
import { useDevicesStore } from '~/store/devices.store'
import { useCategoryStore } from '~/store/category.store'
import type { IDeviceResponse } from '~/types/product.interface'
import { deleteDevice, updateDevice } from '~/api/devices.api'

const router = useRouter()
const route = useRoute()
const store = useDevicesStore()
const categoryStore = useCategoryStore()

const { getDevicesList } = store

const { total, devices, ...meta } = storeToRefs(store)
const centerDialogVisible = ref(false)
const id = ref<number>()

const sort = computed(() => route.query.sort as string)
const order = computed(() => route.query.order as string)

const updateMutation = useMutation({
  mutationFn: updateDevice,
})

function handleVisibleChange(value: CheckboxValueType, data: IDeviceResponse) {
  updateMutation.mutate({ ...data, visible: value as boolean })
}

function handleSortChange({ prop, order }: { prop: string, order: string }) {
  router.push({ query: { sort: prop, ...(order && { order }) } })
}

async function handleRemove() {
  if (!id.value)
    return

  try {
    await deleteDevice(id.value)

    centerDialogVisible.value = false
    await getDevicesList(sort.value, order.value)
  }
  catch (error) {
    return Promise.reject(error)
  }
}

function openDialog(_id: number) {
  centerDialogVisible.value = true
  id.value = _id
}

watch(
  () => [sort, order, meta],
  () => getDevicesList(sort.value, order.value),
  {
    immediate: true,
    deep: true,
  },
)
</script>

<template>
  <el-card shadow="never">
    <el-table
      :data="devices"
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
          <span>{{ categoryStore.getCategoryLabelByID(row.category) }}</span>
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

      <RowActions :open-dialog="openDialog" />
    </el-table>
  </el-card>

  <el-dialog
    v-model="centerDialogVisible"
    title="Warning"
    width="500"
    align-center
  >
    <span>Are you sure you want to delete this device?</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">
          Cancel
        </el-button>
        <el-button type="danger" @click="handleRemove">
          Delete
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-table {
    width: 100%;
    border-radius: 10px;
    border: 1px solid var(--el-table-border-color);
}
</style>
