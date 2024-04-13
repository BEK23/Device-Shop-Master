import type { AxiosResponse } from 'axios'
import { API } from './api'
import type { ICategoryResponse } from '~/types/category.interface'

export async function getAllCategories(): Promise<AxiosResponse<ICategoryResponse[]>> {
  return API.get('/categories')
}
