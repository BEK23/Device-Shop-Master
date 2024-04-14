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

// POST

export function createDevice(device: IDevice): Promise<AxiosResponse<IDeviceResponse>> {
  return API.post('/devices', device)
}
