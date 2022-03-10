<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
  </div>
</template>

<script setup lang="ts">
  import SwitchRoles from "./components/SwitchRoles.vue"

  const router = useRouter()
  const handleRolesChange = () => {
    router.push({ path: `/permission?${+new Date()}` })
  }
</script>

<style lang="scss" scoped></style>
