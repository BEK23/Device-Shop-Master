import { createRouter, createWebHistory } from 'vue-router'
import DevicesLayout from '~/pages/devices/DevicesLayout.vue'
import DeviceCreate from '~/pages/devices/form/create/DeviceCreate.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/devices',
      name: 'devices.index',
      component: DevicesLayout,
      children: [
        {
          path: '/devices/create',
          name: 'devices.create',
          component: DeviceCreate,
        },
      ],
    },
  ],
})
