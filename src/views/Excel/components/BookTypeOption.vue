<template>
  <div style="display: inline-block">
    <label class="radio-label">Book Type: </label>
    <el-select v-model="bookType" style="width: 120px">
      <el-option v-for="item in options" :key="item" :label="item" :value="item" />
    </el-select>
  </div>
</template>

<script setup lang="ts">
  import { Document } from "@element-plus/icons-vue"

  const options = ref(["xlsx", "csv", "txt"])
  const props = defineProps({
    modelValue: {
      type: String,
      default: ""
    }
  })
  const emit = defineEmits(["update:modelValue"])

  const bookType = computed({
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
