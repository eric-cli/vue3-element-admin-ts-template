<template>
  <el-dropdown @command="handleSetSize">
    <el-row class="dropdown-top" align="middle">
      <svg-icon class-name="size-icon" icon-class="size" />
    </el-row>
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
  import useTagsViewStore from "@/stores/tagsView"

  const tagsViewStore = useTagsViewStore()
  const appStore = useAppStore()
  const route = useRoute()
  const router = useRouter()
  const sizeOptions = [
    { label: "Large", value: "large" },
    { label: "Default", value: "default" },
    { label: "Small", value: "small" }
  ]
  const size = computed(() => {
    return appStore.size
  })

  const refreshView = () => {
    // In order to make the cached page re-rendered
    tagsViewStore.delAllCachedViews()
    const { fullPath } = route
    nextTick(() => {
      router.replace({
        path: `/redirect${fullPath}`
      })
    })
  }

  const handleSetSize = (size) => {
    // TODO: refreshView方法添加
    appStore.setSize(size)
    refreshView()
    ElMessage({
      message: "Switch Size Success",
      type: "success"
    })
  }
</script>

<style lang="scss" scoped>
  .dropdown-top {
    height: 100%;
  }
</style>
