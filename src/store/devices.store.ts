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

  function addDevice(device: IDeviceResponse) {
    devices.value.unshift(device)
    total.value++
  }

  return {
    devices,
    total,
    setDevices,
    addDevice,
  }
})
