<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

import { data } from './data'
import DevicesTable from './DevicesTable.vue'
import DevicesToolbar from './components/DevicesToolbar.vue'
import DeviceCreate from './form/create/DeviceCreate.vue'

import Breadcrumbs from '~/components/Breadcrumbs.vue'

const drawer = ref(false)

const pageSize = ref(10)
const currentPage = ref(1)

function handleSizeChange(val: number) {
  pageSize.value = val
}
function handleCurrentChange(val: number) {
  currentPage.value = val
}
</script>

<template>
  <el-scrollbar style="height: 100%">
    <el-row justify="space-between" align="bottom">
      <Breadcrumbs :breadcrumbs="[{ title: 'Devices' }]" />
      <el-button
        type="primary"
        :icon="Plus"
        style="margin-bottom: 20px;"
        @click="drawer = true"
      >
        Add Device
      </el-button>
    </el-row>

    <DevicesToolbar />

    <DevicesTable />

    <el-pagination
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, ->, prev, pager, next, jumper"
      :total="data.length"
      :small="true"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-scrollbar>

  <el-drawer v-model="drawer" :with-header="false" size="40%">
    <DeviceCreate />
  </el-drawer>
</template>

<style scoped>
.el-scrollbar {
  padding: 0 30px;
}
</style>
