import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IDeviceResponse, IDevicesListResponse } from '~/types/product.interface'

export const useDevicesStore = defineStore('devices', () => {
  const devices = ref<IDeviceResponse[]>([])
  const total = ref(0)

  const pageSize = ref(10)
  const currentPage = ref(1)
  const category = ref<number | undefined>()
  const search = ref('')

  function setDevices(response: IDevicesListResponse) {
    devices.value = response.data
    total.value = response.meta.total
  }

  function addDevice(device: IDeviceResponse) {
    devices.value.unshift(device)
    total.value++
  }

  function changePageSize(val: number) {
    pageSize.value = val
  }
  function changeCurrentPage(val: number) {
    currentPage.value = val
  }

  return {
    devices,
    total,
    setDevices,
    addDevice,
    pageSize,
    currentPage,
    category,
    search,
    changePageSize,
    changeCurrentPage,
  }
})
