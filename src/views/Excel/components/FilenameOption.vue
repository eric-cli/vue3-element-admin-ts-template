<template>
  <div style="display: inline-block">
    <label class="radio-label" style="padding-left: 0">Filename: </label>
    <el-input
      v-model="filename"
      placeholder="Please enter the file name (default excel-list)"
      style="width: 345px"
      :prefix-icon="Document"
      clearable
    />
  </div>
</template>

<script setup lang="ts">
  import { Document } from "@element-plus/icons-vue"

  const props = defineProps({
    modelValue: {
      type: String,
      default: ""
    }
  })
  const emit = defineEmits(["update:modelValue"])

  const filename: any = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emit("update:modelValue", val)
    }
  })
</script>

<style lang="scss" scoped>
  .radio-label {
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 30px;
  }
</style>
