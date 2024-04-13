<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import DevicesTable from './DevicesTable.vue'
import DevicesToolbar from './components/DevicesToolbar.vue'
import { PATH } from '~/constants/path'
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import { getDevicesList } from '~/api/devices.api'
import { useDevicesStore } from '~/store/devices.store'

const router = useRoute()

const pageSize = ref(10)
const currentPage = ref(1)

const store = useDevicesStore()

useQuery({
  queryKey: ['devices', { currentPage, pageSize }],
  queryFn: () => getDevicesList({ currentPage, pageSize }),
  select: (response) => {
    store.setDevices(response.data)
  },
  refetchOnWindowFocus: false,
})

function handleSizeChange(val: number) {
  pageSize.value = val
}
function handleCurrentChange(val: number) {
  currentPage.value = val
}

const drawer = computed(() => router.name !== 'devices.index')
</script>

<template>
  <el-scrollbar style="height: 100%">
    <el-row justify="space-between" align="bottom">
      <Breadcrumbs :breadcrumbs="[{ title: 'Devices' }]" />
      <router-link :to="PATH.devices.create">
        <el-button
          type="primary"
          :icon="Plus"
          style="margin-bottom: 20px;"
        >
          Add Device
        </el-button>
      </router-link>
    </el-row>

    <DevicesToolbar />

    <DevicesTable />

    <el-pagination
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, ->, prev, pager, next, jumper"
      :total="store.total"
      :small="true"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
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
