<template>
  <svg-icon
    class-name="search-icon"
    :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
    @click="click"
  />
</template>

<script lang="ts" setup>
  const { isFullscreen, toggle, isSupported } = useFullscreen()
  const click = () => {
    if (!isSupported) {
      ElMessage({
        message: "you browser can not work",
        type: "warning"
      })
    } else {
      toggle()
    }
  }
</script>

<style scoped lang="scss">
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
    box-sizing: content-box;
  }
</style>
