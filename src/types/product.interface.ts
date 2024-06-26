import type { IMeta, ITableQueryParams } from './common'

export interface IDevice {
  model: string
  releaseDate: number
  category: number
  recommendedPrice: number
  description?: string
  visible?: boolean
  photo?: File
}

// RESPONSE

export interface IDeviceResponse extends IDevice {
  id: number
  createdAt: number
}

export interface IDevicesListResponse {
  data: IDeviceResponse[]
  meta: IMeta
}

// REQUEST

export interface IDeviceRequest extends IDevice {
  id?: number
  createdAt?: number
}

// QUERY PARAMS

export interface IDevicesListQueryParams extends ITableQueryParams {
  search?: string
  category?: number
}
