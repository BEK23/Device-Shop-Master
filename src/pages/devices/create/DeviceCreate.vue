<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { useMutation } from '@tanstack/vue-query'
import DeviceFields from '~/components/devices/fields/DeviceFields.vue'
import { deviceSchema } from '~/types/schema/device.schema'
import { createDevice } from '~/api/devices.api'
import { router } from '~/router'
import { PATH } from '~/constants/path'
import { useDevicesStore } from '~/store/devices.store'

const store = useDevicesStore()

const { defineField, handleSubmit, meta } = useForm({
  validationSchema: deviceSchema,
})

const createMutation = useMutation({
  mutationFn: createDevice,
  onSuccess: ({ data }) => {
    if (store.currentPage === 1)
      store.addDevice(data)
    else store.changeCurrentPage(1)

    router.push(PATH.devices.index)
  },
})

const onSubmit = handleSubmit(({ releaseDate, category, photo, ...rest }) => createMutation.mutate({
  releaseDate: releaseDate.getFullYear(),
  category: Number(category),
  photo: photo as File,
  ...rest,
}))
</script>

<template>
  <el-scrollbar>
    <el-form label-position="top" @submit="onSubmit">
      <DeviceFields :define-field="defineField" />

      <el-form-item>
        <el-button type="primary" native-type="submit" :disabled="meta.pending || !meta.dirty">
          Create Device
        </el-button>
      </el-form-item>
    </el-form>
  </el-scrollbar>
</template>

<style scoped>
.el-scrollbar {
  padding: 0!important;
}
</style>
