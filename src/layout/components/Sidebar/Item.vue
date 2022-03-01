<template>
  <i :class="[icon, 'sub-el-icon']" v-if="elIcon" />
  <!-- <el-icon :class="[icon, 'sub-el-icon']" v-if="elIcon">
    <icon></icon>
  </el-icon> -->
  <svg-icon :icon-class="icon" v-else />
  <span v-if="title">{{ title }}</span>
</template>

<script lang="ts" setup>
  const props = defineProps({
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  })
  const elIcon = computed(() => props.icon.includes("el-icon"))
</script>

<style lang="scss" scoped></style>
