import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BaseScheduler from '@/components/BaseScheduler.vue'
import BasePresets from '@/components/BasePresets.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'presets',
      component: BasePresets,
    },
    {
      path: '/list',
      name: 'list',
      component: HomeView,
    },
    {
      path: '/sheduler',
      name: 'sheduler',
      component: BaseScheduler,
    },
  ],
})

export default router
