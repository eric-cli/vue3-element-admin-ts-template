<template>
  <el-row
    class="handle-button"
    align="middle"
    :style="{ top: buttonTop + 'px', 'background-color': theme }"
    @click="show = !show"
  >
    <el-icon>
      <Close v-if="show"></Close>
      <Setting v-else></Setting>
    </el-icon>
  </el-row>
</template>

<script setup lang="ts">
  import { Close, Setting } from "@element-plus/icons-vue"
  import { addClass, removeClass } from "@/utils"
  import useSettingStore from "@/stores/settings"

  const settingStore = useSettingStore()
  const props = defineProps({
    clickNotClose: {
      default: false,
      type: Boolean
    },
    buttonTop: {
      default: 250,
      type: Number
    }
  })
  const show = ref(false)
  const rightPanel = ref(false)
  const theme = computed(() => {
    return settingStore.theme
  })
  // const insertToBody = () => {
  //   const body: any = document.querySelector("body")
  //   body.insertBefore(rightPanel.value, body.firstChild)
  // }
  // const closeSidebar = (evt) => {
  //   const parent = evt.target.closest(".rightPanel")
  //   if (!parent) {
  //     show.value = false
  //     window.removeEventListener("click", closeSidebar)
  //   }
  // }
  // const addEventClick = () => {
  //   window.addEventListener("click", closeSidebar)
  // }
  onMounted(() => {
    // insertToBody()
  })
  onUnmounted(() => {
    // rightPanel.value!.remove()
  })
  // watch(show, (value) => {
  //   if (value && !props.clickNotClose) {
  //     addEventClick()
  //   }
  //   if (value) {
  //     // TODO: 类名添加
  //     addClass(document.body, "showRightPanel")
  //   } else {
  //     removeClass(document.body, "showRightPanel")
  //   }
  // })
</script>

<style>
  .showRightPanel {
    overflow: hidden;
    position: relative;
    width: calc(100% - 15px);
  }
</style>

<style lang="scss" scoped>
  .rightPanel-background {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
    background: rgba(0, 0, 0, 0.2);
    z-index: -1;
  }

  .rightPanel {
    width: 100%;
    max-width: 260px;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
    transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
    transform: translate(100%);
    background: #fff;
    z-index: 40000;
  }

  .show {
    transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

    .rightPanel-background {
      z-index: 20000;
      opacity: 1;
      width: 100%;
      height: 100%;
    }

    .rightPanel {
      transform: translate(0);
    }
  }

  .handle-button {
    position: fixed;
    width: 48px;
    height: 48px;
    right: 0;
    top: 50%;
    justify-content: center;
    font-size: 24px;
    border-radius: 6px 0 0 6px !important;
    z-index: 0;
    pointer-events: auto;
    cursor: pointer;
    color: #fff;
    transition: translate(-50%, 0);
  }
</style>
