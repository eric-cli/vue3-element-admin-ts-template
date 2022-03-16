<template>
  <div v-if="!item.meta || (item.meta && !item.meta.hidden)">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script lang="ts" setup>
  import path from "path-browserify"
  import { isExternal } from "@/utils/validate"
  import Item from "./Item.vue"
  import AppLink from "./Link.vue"

  const props = defineProps({
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  })

  const onlyOneChild: any = ref(null)
  const resolvePath = (routePath) => {
    if (isExternal(routePath)) {
      return routePath
    }
    if (isExternal(props.basePath)) {
      return props.basePath
    }
    return path.resolve(props.basePath, routePath)
    // return props.basePath + "/" + routePath;
  }
  const hasOneShowingChild = (children = [], parent = {}) => {
    // console.log(children);

    const showingChildren = children.filter((item: any) => {
      if (item.meta && item.meta.hidden) {
        return false
      }
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item
      return true
    })

    // When there is only one child router, the child router is displayed by default
    if (showingChildren.length === 1) {
      return true
    }

    // Show parent if there are no child router to display
    if (showingChildren.length === 0) {
      onlyOneChild.value = { ...parent, path: "", noShowingChildren: true }
      return true
    }

    return false
  }
</script>

<style lang="scss" scoped></style>
