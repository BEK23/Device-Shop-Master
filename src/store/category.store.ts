import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ICategoryResponse } from '~/types/category.interface'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<ICategoryResponse[]>([])

  function getCategoryLabelById(id: number) {
    return categories.value.find(category => category.id === id)?.label
  }

  function setCategories(data: ICategoryResponse[]) {
    categories.value = data
  }

  return {
    categories,
    setCategories,
    getCategoryLabelById,
  }
})
