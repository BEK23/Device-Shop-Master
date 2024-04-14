<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { useMutation } from '@tanstack/vue-query'
import DeviceFields from '../fields/DeviceFields.vue'
import { deviceSchema } from '../schema'
import { createDevice } from '~/api/devices.api'
import { router } from '~/router'
import { PATH } from '~/constants/path'
import { useDevicesStore } from '~/store/devices.store'

const store = useDevicesStore()

const { defineField, handleSubmit } = useForm({
  validationSchema: deviceSchema,
})

const createMutation = useMutation({
  mutationFn: createDevice,
  onSuccess: () => {
    store.changeCurrentPage(1)
    router.push(PATH.devices.index)
  },
})

const onSubmit = handleSubmit(({ releaseDate, category, ...rest }) => createMutation.mutate({
  releaseDate: releaseDate.getFullYear(),
  category: Number(category),
  ...rest,
}))
</script>

<template>
  <el-scrollbar>
    <el-form label-position="top" @submit="onSubmit">
      <DeviceFields :define-field="defineField" />

      <el-form-item>
        <el-button type="primary" native-type="submit">
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
