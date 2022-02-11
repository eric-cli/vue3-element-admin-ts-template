<template>
  <svg-icon
    :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
    @click="click"
  />
</template>

<script lang="ts" setup>
const { isFullscreen, enter, exit, toggle, isSupported } = useFullscreen();
console.log(isSupported);
const click = () => {
  if (!isSupported) {
    ElMessage({
      message: "you browser can not work",
      type: "warning",
    });
    return false;
  }
  toggle();
};
</script>

<style lang="scss" scoped></style>
