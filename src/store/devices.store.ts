import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IDeviceResponse, IDevicesListResponse } from '~/types/product.interface'

export const useDevicesStore = defineStore('devices', () => {
  const devices = ref<IDeviceResponse[]>([])
  const total = ref(0)

  function setDevices(response: IDevicesListResponse) {
    devices.value = response.data
    total.value = response.meta.total
  }

  return {
    devices,
    total,
    setDevices,
  }
})
