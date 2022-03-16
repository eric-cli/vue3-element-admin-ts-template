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
  <el-drawer v-model="show" direction="rtl" custom-class="drawer-container">
    <template #title>
      <h3 class="drawer-title">Page style setting</h3>
    </template>
    <template #default>
      <el-row class="drawer-item" align="middle">
        <span>Theme Color</span>
        <theme-picker style="height: 26px; margin: -3px 8px 0 0" @change="themeChange" />
      </el-row>

      <el-row class="drawer-item" align="middle">
        <span>Open Tags-View</span>
        <el-switch v-model="tagsView" class="drawer-switch" />
      </el-row>

      <el-row class="drawer-item" align="middle">
        <span>Fixed Header</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </el-row>

      <el-row class="drawer-item" align="middle">
        <span>Sidebar Logo</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </el-row>
    </template>
    <template #footer>
      <div style="flex: auto">
        <!-- <el-button @click="cancelClick">cancel</el-button>
        <el-button type="primary" @click="confirmClick">confirm</el-button> -->
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
  import { Close, Setting } from "@element-plus/icons-vue"
  import { addClass, removeClass } from "@/utils"
  import ThemePicker from "@/components/ThemePicker/index.vue"
  import useSettingStore from "@/stores/settings"

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
  const settingStore = useSettingStore()
  const show = ref(false)
  const theme = computed(() => {
    return settingStore.theme
  })
  const themeChange = (val) => {
    settingStore.changeSetting({
      key: "theme",
      value: val
    })
  }
  const sidebarLogo: any = computed({
    get() {
      return settingStore.sidebarLogo
    },
    set(val) {
      settingStore.changeSetting({
        key: "sidebarLogo",
        value: val
      })
    }
  })
  const tagsView: any = computed({
    get() {
      return settingStore.tagsView
    },
    set(val) {
      settingStore.changeSetting({
        key: "tagsView",
        value: val
      })
    }
  })
  const fixedHeader: any = computed({
    get() {
      return settingStore.fixedHeader
    },
    set(val) {
      settingStore.changeSetting({
        key: "fixedHeader",
        value: val
      })
    }
  })
</script>

<style lang="scss" scoped>
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
  .drawer-container {
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
    word-wrap: break-word;

    .drawer-title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 14px;
      line-height: 22px;
      font-weight: bold;
    }

    .drawer-item {
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      padding: 12px 0;

      span {
        margin-right: auto;
        font-weight: bold;
      }
    }
  }
</style>
