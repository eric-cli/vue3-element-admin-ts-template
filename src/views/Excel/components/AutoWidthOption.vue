<template>
  <div style="display: inline-block">
    <label class="radio-label">Cell Auto-Width: </label>
    <el-radio-group v-model="autoWidth">
      <el-radio :label="true" border> True </el-radio>
      <el-radio :label="false" border> False </el-radio>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: {
      type: String,
      default: ""
    }
  })
  const emit = defineEmits(["update:modelValue"])

  const autoWidth: any = computed({
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
