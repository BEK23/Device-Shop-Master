import type { IMeta, ITableQueryParams } from './common'

export interface IDevice {
  model: string
  releaseDate: string
  category: string
  recommendedPrice: number
  description: string
  visible: boolean
  photo: string
}

// RESPONSE

export interface IDeviceResponse extends IDevice {
  id: string
  createdAt: string
}

export interface IDevicesListResponse {
  data: IDeviceResponse[]
  meta: IMeta
}

// QUERY PARAMS

export interface IDevicesListQueryParams extends ITableQueryParams {
  search?: string
  category?: string
}
