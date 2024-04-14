import type { AxiosResponse } from 'axios'
import type { Ref } from 'vue'
import { API } from './api'
import type { IDevice, IDeviceResponse, IDevicesListResponse } from '~/types/product.interface'

// GET

interface GetDevicesListParams {
  category: Ref<number | undefined>
  pageSize: Ref<number>
  currentPage: Ref<number>
  search: Ref<string>
}

export function getDevicesList(
  params: GetDevicesListParams,
): Promise<AxiosResponse<IDevicesListResponse>> {
  return API.get('/devices', {
    params: {
      page: params.currentPage.value,
      limit: params.pageSize.value,
      category: params.category.value,
      ...(params.search.value && { search: params.search.value }),
    },
  })
}

export function getDeviceByID(id: string): Promise<AxiosResponse<IDeviceResponse>> {
  return API.get(`/devices/${id}`)
}

// POST

export function createDevice(data: IDevice): Promise<AxiosResponse<IDeviceResponse>> {
  return API.post('/devices', data)
}

// PUT

export function updateDevice({ id, ...data }: Partial<IDevice> & { id: string }): Promise<AxiosResponse<IDeviceResponse>> {
  return API.put(`/devices/${id}`, data)
}

// DELETE
export function deleteDevice(id: number): Promise<AxiosResponse> {
  return API.delete(`/devices/${id}`)
}
