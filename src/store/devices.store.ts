import { defineStore } from 'pinia'
import { API } from '~/api/api'
import type { IDeviceResponse, IDevicesListResponse } from '~/types/product.interface'

interface IDevicesStore {
  devices: IDeviceResponse[]
  total: number
  pageSize: number
  currentPage: number
  category?: number
  search: string
}

export const useDevicesStore = defineStore('devices', {
  state: (): IDevicesStore => ({
    devices: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    category: undefined,
    search: '',
  }),
  actions: {
    async getDevicesList(sort?: string, order?: string) {
      try {
        const { data } = await API.get<IDevicesListResponse>('/devices', {
          params: {
            page: this.currentPage,
            limit: this.pageSize,
            ...(this.category && { category: this.category }),
            ...(this.search && { search: this.search }),
            ...(sort && { sort }),
            ...(order && { order }),
          },
        })

        this.devices = data.data
        this.total = data.meta.total
      }
      catch (error) {
        return Promise.reject(error)
      }
    },
    addDevice(device: IDeviceResponse) {
      this.devices.unshift(device)
      this.total++
    },
    updateDevice(device: IDeviceResponse) {
      const index = this.devices.findIndex(d => d.id === device.id)
      if (index !== -1)
        this.devices.splice(index, 1, device)
    },
    changePageSize(val: number) {
      this.pageSize = val
    },
    changeCurrentPage(val: number) {
      this.currentPage = val
    },
  },
})
