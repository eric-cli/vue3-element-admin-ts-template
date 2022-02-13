<template>
  <el-form>
    <el-form-item label="Name">
      <el-input v-model.trim="user.true_name" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
const props = defineProps({
  user: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

// TODO: 完整的表单更新信息，加校验;
const submit = () => {
  ElMessage({
    message: "User information has been updated successfully",
    type: "success",
    duration: 5 * 1000,
  });
};
</script>

<style lang="scss" scoped></style>
