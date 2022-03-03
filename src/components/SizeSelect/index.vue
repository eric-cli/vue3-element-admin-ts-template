<template>
  <el-dropdown @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item of sizeOptions"
          :key="item.value"
          :disabled="size === item.value"
          :command="item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
  import useAppStore from "@/stores/app"

  const appStore = useAppStore()
  const sizeOptions = [
    { label: "Large", value: "large" },
    { label: "Default", value: "default" },
    { label: "Small", value: "small" }
  ]
  const size = computed(() => {
    return appStore.size
  })

  const handleSetSize = (size) => {
    appStore.setSize(size)
    // this.refreshView();
    ElMessage({
      message: "Switch Size Success",
      type: "success"
    })
  }
</script>

<style lang="scss" scoped></style>
