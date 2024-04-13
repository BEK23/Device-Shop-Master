<script lang="ts" setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { toTypedSchema } from '@vee-validate/yup'
import { useMutation } from '@tanstack/vue-query'
import DeviceFields from '../fields/DeviceFields.vue'
import { createDevice } from '~/api/devices.api'
import { router } from '~/router'
import { PATH } from '~/constants/path'
import { useDevicesStore } from '~/store/devices.store'

const store = useDevicesStore()

const schema = toTypedSchema(
  yup.object({
    model: yup.string().required().label('Model'),
    category: yup.string().required().label('Category'),
    releaseDate: yup.date().required().label('Release Date'),
    recommendedPrice: yup.number().required().label('Recommended Price'),
    description: yup.string().label('Description'),
    visible: yup.boolean().label('Visible'),
    photo: yup.string().label('Photo'),
  }),
)

const { defineField, handleSubmit } = useForm({
  validationSchema: schema,
})

const createMutation = useMutation({
  mutationFn: createDevice,
  onSuccess: (response) => {
    store.addDevice(response.data)
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
