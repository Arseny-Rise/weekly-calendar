import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IweekGenerator } from '@/scheme/interfaces'

export const useShedulerStore = defineStore('sheduler', () => {
  const sheduler = ref<IweekGenerator[]>([])

  const updateSheduler = (newItems: IweekGenerator[]) => {
    sheduler.value = newItems
  }

  return { sheduler, updateSheduler }
})
