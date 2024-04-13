<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

import { data } from './data'
import DevicesTable from './DevicesTable.vue'
import DevicesToolbar from './components/DevicesToolbar.vue'

import Breadcrumbs from '~/components/Breadcrumbs.vue'

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
  <el-row justify="space-between" align="bottom">
    <Breadcrumbs :breadcrumbs="[{ title: 'Devices' }]" />
    <el-button type="primary" :icon="Plus" style="border-radius: 10px; margin-bottom: 20px;">
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
</template>
