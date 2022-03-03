<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script lang="ts" setup>
  import AdminDashboard from "./Admin/index.vue"
  import EditorDashboard from "./Editor/index.vue"
  import useUserStore from "@/stores/user"

  const userStore = useUserStore()
  const roles: any = computed(() => {
    return userStore.roles
  })
  const currentRole = computed(() => {
    if (roles.value.includes("admin")) {
      return AdminDashboard
    }
    return EditorDashboard
  })
</script>

<style lang="scss" scoped></style>
