<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane
      ref="scrollPaneRef"
      class="tags-view-wrapper"
      @scroll="handleScroll"
    >
      <router-link
        v-for="tag in visitedViews"
        :ref="tagRefs"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        Close
      </li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import ScrollPane from "./ScrollPane.vue";
import useTagsViewStore from "@/stores/tagsView";
import usePermissionStore from "@/stores/permission";
const { ctx } = getCurrentInstance();
// import path from "path";
const tagsViewStore = useTagsViewStore();
const permissionStore = usePermissionStore();
const route = useRoute();
const router = useRouter();
const visitedViews = computed(() => {
  return tagsViewStore.visitedViews;
});
const routes = computed(() => {
  return permissionStore.routes;
});
let visible = ref(false);
let left = ref(0);
let top = ref(0);
let selectedTag = reactive({});
let affixTags = reactive([]);
let scrollPaneRef = ref(null);
let tagRefs = ref([]);
const setTagRef = (el) => {
  if (el) {
    tagRefs.push(el);
  }
};
// 确保在每次更新之前重置ref
onBeforeUpdate(() => {
  tagRefs.value = [];
});
const closeMenu = () => {
  visible.value = false;
};
const handleScroll = () => {
  closeMenu();
};
const isActive = (item: any) => {
  return item.path === route.path;
};

const isAffix = (tag: any) => {
  return tag.meta && tag.meta.affix;
};

const filterAffixTags = (routesArr: any, basePath = "/") => {
  let tags: any = [];
  routesArr.forEach((route: any) => {
    if (route.meta && route.meta.affix) {
      // TODO path修改
      // const tagPath = path.resolve(basePath, route.path);
      tags.push({
        fullPath: route.path,
        path: route.path,
        name: route.name,
        meta: { ...route.meta },
      });
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path);
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags];
      }
    }
  });
  return tags;
};

const initTags = () => {
  affixTags = filterAffixTags(routes.value);
  for (const tag of affixTags) {
    // Must have tag name
    if (tag.name) {
      tagsViewStore.addVisitedView(tag);
    }
  }
};

const addTags = () => {
  const { name } = route;
  if (name) {
    tagsViewStore.addView(route);
  }
  return false;
};

const moveToCurrentTag = () => {
  const tags = tagRefs.value;
  nextTick(() => {
    for (const tag of tags) {
      if (tag.to.path === route.path) {
        scrollPaneRef.value.moveToTarget(tag);
        // when query is different then update
        if (tag.to.fullPath !== route.fullPath) {
          tagsViewStore.updateVisitedView(route);
        }
        break;
      }
    }
  });
};

const refreshSelectedTag = (view) => {
  tagsViewStore.delCachedView(view).then(() => {
    const { fullPath } = view;
    nextTick(() => {
      router.replace({
        path: "/redirect" + fullPath,
      });
    });
  });
};

const closeSelectedTag = (view) => {
  tagsViewStore.delView(view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view);
    }
  });
};

const closeOthersTags = () => {
  router.push(selectedTag);
  tagsViewStore.delOthersViews(selectedTag).then(() => {
    moveToCurrentTag();
  });
};

const closeAllTags = (view) => {
  tagsViewStore.delAllViews().then(({ visitedViews }) => {
    if (affixTags.some((tag) => tag.path === view.path)) {
      return;
    }
    toLastView(visitedViews, view);
  });
};

const toLastView = (visitedViews, view) => {
  const latestView = visitedViews.slice(-1)[0];
  if (latestView) {
    router.push(latestView.fullPath);
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === "Dashboard") {
      // to reload home page
      router.replace({ path: "/redirect" + view.fullPath });
    } else {
      router.push("/");
    }
  }
};

const openMenu = (tag, e) => {
  const menuMinWidth = 105;
  const offsetLeft = ctx.$el.getBoundingClientRect().left; // container margin left
  const { offsetWidth } = ctx.$el; // container width
  const maxLeft = offsetWidth - menuMinWidth; // left boundary
  const leftValue = e.clientX - offsetLeft + 15; // 15: margin right

  if (leftValue > maxLeft) {
    left.value = maxLeft;
  } else {
    left.value = leftValue;
  }

  top.value = e.clientY;
  visible.value = true;
  selectedTag = tag;
};

onMounted(() => {
  initTags();
  addTags();
});
watch(
  () => route,
  (value) => {
    addTags();
    moveToCurrentTag();
  },
  {
    deep: true,
  }
);
watch(
  () => visible.value,
  (value) => {
    console.log(value);
    if (value) {
      document.body.addEventListener("click", closeMenu);
    } else {
      document.body.removeEventListener("click", closeMenu);
    }
  }
);
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
