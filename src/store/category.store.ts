import { defineStore } from 'pinia'
import { API } from '~/api/api'
import type { ICategoryResponse } from '~/types/category.interface'

interface ICategoryStore {
  categories: ICategoryResponse[]
}

export const useCategoryStore = defineStore('category', {
  state: (): ICategoryStore => ({
    categories: [],
  }),
  getters: {
    getCategoryLabelByID: state => (id: number) => state.categories.find(category => category.id === id)?.label,
  },
  actions: {
    async getAllCategories() {
      try {
        const { data } = await API.get<ICategoryResponse[]>('/categories')

        this.categories = data
      }
      catch (error) {
        return Promise.reject(error)
      }
    },
  },
})
