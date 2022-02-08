<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <Sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <Navbar />
        <TagsView v-if="needTagsView" />
      </div>
      <AppMain />
      <RightPanel v-if="showSettings">
        <Settings />
      </RightPanel>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar/index.vue";
import Sidebar from "./components/Sidebar/index.vue";
import TagsView from "./components/TagsView/index.vue";
import AppMain from "./components/AppMain/index.vue";
import Settings from "./components/Settings/index.vue";
import RightPanel from "@/components/RightPanel/index.vue";
import useAppStore from "@/stores/app";
import useSettingStore from "@/stores/settings";
const appStore = useAppStore();
const settingStore = useSettingStore();
const device = computed(() => {
  return appStore.device;
});
const opened = computed(() => {
  return appStore.opened;
});
const sidebar = computed(() => {
  return appStore.sidebar;
});
const fixedHeader = computed(() => {
  return settingStore.fixedHeader;
});
const needTagsView = computed(() => {
  return settingStore.needTagsView;
});
const showSettings = computed(() => {
  return settingStore.showSettings;
});
const classObj = computed(() => {
  return {
    hideSidebar: !opened,
    openSidebar: opened,
    withoutAnimation: sidebar.withoutAnimation,
    mobile: device === "mobile",
  };
});
const handleClickOutside = () => {
  appStore.closeSideBar(false);
};
</script>

<style lang="scss" scoped>
// @import "~@/styles/mixin.scss";
// @import "~@/styles/variables.scss";

.app-wrapper {
  // @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  // width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
