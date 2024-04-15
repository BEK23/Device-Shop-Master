import { createRouter, createWebHistory } from 'vue-router'
import { PATH } from '~/constants/path'
import DevicesLayout from '~/components/layouts/DevicesLayout.vue'
import DeviceCreate from '~/pages/devices/create/DeviceCreate.vue'
import DeviceEdit from '~/pages/devices/edit/DeviceEdit.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: PATH.home,
      redirect: PATH.devices.index,
    },
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
        {
          path: PATH.devices.edit,
          name: 'devices.edit',
          component: DeviceEdit,
        },
      ],
    },
  ],
})
