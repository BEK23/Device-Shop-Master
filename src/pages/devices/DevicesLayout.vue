<script lang="ts" setup>
import { computed } from 'vue'
import { Plus } from '@element-plus/icons-vue'

import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import DevicesTable from './DevicesTable.vue'
import DevicesToolbar from './components/DevicesToolbar.vue'
import { PATH } from '~/constants/path'
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import { getDevicesList } from '~/api/devices.api'
import { useDevicesStore } from '~/store/devices.store'
import { useCategoryStore } from '~/store/category.store'
import { getAllCategories } from '~/api/category.api'

const router = useRoute()

const deviceStore = useDevicesStore()
const categoryStore = useCategoryStore()

const { devices, total, ...meta } = storeToRefs(deviceStore)
const { setDevices, changePageSize, changeCurrentPage } = deviceStore

useQuery({
  queryKey: ['devices', meta],
  queryFn: () => getDevicesList(meta),
  select: (response) => {
    setDevices(response.data)
  },
  refetchOnWindowFocus: false,
})

useQuery({
  queryKey: ['categories'],
  queryFn: () => getAllCategories(),
  select: (response) => {
    categoryStore.setCategories(response.data)
  },
  refetchOnWindowFocus: false,
})

const drawer = computed(() => router.name !== 'devices.index')
</script>

<template>
  <el-scrollbar style="height: 100%">
    <el-row justify="space-between" align="bottom">
      <Breadcrumbs :breadcrumbs="[{ title: 'Devices' }]" />
      <router-link :to="PATH.devices.create">
        <el-button type="primary" :icon="Plus">
          Add Device
        </el-button>
      </router-link>
    </el-row>

    <DevicesToolbar />

    <DevicesTable />

    <el-pagination
      :current-page="meta.currentPage.value"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="meta.pageSize.value"
      layout="total, sizes, ->, prev, pager, next, jumper"
      :total="total"
      :small="true"
      @size-change="changePageSize"
      @current-change="changeCurrentPage"
    />
  </el-scrollbar>

  <el-drawer v-model="drawer" :with-header="false" size="40%" @close="$router.replace(PATH.devices.index)">
    <router-view />
  </el-drawer>
</template>

<style scoped>
.el-scrollbar {
  padding: 0 30px;
}
</style>
