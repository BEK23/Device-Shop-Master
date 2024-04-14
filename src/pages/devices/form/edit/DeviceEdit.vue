<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import DeviceFields from '../fields/DeviceFields.vue'
import { deviceSchema } from '../schema'
import { getDeviceByID, updateDevice } from '~/api/devices.api'
import { useDevicesStore } from '~/store/devices.store'
import { router } from '~/router'
import { PATH } from '~/constants/path'

const route = useRoute()
const id = route.params.id as string

const store = useDevicesStore()

const { defineField, handleSubmit, resetForm } = useForm({
  validationSchema: deviceSchema,
})

useQuery({
  queryKey: ['devices', id],
  queryFn: () => getDeviceByID(id),
  select: ({ data }) => {
    resetForm({ values: {
      model: data.model,
      category: data.category,
      releaseDate: new Date(data.releaseDate, 1),
      recommendedPrice: data.recommendedPrice,
      description: data.description,
      visible: data.visible,
      createdAt: data.createdAt,
    } })
  },
  refetchOnWindowFocus: false,
})

const createMutation = useMutation({
  mutationFn: updateDevice,
  onSuccess: ({ data }) => {
    store.updateDevice(data)
    router.replace(PATH.devices.index)
  },
})

const onSubmit = handleSubmit(({ releaseDate, category, ...rest }) => createMutation.mutate({
  id,
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
          Save Changes
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
