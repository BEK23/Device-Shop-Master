import { createRouter, createWebHistory } from 'vue-router'
import { PATH } from '~/constants/path'
import DevicesLayout from '~/pages/devices/DevicesLayout.vue'
import DeviceCreate from '~/pages/devices/form/create/DeviceCreate.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: PATH.devices.index,
      name: 'devices.index',
      component: DevicesLayout,
      children: [
        {
          path: PATH.devices.create,
          name: 'devices.create',
          component: DeviceCreate,
        },
      ],
    },
  ],
})
