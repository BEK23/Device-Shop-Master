import type { AxiosResponse } from 'axios'
import type { Ref } from 'vue'
import { API } from './api'
import type { IDevice, IDeviceResponse, IDevicesListResponse } from '~/types/product.interface'

// GET

export function getDevicesList(
  params: { currentPage: Ref<number>, pageSize: Ref<number> },
): Promise<AxiosResponse<IDevicesListResponse>> {
  return API.get('/devices', { params: { page: params.currentPage.value, limit: params.pageSize.value } })
}

// POST

export function createDevice(device: IDevice): Promise<AxiosResponse<IDeviceResponse>> {
  return API.post('/devices', device)
}
