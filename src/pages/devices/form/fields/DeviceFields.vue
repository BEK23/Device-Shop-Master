<script setup>
const { defineField } = defineProps({
  defineField: Function,
})

function elPlusConfig(state) {
  return {
    props: {
      validateEvent: false,
      error: state.errors[0],
      required: state.required,
    },
  }
}

const [model, modelProps] = defineField('model', elPlusConfig)
const [category, categoryProps] = defineField('category', elPlusConfig)
const [releaseDate, releaseDateProps] = defineField('releaseDate', elPlusConfig)
const [recommendedPrice, recommendedPriceProps] = defineField('recommendedPrice', elPlusConfig)
const [description, descriptionProps] = defineField('description', elPlusConfig)
const [visible, visibleProps] = defineField('visible', elPlusConfig)
const [photoProps] = defineField('photo', elPlusConfig)
</script>

<template>
  <el-form-item label="Model" v-bind="modelProps">
    <el-input v-model="model" />
  </el-form-item>

  <el-row gutter="12">
    <el-col :span="12">
      <el-form-item label="Category" v-bind="categoryProps">
        <el-select v-model="category" type="text" />
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="Release Date" v-bind="releaseDateProps">
        <el-date-picker v-model="releaseDate" type="date" style="width: 100%;" />
      </el-form-item>
    </el-col>
  </el-row>

  <el-form-item label="Recommended Price" v-bind="recommendedPriceProps">
    <el-input-number v-model="recommendedPrice" :precision="2" :step="0.1" min="0" />
  </el-form-item>

  <el-form-item label="Description" v-bind="descriptionProps">
    <el-input v-model="description" type="textarea" />
  </el-form-item>

  <el-form-item label="Visible" v-bind="visibleProps" class="form-inline">
    <el-checkbox v-model="visible" />
  </el-form-item>

  <el-form-item label="Photo" v-bind="photoProps" style="width: 100%;">
    <el-upload drag style="width: 100%;">
      <el-icon class="el-icon--upload">
        <upload-filled />
      </el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
    </el-upload>
  </el-form-item>
</template>

<style scoped>
.form-inline {
  display: inline-flex;
  align-items: end;
}
</style>
