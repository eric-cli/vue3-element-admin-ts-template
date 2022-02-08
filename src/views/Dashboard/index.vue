<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script setup lang="ts">
import adminDashboard from "./Admin/index.vue";
import editorDashboard from "./Editor/index.vue";
const currentRole = ref("adminDashboard");
import useUserStore from "@/stores/user";
const userStore = useUserStore();
const roles = computed(() => {
  return userStore.roles;
});
onBeforeMount(() => {
  if (!roles.value.includes("admin")) {
    currentRole.value = "editorDashboard";
  }
});
</script>

<style lang="scss" scoped></style>
