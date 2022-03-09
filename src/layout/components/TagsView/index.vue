<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPaneRef" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        :ref="tagRefs"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        <span>
          {{ tag.title }}
          <el-icon
            v-if="!isAffix(tag)"
            class="el-icon-close"
            @click.prevent.stop="closeSelectedTag(tag)"
            ><Close
          /></el-icon>
        </span>
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">Close</li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import path from "path-browserify"
  import { Close } from "@element-plus/icons-vue"
  import ScrollPane from "./ScrollPane.vue"
  import useTagsViewStore from "@/stores/tagsView"
  import usePermissionStore from "@/stores/permission"

  const { ctx } = getCurrentInstance()
  const tagsViewStore = useTagsViewStore()
  const permissionStore = usePermissionStore()
  const route = useRoute()
  const router = useRouter()
  const visitedViews = computed(() => {
    return tagsViewStore.visitedViews
  })
  const routes = computed(() => {
    return permissionStore.routes
  })
  const visible = ref(false)
  const left = ref(0)
  const top = ref(0)
  const selectedTag = ref({})
  const affixTags = ref([])
  const scrollPaneRef: any = ref<HTMLElement | null>(null)
  const tagRefs = ref([])
  const setTagRef = (el) => {
    if (el) {
      tagRefs.push(el)
    }
  }
  // 确保在每次更新之前重置ref
  onBeforeUpdate(() => {
    tagRefs.value = []
  })
  const closeMenu = () => {
    visible.value = false
  }
  const handleScroll = () => {
    console.log(1111)
    closeMenu()
  }
  const isActive = (item: any) => {
    return item.path === route.path
  }

  const isAffix = (tag: any) => {
    return tag.meta && tag.meta.affix
  }

  const filterAffixTags = (routesArr: any, basePath = "/") => {
    let tags: any = []
    routesArr.forEach((route: any) => {
      if (route.meta && route.meta.affix) {
        const tagPath = path.resolve(basePath, route.path)

        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: { ...route.meta }
        })
      }
      if (route.children) {
        const tempTags = filterAffixTags(route.children, route.path)
        if (tempTags.length >= 1) {
          tags = [...tags, ...tempTags]
        }
      }
    })
    return tags
  }

  const initTags = () => {
    affixTags.value = filterAffixTags(routes.value)

    affixTags.value!.forEach((ele) => {
      // Must have tag name
      if (ele.name) {
        tagsViewStore.addVisitedView(ele)
      }
    })
  }

  const addTags = () => {
    const { name } = route
    if (name) {
      tagsViewStore.addView(route)
    }
    return false
  }

  const moveToCurrentTag = () => {
    const tags = tagRefs.value
    nextTick(() => {
      tags.forEach((tag) => {
        if (tag.to.path === route.path) {
          scrollPaneRef.value?.moveToTarget(tag)
          // when query is different then update
          if (tag.to.fullPath !== route.fullPath) {
            tagsViewStore.updateVisitedView(route)
          }
        }
      })
    })
  }

  const refreshSelectedTag = (view) => {
    tagsViewStore.delCachedView(view).then(() => {
      const { fullPath } = view
      nextTick(() => {
        router.replace({
          path: `/redirect${fullPath}`
        })
      })
    })
  }

  const toLastView = (visitedViews, view) => {
    const latestView = visitedViews.slice(-1)[0]
    if (latestView) {
      router.push(latestView.fullPath)
    } else if (view.name === "Dashboard") {
      // now the default is to redirect to the home page if there is no tags-view,
      // you can adjust it according to your needs.
      // to reload home page
      router.replace({ path: `/redirect${view.fullPath}` })
    } else {
      router.push("/")
    }
  }

  const closeSelectedTag = (view) => {
    tagsViewStore.delView(view).then(({ visitedViews }) => {
      if (isActive(view)) {
        toLastView(visitedViews, view)
      }
    })
  }

  const closeOthersTags = () => {
    router.push(selectedTag.value)
    tagsViewStore.delOthersViews(selectedTag.value).then(() => {
      moveToCurrentTag()
    })
  }

  const closeAllTags = (view) => {
    console.log(view)

    tagsViewStore.delAllViews().then(({ visitedViews }) => {
      console.log(visitedViews)

      if (affixTags.value!.some((tag) => tag.path === view.path)) {
        console.log(affixTags.value)
        return
      } //  TODO:这段功能是一旦在固定签列表找到当前点击的，就不处理，但是我认为应该继续处理，就跳到这个页面。之后想到了在处理

      toLastView(visitedViews, view)
    })
  }

  const openMenu = (tag, e) => {
    const menuMinWidth = 105
    const offsetLeft = ctx.$el.getBoundingClientRect().left // container margin left
    const { offsetWidth } = ctx.$el // container width
    const maxLeft = offsetWidth - menuMinWidth // left boundary
    const leftValue = e.clientX - offsetLeft + 15 // 15: margin right

    if (leftValue > maxLeft) {
      left.value = maxLeft
    } else {
      left.value = leftValue
    }

    top.value = e.clientY
    visible.value = true
    selectedTag.value = tag
  }

  onMounted(() => {
    initTags()
    addTags()
  })
  watch(
    () => route,
    (value) => {
      addTags()
      moveToCurrentTag()
    },
    {
      deep: true
    }
  )
  watch(
    () => visible.value,
    (value) => {
      if (value) {
        document.body.addEventListener("click", closeMenu)
      } else {
        document.body.removeEventListener("click", closeMenu)
      }
    }
  )
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
        padding: 0 12px 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;
        border-radius: 4px;
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
        height: 12px;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;
        position: absolute;
        border-bottom-left-radius: 6px;
        border-top-right-radius: 4px;
        top: -1px;
        right: -1px;
        font-size: 10px;

        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
</style>
