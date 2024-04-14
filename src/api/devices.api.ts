import type { AxiosResponse } from 'axios'
import type { ComputedRef, Ref } from 'vue'
import { API } from './api'
import type { IDeviceRequest, IDeviceResponse, IDevicesListResponse } from '~/types/product.interface'

// GET

interface GetDevicesListParams {
  category: Ref<number | undefined>
  pageSize: Ref<number>
  currentPage: Ref<number>
  search: Ref<string>
  sort?: ComputedRef<string>
  order?: ComputedRef<string>
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
      ...(params.sort && { sort: params.sort.value }),
      ...(params.order && { order: params.order.value }),
    },
  })
}

export function getDeviceByID(id: string): Promise<AxiosResponse<IDeviceResponse>> {
  return API.get(`/devices/${id}`)
}

// POST

export function createDevice(data: IDeviceRequest): Promise<AxiosResponse<IDeviceResponse>> {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value)
  })

  return API.postForm('/devices', formData)
}

// PUT

export function updateDevice(data: IDeviceRequest): Promise<AxiosResponse<IDeviceResponse>> {
  const { id } = data

  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value)
      formData.append(key, value)
  })

  return API.putForm(`/devices/${id}`, formData)
}

// DELETE
export function deleteDevice(id: number): Promise<AxiosResponse> {
  return API.delete(`/devices/${id}`)
}
