import { createRouter, createWebHistory } from 'vue-router'
import DevicesLayout from '~/pages/devices/DevicesLayout.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/devices',
      name: 'devices',
      component: DevicesLayout,
    },
  ],
})
