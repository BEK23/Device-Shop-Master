import type { AxiosResponse } from 'axios'
import { API } from './api'
import type { IDeviceRequest, IDeviceResponse } from '~/types/product.interface'

// GET

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
