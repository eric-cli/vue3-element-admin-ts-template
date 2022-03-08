<template>
  <el-row :class="{ show: show }" class="header-search" align="middle">
    <svg-icon class-name="search-icon" icon-class="search" @click.stop="click" />
    <el-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="header-search-select"
      @change="change"
    >
      <el-option
        v-for="item in optionsArray"
        :key="item.path"
        :value="item"
        :label="item.title.join(' > ')"
      />
    </el-select>
  </el-row>
</template>

<script setup lang="ts">
  // fuse is a lightweight fuzzy-search module
  // make search results more in line with expectations
  import type { ElSelect } from "element-plus"
  import Fuse from "fuse.js" // https://fusejs.io/getting-started/installation.html
  import path from "path-browserify"
  import usePermissionStore from "@/stores/permission"

  const permissionStore = usePermissionStore()
  const search = ref("")
  const options = ref([])
  const searchPool = ref([])
  const show = ref(false)
  const fuse = ref(null)
  const router = useRouter()
  const routes = computed(() => {
    return permissionStore.routes
  })
  const headerSearchSelect = ref<InstanceType<typeof ElSelect>>()
  // Filter out the routes that can be displayed in the sidebar
  // And generate the internationalized title
  const change = (val) => {
    router.push(val.path)
    search.value = ""
    options.value = []
    nextTick(() => {
      show.value = false
    })
  }
  const click = () => {
    show.value = !show.value
    if (show.value) {
      headerSearchSelect.value!.focus()
    }
  }
  const close = () => {
    headerSearchSelect.value!.blur()
    options.value = []
    show.value = false
  }
  const generateRoutes = (routes = [], basePath = "/", prefixTitle = []) => {
    let res: any = []

    routes.forEach((router) => {
      // skip hidden router
      if (!(router.meta && router.meta.hidden)) {
        const data: any = {
          path: path.resolve(basePath, router.path),
          title: [...prefixTitle]
        }

        if (router.meta && router.meta.title) {
          data.title = [...data.title, router.meta.title]

          if (router.redirect !== "noRedirect") {
            // only push the routes with title
            // special case: need to exclude parent router without redirect
            res.push(data)
          }
        }

        // recursive child routes
        if (router.children) {
          const tempRoutes = generateRoutes(router.children, data.path, data.title)
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes]
          }
        }
      }
    })
    return res
  }
  const initFuse = (list) => {
    fuse.value = new Fuse(list, {
      shouldSort: true,
      threshold: 0.4,
      location: 0,
      distance: 100,
      // maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        {
          name: "title",
          weight: 0.7
        },
        {
          name: "path",
          weight: 0.3
        }
      ]
    })
  }
  const querySearch = (query) => {
    if (query !== "") {
      options.value = fuse.value!.search(query)
    } else {
      options.value = []
    }
  }

  const optionsArray = computed(() => {
    if (options.value.length) {
      return options.value.map((ele) => {
        return ele.item
      })
    }
    return []
  })

  onMounted(() => {
    searchPool.value = generateRoutes(routes.value)
  })
  watch(
    () => routes,
    () => {
      searchPool.value = generateRoutes(routes.value)
    }
  )
  watch(searchPool, (value) => {
    initFuse(value)
  })
  watch(show, (value) => {
    if (value) {
      document.body.addEventListener("click", close)
    } else {
      document.body.removeEventListener("click", close)
    }
  })
</script>

<style lang="scss" scoped>
  .header-search {
    .search-icon {
      cursor: pointer;
      font-size: 18px;
      vertical-align: middle;
    }

    .header-search-select {
      font-size: 18px;
      transition: width 0.2s;
      width: 0;
      overflow: hidden;
      background: transparent;
      border-radius: 0;
      display: inline-block;
      vertical-align: middle;

      :deep(.el-input__inner) {
        border-radius: 0;
        border: 0;
        padding-left: 0;
        padding-right: 0;
        box-shadow: none !important;
        border-bottom: 1px solid #d9d9d9;
        vertical-align: middle;
      }
    }

    &.show {
      .header-search-select {
        width: 210px;
        margin-left: 10px;
      }
    }
  }
</style>
