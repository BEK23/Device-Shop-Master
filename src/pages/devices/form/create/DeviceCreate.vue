<script setup>
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { toTypedSchema } from '@vee-validate/yup'
import DeviceFields from '../fields/DeviceFields.vue'

const schema = toTypedSchema(
  yup.object({
    model: yup.string().required().label('Model'),
    category: yup.string().required().label('Category'),
    releaseDate: yup.date().required().label('Release Date'),
    recommendedPrice: yup.number().required().label('Recommended Price'),
    description: yup.string().label('Description'),
    visible: yup.boolean().label('Visible'),
    photo: yup.mixed().label('Photo'),
  }),
)

const { defineField, handleSubmit } = useForm({
  validationSchema: schema,
})

const onSubmit = handleSubmit(() => {
})
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
