<template>
  <div :class="{ 'has-logo': showLogo }">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="(route, index) in permissionRoutes"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
  // TODO： scss变量引入
  // TODO： 多二级情况下一级不展示问题
  // import variable from "@/styles/element/variables.scss";
  import Logo from "./Logo.vue"
  import SidebarItem from "./SidebarItem.vue"
  import useSettingStore from "@/stores/settings"
  import useAppStore from "@/stores/app"
  import usePermissionStore from "@/stores/permission"
  const settingStore = useSettingStore()
  const appStore = useAppStore()
  const permissionStore = usePermissionStore()
  const route = useRoute()
  const showLogo = computed(() => {
    return settingStore.sidebarLogo
  })
  const permissionRoutes = computed(() => {
    return permissionStore.routes
  })
  const isCollapse = computed(() => {
    return !appStore.opened
  })

  const activeMenu = computed(() => {
    const { meta, path } = route
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
      return meta.activeMenu
    }
    return path
  })

  // TODO: 变量引入
  const variables = computed(() => {
    return {
      menuText: "#bfcbd9",
      menuActiveText: "#409EFF",
      menuBg: "#304156"
    }
  })
</script>

<style lang="scss" scoped></style>
