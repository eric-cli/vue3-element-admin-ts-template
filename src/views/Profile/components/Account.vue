<template>
  <el-form>
    <el-form-item label="Name">
      <el-input v-model.trim="forms.true_name" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="forms.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
  import { ElMessage } from "element-plus"
  // TODO 代码优化
  const props = defineProps({
    user: {
      type: Object,
      default: () => {
        return {
          name: "",
          email: ""
        }
      }
    }
  })

  const emit = defineEmits(["update:user"])

  const forms: any = computed({
    get: () => {
      return props.user
    },
    set: (val) => {
      console.log(val)
      emit("update:user", val)
    }
  })

  // TODO: 完整的表单更新信息，加校验;
  const submit = () => {
    ElMessage({
      message: "User information has been updated successfully",
      type: "success",
      duration: 5 * 1000
    })
  }
</script>

<style lang="scss" scoped></style>
