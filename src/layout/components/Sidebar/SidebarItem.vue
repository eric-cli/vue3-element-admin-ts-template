<template>
  <!-- <div v-if="!item.meta || (item.meta && !item.meta.hidden)"> -->
  <!-- TODO:"处理hidden" -->
  <div>
    <!-- <template
      v-if="
        hasOneShowingChild(item.children || [], item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <Item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </AppLink>
    </template> -->
    <template v-if="item.children && item.children.length">
      <sidebar-item
        :data-child="item.children && item.children.length"
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </template>
    <el-sub-menu
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
      v-else
    >
      <template #title>
        <Item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title + (item.children && item.children.length)"
        />
      </template>
      <AppLink :to="resolvePath(item.path)">
        <el-menu-item :class="{ 'submenu-title-noDropdown': !isNest }"
          >123
          <Item
            :icon="item.meta.icon || (item.meta && item.meta.icon)"
            :title="item.meta.title"
          />
        </el-menu-item>
      </AppLink>
    </el-sub-menu>
  </div>
</template>

<script lang="ts" setup>
import { isExternal } from "@/utils/validate";
// import path from "path";
import Item from "./Item.vue";
import AppLink from "./Link.vue";
// TODO:fix
const props = defineProps({
  // route object
  item: {
    type: Object,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: "",
  },
});

let onlyOneChild = ref(null);
const resolvePath = (routePath) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  // return path.resolve(props.basePath, routePath) props.basePath+routePath;
  return props.basePath + "/" + routePath;
};
const hasOneShowingChild = (children = [], parent) => {
  console.log(children);

  const showingChildren = children.filter((item) => {
    if (item.meta && item.meta.hidden) {
      return false;
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item;
      return true;
    }
  });

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true;
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }

  return false;
};
</script>

<style lang="scss" scoped></style>
