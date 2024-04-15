<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import DeviceFields from '~/components/devices/fields/DeviceFields.vue'
import { deviceSchema } from '~/types/schema/device.schema'
import { getDeviceByID, updateDevice } from '~/api/devices.api'
import { useDevicesStore } from '~/store/devices.store'
import { router } from '~/router'
import { PATH } from '~/constants/path'

const route = useRoute()
const id = route.params.id as string

const store = useDevicesStore()

const { defineField, handleSubmit, resetForm, meta } = useForm({
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
      photo: data.photo,
    } })
  },
  refetchOnWindowFocus: false,
})

const updateMutation = useMutation({
  mutationFn: updateDevice,
  onSuccess: ({ data }) => {
    store.updateDevice(data)
    router.replace(PATH.devices.index)
  },
})

const onSubmit = handleSubmit(({ releaseDate, category, photo, ...rest }) => updateMutation.mutate({
  id: Number.parseInt(id),
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
          Save Changes
        </el-button>
      </el-form-item>
    </el-form>
  </el-scrollbar>
</template>

<style scoped>
.el-scrollbar {
  padding: 20px;
  box-sizing: border-box
}
</style>
