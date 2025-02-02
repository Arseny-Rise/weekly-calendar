import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IweekGenerator } from '@/scheme/interfaces'

export const useShedulerStore = defineStore('sheduler', () => {
  const items = ref<IweekGenerator[]>([])

  const updateItems = (newItems: IweekGenerator[]) => {
    items.value = newItems
  }

  return { items, updateItems }
})
