<template>
  <el-config-provider :size="size">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import useAppStore from "@/stores/app";
const appStore = useAppStore();
const size = computed(() => {
  return appStore.size;
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
