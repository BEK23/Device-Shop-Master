import type { QueryFunction } from '@tanstack/vue-query'
import type { AxiosResponse } from 'axios'
import { API } from './api'
import type { IDevicesListQueryParams, IDevicesListResponse } from '~/types/product.interface'

export const getDevicesList: QueryFunction<
  AxiosResponse<IDevicesListResponse>,
  [string, IDevicesListQueryParams]
> = () => {
  return API.get('/devices')
}
