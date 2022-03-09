<template>
  <el-color-picker
    v-model="theme"
    :predefine="[
      '#409EFF',
      '#1890ff',
      '#304156',
      '#212121',
      '#11a983',
      '#13c2c2',
      '#6959CD',
      '#f5222d'
    ]"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
  />
</template>

<script lang="ts" setup>
  const theme = ref("")
  // TODO:全局样式修改
</script>

<style lang="scss" scoped></style>
